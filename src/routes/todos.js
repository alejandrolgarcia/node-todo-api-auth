
module.exports = app => {

    const Todos = app.db.models.Todos;

    app.route('/todos')
        .all(app.auth.authenticate())
        .get( (req, res) => {
            // '/todos': List tasks
            Todos.findAll({
                where: { user_id: req.user.id }
            })
                .then( result => res.json( result ) )
                .catch( error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .post( (req, res) => {
            // '/todos': Save new todo
            req.body.user_id = req.user.id;
            Todos.create(req.body)
                .then( result => res.json( result ) )
                .catch( error => {
                    res.status(412).json({ msg: error.message });
                });
        });

    app.route('/todos/:id')
        .all(app.auth.authenticate())
        .get( (req, res) => {
            // '/todo/1': Find a task
            Todos.findOne({ where: {
                id: req.params.id,
                user_id: req.user.id
            }})
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
            Todos.update( req.body, { where: {
                id: req.params.id,
                user_id: req.user.id
            }})
                .then( result => res.sendStatus(204))
                .catch( erro => {
                    res.status(412).json({ msg: error.message });
                })
        })
        .delete( (req, res) => {
            // '/todo/1': Delete a task
            Todos.destroy({ where: {
                id: req.params.id,
                user_id: req.user.id
            }})
                .then( result => res.sendStatus(204) )
                .catch( error => {
                    res.status(412).json({ msg: error.message }); 
                });
        });
};