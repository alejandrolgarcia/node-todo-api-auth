
const jwt = require('jwt-simple');

module.exports = app => {
    const cfg = app.libs.config;
    const Users = app.db.models.Users;

    app.post('/token', (req, res) =>{

        if (req.body.email && req.body.password ) {
            const email = req.body.email;
            const password = req.body.password;

            Users.findOne({ where: { email: email } })
                .then( user => {

                    if ( Users.isPassword(user.password, password) ) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        };
                        res.json({
                            token: jwt.encode(payload, cfg.jwtSecret)
                        });
                    } else {
                        res.sendStatus(401);
                        console.log(error);
                    }
                })
                .catch( error => {
                    res.sendStatus(401);
                    console.log(error);
                });
        } else {
            res.sendStatus(401);
            console.log(error);
        }

    });
};
