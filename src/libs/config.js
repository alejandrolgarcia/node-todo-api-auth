// Config
// SEED
// process.env.SEED = process.env.SEED || 'NTodo$-AP1';

module.exports = {
    database: 'ntodo',
    username: '',
    password: '',
    params: {
        dialect: 'sqlite',
        storage: 'ntodo.sqlite',
        define: {
            underscored: true
        }
    },
    jwtSecret: 'NTodo$-AP1',
    jwtSession: { session: false }
};
