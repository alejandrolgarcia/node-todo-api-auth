
module.exports = app => {
    app.listen(app.get('port'), () => {
        console.log(`NToDos API - Port ${ app.get('port') }`);
    });
}