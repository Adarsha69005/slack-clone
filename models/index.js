import Sequelize from 'sequelize';

const sequelize = new Sequelize('slack', 'postgres', 'postgres',{
    host:'localhost',
    dialect: 'postgres'
});

const models = {
    User: require('./user').default(sequelize, Sequelize),
    Channel: require('./channel').default(sequelize, Sequelize),
    // Member: sequelize.import('./member'),
    Message: require('./message').default(sequelize, Sequelize),
    Team: require('./team').default(sequelize, Sequelize),

};

Object.keys(models).forEach((modelName) => {
    if('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;


export default models;