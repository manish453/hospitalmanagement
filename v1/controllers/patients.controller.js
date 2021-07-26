
const patientModel = SqlModel.patients;
const centerModel = SqlModel.centers;
const { is_exist_in_table } = require('../services/common.service');
const { findDataByKey, searchData } = require('../services/common.query.service');
const { hashSync, genSaltSync } = require("bcrypt");
const { validateEmail } = require('../utils/main.util');
let search_field = ['pid', 'name', 'email', 'phone', 'status', 'createdAt'];
Op = SqlModel.Sequelize.Op;

exports.getSearch = async (req, res) => {
    try {
        const query = req.query;
        let request = {
            where: [],
            attributes: ['name', 'email', 'phone', 'gender', 'age', 'address', 'status'],
            primary: "pid",
            page: query.page || 1,
            limit: query.limit || 10,
            orderby: "pid",
            order: "desc",
            include: [{
                model: centerModel,
                as: 'centers',
                attributes: ['center_id', 'name', 'address']
            }]
        }

        for (key of search_field) {
            if (query.hasOwnProperty([key]) && query[key]) request.where.push({ [key]: query[key] });
        }

        if (query.start_date) {
            let start_date = query.start_date,
                end_date = query.end_date;

            if (start_date == end_date) {
                request.where.push({ admit_date: start_date })
            } else {
                request.where.push({ admit_date: { [Op.between]: [start_date, end_date] } })
            }
        }
        searchData(request, patientModel)
            .then((response) => {
                res.json({ status: response.status, data: response.result, message: response.message });
            }).catch((err) => {
                res.json({ status: err.status, message: err.message });
            });
    } catch (e) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}

exports.getPatientById = async (req, res) => {
    try {
        let request = {
            attributes: ['name', 'email', 'phone', 'gender', 'age', 'address', 'status'],
            key: "pid",
            value: req.params.id,
            include: [{
                model: centerModel,
                as: 'centers',
                attributes: ['center_id', 'name', 'address']
            }]
        }
        await findDataByKey(request, patientModel)
            .then((response) => {
                res.json({ status: 1, data: response.data });
            }).catch((e) => {
                res.status(400).send({ status: 0, message: "We didn't found anything!" });
            })
    } catch (e) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}

exports.patientCreate = async (req, res) => {
    try {
        const { name, email, phone, gender, age, address, city, blood_group, insurance_id, know_any_staff, center_id, admit_status, admit_date, status } = req.body;
        const salt = genSaltSync(5);
        let pass = hashSync(phone, salt);
        if(!validateEmail(email)) res.json({ status: 0, message: 'Invalid Email ID' });
        let params = {
            name,
            email,
            phone,
            gender,
            age,
            address,
            city,
            blood_group,
            insurance_id,
            know_any_staff,
            center_id,
            admit_status,
            admit_date,
            password: pass,
            status: status || 1,
        }
        await is_exist_in_table(req.body, patientModel, 'phone', null)
            .then(async (response) => {
                if (response.status) res.json({ status: 0, message: 'This phone number already register with us!' });
                else {
                    await patientModel.create(params);
                    res.json({ status: 1, message: 'Patient has been successfully registered!' })
                }
            })
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:'+error });
    }
}

exports.patientEdit = async (req, res) => {
    try {
        const { pid, name, email, phone, gender, age, address, city, blood_group, insurance_id, know_any_staff, center_id, admit_status, admit_date, status } = req.body;
        if(!validateEmail(email)) res.json({ status: 0, message: 'Invalid Email ID' });
        let params = {};
        if (name) params.name = name;
        if (email) params.email = email;
        if (phone) params.phone = phone;
        if (gender) params.gender = gender;
        if (age) params.age = age;
        if (address) params.address = address;
        if (city) params.city = city;
        if (blood_group) params.blood_group = blood_group;
        if (insurance_id) params.insurance_id = insurance_id;
        if (know_any_staff) params.know_any_staff = know_any_staff;
        if (center_id) params.center_id = parseInt(center_id);
        if (admit_status) params.admit_status = admit_status;
        if (admit_date) params.admit_date = admit_date;
        if (status) params.status = status;

        if (Object.keys(params).length) {
            if (phone) {
                let checkstatus = await is_exist_in_table(req.body, patientModel, 'phone', 'pid')
                if (checkstatus.status) res.json({ status: 0, message: 'This phone number already register with us!' });
            }

            await patientModel.update(params, { where: { 'pid': pid } });
            res.json({ status: 1, message: 'Patient has been successfully updated!' })

        } else res.status(500).send({ status: 0, message: 'There is no data to update!' });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}

exports.patientDelete = async (req, res) => {
    try {
        const pid = req.params.id;
        let params = { status: 0 };
        await patientModel.update(params, { where: { 'pid': pid } });
        res.json({ status: 1, message: 'Patient has been deleted successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}
