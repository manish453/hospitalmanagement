
const centerModel = SqlModel.centers;
const { upload } = require('../library/file.upload.lib');
const { findDataByKey, searchData } = require('../services/common.query.service');
let search_field = ['center_id', 'name', 'email', 'status', 'createdAt']

exports.getSearch = async (req, res) => {
    try {
        const query = req.query;
        let request = {
            where: [],
            attributes: ["center_id", "name", "status"],
            primary: "center_id",
            page: query.page || 1,
            limit: query.limit || 10,
            orderby: "center_id",
            order: "desc"
        }

        for (key of search_field)
            if (query.hasOwnProperty([key]) && query[key]) request.where.push({ [key]: query[key] });

        searchData(request, centerModel)
            .then((response) => {
                res.json({ status: response.status, data: response.result, message: response.message });
            }).catch((err) => {
                res.json({ status: err.status, message: err.message });
            });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}

exports.getCenterById = async (req, res) => {
    try {
        let request = {
            key: "center_id",
            value: req.params.id
        }
        await findDataByKey(request, centerModel)
            .then((response) => {
                res.json({ status: 1, data: response.data });
            }).catch((e) => {
                res.status(400).send({ status: 0, message: "We didn't found anything!" });
            })
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}

exports.centerCreate = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err) res.send(err);
            const { name, email, website, address, beds } = req.body;
            let logo = req.file ? req.file.filename : "";

            let params = {
                name,
                email,
                website,
                address,
                logo: logo,
                beds,
                status: 1
            }
            await centerModel.create(params);
            res.json({ status: 1, message: 'Center has been successfully added!' })
        });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }

}

exports.centerEdit = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err) res.send(err);
            const { center_id, name, email, website, address, beds, status } = req.body;
            let params = {};
            if (name) params.name = name;
            if (email) params.email = email;
            if (address) params.address = address;
            if (website) params.website = website;
            if (req.file) params.logo = req.file.filename;
            if (beds) params.beds = beds;
            if (status) params.status = status;

            await centerModel.update(params, { where: { 'center_id': center_id } });
            res.json({ status: 1, message: 'center has been successfully updated!' })
        });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}

exports.centerDelete = async (req, res) => {
    try {
        const center_id = req.params.id;
        let params = { status: 0 };
        await centerModel.update(params, { where: { 'center_id': center_id } });
        res.json({ status: 1, message: 'Center has been deleted successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}
