const bluebird = require('bluebird'),
Op = SqlModel.Sequelize.Op;

exports.is_exist_in_table = (request, model, key, primary_key) => {
    return new bluebird(async (resolve, reject) => {
        try {
            let where_clouse =[{[key]: request[key]}]
            if(primary_key) where_clouse.push({ [primary_key]:{ [Op.ne]: request[primary_key] }})
            model.count({where: where_clouse})
                .then(count => {
                    if (count > 0) resolve({status:true, message:'This value is already in our system! '})
                    resolve({status:false})
                });
        } catch (e) {
            reject(e)
        }
    })
}