const chemistModel = SqlModel.chemist;
Op = SqlModel.Sequelize.Op;
const { is_exist_in_table } = require('../services/common.service');
const { findDataByKey, searchData } = require('../services/common.query.service');
let search_field = ['name', 'status']

exports.getSearch = async (req, res) => {
    try {
        const query = req.query;
        let request = {
            where: [],
            attributes: ["id", "name", "price", "stock", "mfg_date", "expiry_date", "status"],
            primary: "id",
            page: query.page || 1,
            limit: query.limit || 10,
            orderby: "id",
            order: "desc",
        }

        for (key of search_field) {
            if (query.hasOwnProperty([key]) && query[key]) request.where.push({ [key]: query[key] });
        }
        if (query.start_date) {
            let start_date = query.start_date,
                end_date = query.end_date;

            if (start_date == end_date) {
                request.where.push({ mfg_date: start_date })
            } else {
                request.where.push({ mfg_date: { [Op.between]: [start_date, end_date] } })
            }
        }
        searchData(request, chemistModel)
            .then((response) => {
                res.json({ status: response.status, data: response.result, message: response.message });
            }).catch((err) => {
                res.json({ status: err.status, message: err.message });
            });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:'+error });
    }
}

exports.getChemistById = async (req, res) => {
    try {
        let request = {
            attributes: ["id", "name", "price", "stock", "mfg_date", "expiry_date", "status"],
            key: "id",
            value: req.params.id
        }
        await findDataByKey(request, chemistModel)
            .then((response) => {
                res.json({ status: 1, data: response.data });
            }).catch((e) => {
                res.status(400).send({ status: 0, message: "We didn't found anything!" });
            })
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}

exports.chemistCreate = async (req, res) => {
    try {
        const { name, price, stock, mfg_date, expiry_date, status } = req.body;
        let params = {
            name,
            price,
            stock,
            mfg_date,
            expiry_date,
            status: status || 1,
        }
        await is_exist_in_table(req.body, chemistModel, 'name', null)
            .then(async (response) => {
                if (response.status) res.json({ status: 0, message: 'Already added in system!' });
                else {
                    await chemistModel.create(params);
                    res.json({ status: 1, message: 'Successfully added!' })
                }
            })
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' + error });
    }
}


exports.chemistEdit = async (req, res) => {
    try {
        const { id, name, price, stock, mfg_date, expiry_date, status } = req.body;
        let params = {};
        if (name) params.name = name;
        if (price) params.price = price;
        if (stock) params.stock = stock;
        if (mfg_date) params.mfg_date = mfg_date;
        if (expiry_date) params.expiry_date = expiry_date;
        if (status) params.status = status;
        if (Object.keys(params).length) {
            if (name) {
                let checkstatus = await is_exist_in_table(req.body, chemistModel, 'name', 'id')
                if (checkstatus.status) res.json({ status: 0, message: name + ' Already added in system!' });
            }
            await chemistModel.update(params, { where: { 'id': id } });
            res.json({ status: 1, message: 'Successfully updated!' })

        } else res.status(500).send({ status: 0, message: 'There is no data to update!' });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' + error });
    }
}


exports.chemistDelete = async (req, res) => {
    try {
        const chemist_id = req.params.id;
        let params = { status: 0 };
        await chemistModel.update(params, { where: { 'chemist_id': chemist_id } });
        res.json({ status: 1, message: 'chemist has been deleted successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}