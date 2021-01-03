const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

let db = null;

module.exports = app => {

    if(!db) {
        const config = app.libs.config;
        const sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params
        );

        db = {
            sequelize,
            Sequelize,
            models: {}
        };

        let modules = [
            require('./models/users'),
            require('./models/todos')
        ];

        // Initialize models
        modules.forEach( (module) => {
            const model = module(db.sequelize, db.Sequelize, config);
            console.log(model.name);
            db.models[model.name] = model;
        });

        Object.keys(db.models).forEach( key => {
            // db.models[key].associate(db.models);
            if (db.models[key].hasOwnProperty('associate')){
                db.models[key].associate(db.models);
            }
        });
    }

    return db;

}