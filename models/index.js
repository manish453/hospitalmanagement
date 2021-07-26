'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.APP_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const database = config.database;
const options = {
	host: config.host,
	username: config.username,
	password: config.password,
	dialect: config.dialect,
	logging: true,
	port: 3306
}
let sequelize = new Sequelize(database, null, null, options);
sequelize
	.authenticate()
	.then(() => {
		console.log("Connection has been established successfully.")
	})
	.catch(err => {
		console.error("Unable to connect to the database:", err)
	})

fs
	.readdirSync(__dirname)
	.filter(file => {
		return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
	})
	.forEach(file => {
		const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
		db[model.name] = model;
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});



db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
