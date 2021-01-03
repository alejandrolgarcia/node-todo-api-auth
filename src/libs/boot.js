
module.exports = app => {

    app.db.sequelize.sync({ force: true }).then( () => {
        app.listen(app.get('port'), () => {
            console.log(`NToDos API - Port ${ app.get('port') }`); 
        });
    });

}