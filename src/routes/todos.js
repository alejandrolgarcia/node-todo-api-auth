
module.exports = app => {

    const Todos = app.db.models.Todos;

    app.route('/todos')
        .get( (req, res) => {
            // '/todos': List tasks
            Todos.findAll({})
                .then( result => res.json( result ) )
                .catch( error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .post( (req, res) => {
            // '/todos': Save new todo
            Todos.create(req.body)
                .then( result => res.json( result ) )
                .catch( error => {
                    res.status(412).json({ msg: error.message });
                });
        });

    app.route('/todos/:id')
        .get( (req, res) => {
            // '/todo/1': Find a task
            Todos.findOne({ where: req.params })
                .then( result => {
                    if( result ) {
                        res.json( result )
                    } else {
                        res.sendStatus(404);
                    }
                })
                .catch( error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .put( (req, res) => {
            // '/todo/1': Update a task
            Todos.update( req.body, { where: req.params })
                .then( result => res.sendStatus(204))
                .catch( erro => {
                    res.status(412).json({ msg: error.message });
                })
        })
        .delete( (req, res) => {
            // '/todo/1': Delete a task
            Todos.destroy({ where: req.params })
                .then( result => res.sendStatus(204) )
                .catch( error => {
                    res.status(412).json({ msg: error.message }); 
                });
        });
};