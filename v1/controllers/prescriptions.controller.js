const prescriptionModel = SqlModel.prescriptions;
const patientModel = SqlModel.patients;
const userModel = SqlModel.users;
const { findDataByKey, searchData } = require('../services/common.query.service');
let search_field = ['id', 'pid', 'createdAt'];
let attributes = ["id","symptoms", "disease", "medicine_name", "dosage", "quantity", "doctor_note", "dose", "dont", "createdAt"]

exports.getSearch = async (req, res) => {
    try {
        const query = req.query;
        let request = {
            where: [],
            attributes: attributes,
            primary: "id",
            page: query.page || 1,
            limit: query.limit || 10,
            orderby: "id",
            order: "desc",
            include: [{
                model: patientModel,
                as: 'patients',
                attributes: ['pid', 'name', 'email', "phone"]
            },
            {
                model: userModel,
                as: 'users',
                attributes: ['user_id', 'name']
            }]
        }

        for (key of search_field)
            if (query.hasOwnProperty([key]) && query[key]) request.where.push({ [key]: query[key] });

        searchData(request, prescriptionModel)
            .then((response) => {
                res.json({ status: response.status, data: response.result, message: response.message });
            }).catch((err) => {
                res.json({ status: err.status, message: err.message });
            });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}

exports.getPrescriptionById = async (req, res) => {
    try {
        let request = {
            attributes: attributes,
            key: "id",
            value: req.params.id,
            include: [{
                model: patientModel,
                as: 'patients',
                attributes: ['pid', 'name', 'email', "phone"]
            },
            {
                model: userModel,
                as: 'users',
                attributes: ['user_id', 'name']
            }]
        }
        await findDataByKey(request, prescriptionModel)
            .then((response) => {
                res.json({ status: 1, data: response.data });
            }).catch((e) => {
                res.status(400).send({ status: 0, message: "We didn't found anything!" });
            })
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}

exports.prescriptionCreate = async (req, res) => {
    try {
        const { pid, user_id, symptoms, disease, medicine_name, dosage, quantity, doctor_note, dose, dont } = req.body;
        let params = {
            pid,
            user_id,
            symptoms,
            disease,
            medicine_name,
            dosage,
            quantity,
            doctor_note,
            dose,
            dont
        }

        await prescriptionModel.create(params);
        res.json({ status: 1, message: 'prescription has been successfully added!' })

    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:'+error });
    }
}


exports.prescriptionEdit = async (req, res) => {
    try {
        const { id, pid, user_id, symptoms, disease, medicine_name, dosage, quantity, doctor_note, dose, dont } = req.body;
        let params = {};
        if (pid) params.pid = pid;
        if (user_id) params.user_id = user_id;
        if (symptoms) params.symptoms = symptoms;
        if (disease) params.disease = disease;
        if (medicine_name) params.medicine_name = medicine_name;
        if (dosage) params.dosage = dosage;
        if (quantity) params.quantity = quantity;
        if (doctor_note) params.doctor_note = doctor_note;
        if (dose) params.dose = dose;
        if (dont) params.dont = dont;

        if (Object.keys(params).length) {
            await prescriptionModel.update(params, { where: { 'id': id } });
            res.json({ status: 1, message: 'prescription has been successfully updated!' })

        } else res.status(500).send({ status: 0, message: 'There is no data to update!' });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}


exports.prescriptionDelete = async (req, res) => {
    try {
        const id = req.params.id;
        let params = { status: 0 };
        await prescriptionModel.update(params, { where: { 'id': id } });
        res.json({ status: 1, message: 'prescription has been deleted successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}