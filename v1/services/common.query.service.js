const bluebird = require('bluebird'),
    Op = SqlModel.Sequelize.Op;

exports.findDataByKey = (request, model) => {
    return new bluebird(async (resolve, reject) => {
        try {
            let options = {};
            options.where = { [request.key]: request.value };
            if (Array.isArray(request.attributes)) options.attributes = request.attributes;
            if (request.hasOwnProperty('include')) options.include = request.include;
            model.findOne(options)
                .then(response => {
                    if (response) resolve({ status: true, data: response.dataValues })
                    reject({ status: false })
                });
        } catch (e) {
            reject(e)
        }
    })
}


exports.searchData = async (request, model) => {
    return new bluebird(async (resolve, reject) => {
        try {
            let total_pages = 0, data_count = 0
            request.page = parseInt(request.page)
            if (request.page > 0) {
                request.offset = (request.page - 1) * request.limit
            }
            data_count = await model.count({
                where: request.where,
                col: request.primary,
            })
            if (data_count) {
                total_pages = data_count / request.limit
                if (!(data_count % request.limit == 0)) total_pages = parseInt(total_pages) + 1
            }
            let options = {
                where: request.where,
                attributes: request.attributes,
                offset: request.offset,
                limit: request.limit,
                order: [[request.orderby, request.order]]
            }
            if (request.hasOwnProperty('include')) options.include = request.include;
            model.findAll(options)
                .then(result => {
                    let returndata = {
                        docs: result,
                        total_pages: total_pages,
                        current_page: request.page,
                        records: data_count
                    }
                    if (result.length) resolve({ status: 1, result: returndata })
                    reject({ status: 0, message: "Sorry, we couldn't found any result!" })
                })
                .catch(e => {
                    reject({ status: 0, message: "Somthing went wrong!"+e })
                })

        } catch (e) {
            reject(e)
        }
    })
}