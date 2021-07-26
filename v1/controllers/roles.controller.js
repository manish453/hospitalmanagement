const roleModel = SqlModel.roles;
const { is_exist_in_table } = require('../services/common.service');
const { findDataByKey, searchData } = require('../services/common.query.service');
let search_field = ['role_id', 'name', 'status', 'createdAt']

exports.getSearch = async (req, res) => {
    try {
        const query = req.query;
        let request = {
            where: [],
            attributes: ["role_id", "name", "status"],
            primary: "role_id",
            page: query.page || 1,
            limit: query.limit || 10,
            orderby: "role_id",
            order: "desc",
            // option: {
            //     user_role: req.session.role
            // }
        }

        for (key of search_field)
            if (query.hasOwnProperty([key]) && query[key]) request.where.push({ [key]: query[key] });

        searchData(request, roleModel)
            .then((response) => {
                res.json({ status: response.status, data: response.result, message: response.message });
            }).catch((err) => {
                res.json({ status: err.status, message: err.message });
            });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}

exports.getRoleById = async (req, res) => {
    try {
        let request = {
            attributes: ['name', 'status'],
            key: "role_id",
            value: req.params.id
        }
        await findDataByKey(request, roleModel)
            .then((response) => {
                res.json({ status: 1, data: response.data });
            }).catch((e) => {
                res.status(400).send({ status: 0, message: "We didn't found anything!" });
            })
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}

exports.roleCreate = async (req, res) => {
    try {
        const { name, status } = req.body;
        let params = {
            name: name,
            status: status || 1,
        }
        await is_exist_in_table(req.body, roleModel, 'name', null)
            .then(async (response) => {
                if (response.status) res.json({ status: 0, message: 'One role is exist in our system with this name!' });
                else {
                    await roleModel.create(params);
                    res.json({ status: 1, message: 'Role has been successfully added!' })
                }
            })
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}


exports.roleEdit = async (req, res) => {
    try {
        const { role_id, name, status } = req.body;
        let params = {};
        if (name) params.name = name;
        if (status) params.status = status;
        if (Object.keys(params).length) {
            if (name) {
                let checkstatus = await is_exist_in_table(req.body, roleModel, 'name', 'role_id')
                if (checkstatus.status) res.json({ status: 0, message: name + ' role is exist in our system.' });
            }
            await roleModel.update(params, { where: { 'role_id': role_id } });
            res.json({ status: 1, message: 'Role has been successfully updated!' })

        } else res.status(500).send({ status: 0, message: 'There is no data to update!' });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}


exports.roleDelete = async (req, res) => {
    try {
        const role_id = req.params.id;
        let params = { status: 0 };
        await roleModel.update(params, { where: { 'role_id': role_id } });
        res.json({ status: 1, message: 'Role has been deleted successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong!:' });
    }
}