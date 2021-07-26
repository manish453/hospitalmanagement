
const userModel = SqlModel.users;
const centerModel = SqlModel.centers;
const roleModel = SqlModel.roles;
const { is_exist_in_table } = require('../services/common.service');
const { upload } = require('../library/file.upload.lib');
const { validateEmail } = require('../utils/main.util');
const { status, bill_status } = require('../../config/api-config');
const { findDataByKey, searchData } = require('../services/common.query.service');
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
let search_field = ['user_id', 'name', 'email', 'status', 'createdAt']

exports.getSearch = async (req, res) => {
    try {
        const query = req.query;
        let request = {
            where: [],
            attributes: ["user_id", "name", "status"],
            primary: "user_id",
            page: query.page || 1,
            limit: query.limit || 10,
            orderby: "user_id",
            order: "desc",
            include: [{
                model: centerModel,
                as: 'centers',
                attributes: ['center_id', 'name']
            }]
        }

        for (key of search_field)
            if (query.hasOwnProperty([key]) && query[key]) request.where.push({ [key]: query[key] });

        searchData(request, userModel)
            .then((response) => {
                res.json({ status: response.status, data: response.result, message: response.message });
            }).catch((err) => {
                res.json({ status: err.status, message: err.message });
            });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}

exports.getUserById = async (req, res) => {
    try {
        let request = {
            attributes: ['name', 'email', 'phone', 'gender', 'age', 'address', 'qualification', 'specialization', 'sift_timing', 'designation'],
            key: "user_id",
            value: req.params.id,
            include: [{
                model: centerModel,
                as: 'centers',
                attributes: ['center_id', 'name', 'address']
            }, {
                model: roleModel,
                as: 'roles',
                attributes: ['role_id', 'name']
            }]
        }
        await findDataByKey(request, userModel)
            .then((response) => {
                res.json({ status: 1, data: response.data });
            }).catch((e) => {
                res.status(400).send({ status: 0, message: "We didn't found anything!" });
            })
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}

exports.userCreate = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (req.fileValidationError) {
                return res.send(req.fileVacccrlidationError);
            }
            else if (!req.file) {
                return res.send({ status: 0, message: 'Profile image is required' });
            }
            else if (err) {
                return res.send(err);
            }
            const { name, email, password, phone, gender, age, address, qualification, specialization, sift_timing, designation, center_id, role_id } = req.body;
            const salt = genSaltSync(5);
            let pass = hashSync(password, salt);
            if(!validateEmail(email)) res.json({ status: 0, message: 'Invalid Email ID' });
            let params = {
                name,
                email,
                password: pass,
                phone,
                gender,
                age,
                photo: req.file ? req.file.filename :"",
                address,
                qualification,
                specialization,
                sift_timing,
                designation,
                center_id,
                role_id,
                isverified: 1,
                status: 1
            }

            await is_exist_in_table(req.body, userModel, 'email', null)
                .then(async (response) => {
                    if (response.status) res.json({ status: 0, message: 'This email is exist in our system! try other Email ID' });
                    else {
                        await userModel.create(params);
                        res.json({ status: 1, message: 'User has been successfully added!' })
                    }
                })
        });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }

}

exports.userEdit = async (req, res) => {
    try {
        const { user_id, name, email, phone, gender, age, address, qualification, specialization, sift_timing, designation, center_id, role_id, status } = req.body;
        if(!validateEmail(email)) res.json({ status: 0, message: 'Invalid Email ID' });
        let params = {};
        if (name) params.name = name;
        if (email) params.email = email;
        if (phone) params.phone = phone;
        if (gender) params.gender = gender;
        if (age) params.age = age;
        if (address) params.address = address;
        if (qualification) params.qualification = qualification;
        if (specialization) params.specialization = specialization;
        if (sift_timing) params.sift_timing = sift_timing;
        if (designation) params.designation = designation;
        if (center_id) params.center_id = parseInt(center_id);
        if (role_id) params.role_id = parseInt(role_id);
        if (status) params.status = status;

        if (Object.keys(params).length) {
            if (email) {
                let checkstatus = await is_exist_in_table(req.body, userModel, 'email', 'user_id')
                if (checkstatus.status) res.json({ status: 0, message: 'This email is exist in our system! try other Email ID!' });
            }
            await userModel.update(params, { where: { 'user_id': user_id } });
            res.json({ status: 1, message: 'User has been successfully updated!' })

        } else res.status(500).send({ status: 0, message: 'There is no data to update!' });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}

exports.userDelete = async (req, res) => {
    try {
        const user_id = req.params.id;
        let params = { status: 0 };
        await userModel.update(params, { where: { 'user_id': user_id } });
        res.json({ status: 1, message: 'User has been deleted successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}

exports.login = async (req, res) => {
    try {
        const body = req.body;
        let request = {
            attributes: null,
            key: "email",
            value: body.email
        }
        await findDataByKey(request, userModel)
            .then((response) => {
                let results = response.data;
                const auth = compareSync(body.password, results.password);
                if (auth) {
                    results.password = undefined;
                    const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
                        expiresIn: "1h"
                    });
                    res.json({
                        success: 1,
                        message: "login successfully",
                        data: {
                            status: status,
                            bill_status: bill_status
                        },
                        token: jsontoken
                    });
                } else {
                    res.json({
                        success: 0,
                        data: "Invalid email or password"
                    });
                }
            }).catch((e) => {
                res.json({ status: 0, message: "Invalid User!" });
            })
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}