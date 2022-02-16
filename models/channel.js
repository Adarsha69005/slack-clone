export default (sequelize, DataTypes) => {
    const Channel = sequelize.define('channel', {
        name: {
            type: DataTypes.STRING,
        },
        public: DataTypes.BOOLEAN,
    }, { underscored: true});

    Channel.associate = (models) => {
        Channel.belongsTo(models.Team, {
            foreignKey: {
                name: 'teamId',
                field: 'team_id',
            },
        });
    };

    return Channel;
};