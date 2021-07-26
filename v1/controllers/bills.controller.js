const billModel = SqlModel.bills;
const { findDataByKey, searchData } = require('../services/common.query.service');
let search_field = ['bill_id', 'pid', 'createdAt'];
let attributes = ["bill_id", "pid", "doctor_charge", "room_charge", "nursing_charge", "lab_charge", "fluid_charge", "other_charge", "createdAt"]

exports.getSearch = async (req, res) => {
    try {
        const query = req.query;
        let request = {
            where: [],
            attributes: attributes,
            primary: "bill_id",
            page: query.page || 1,
            limit: query.limit || 10,
            orderby: "bill_id",
            order: "desc",
        }

        for (key of search_field)
            if (query.hasOwnProperty([key]) && query[key]) request.where.push({ [key]: query[key] });

        searchData(request, billModel)
            .then((response) => {
                res.json({ status: response.status, data: response.result, message: response.message });
            }).catch((err) => {
                res.json({ status: err.status, message: err.message });
            });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}

exports.getBillById = async (req, res) => {
    try {
        let request = {
            attributes: attributes,
            key: "bill_id",
            value: req.params.id
        }
        await findDataByKey(request, billModel)
            .then((response) => {
                res.json({ status: 1, data: response.data });
            }).catch((e) => {
                res.status(400).send({ status: 0, message: "We didn't found anything!" });
            })
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}

exports.billCreate = async (req, res) => {
    try {
        const { pid, doctor_charge, room_charge, nursing_charge, lab_charge, fluid_charge, other_charge } = req.body;
        let params = {
            pid,
            doctor_charge,
            room_charge,
            nursing_charge,
            lab_charge,
            fluid_charge,
            other_charge,
            status: 1
        }

        await billModel.create(params);
        res.json({ status: 1, message: 'Bill has been successfully added!' })

    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}


exports.billEdit = async (req, res) => {
    try {
        const { bill_id, pid, doctor_charge, room_charge, nursing_charge, lab_charge, fluid_charge, other_charge } = req.body;
        let params = {};
        if (pid) params.pid = pid;
        if (doctor_charge) params.doctor_charge = doctor_charge;
        if (room_charge) params.room_charge = room_charge;
        if (room_charge) params.room_charge = room_charge;
        if (nursing_charge) params.nursing_charge = nursing_charge;
        if (lab_charge) params.lab_charge = lab_charge;
        if (fluid_charge) params.fluid_charge = fluid_charge;
        if (other_charge) params.other_charge = other_charge;
        if (status) params.status = status;
        if (Object.keys(params).length) {
            await billModel.update(params, { where: { 'bill_id': bill_id } });
            res.json({ status: 1, message: 'bill has been successfully updated!' })

        } else res.status(500).send({ status: 0, message: 'There is no data to update!' });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}


exports.billDelete = async (req, res) => {
    try {
        const id = req.params.id;
        let params = { status: 0 };
        await billModel.update(params, { where: { 'bill_id': bill_id } });
        res.json({ status: 1, message: 'bill has been deleted successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}