import _ from 'lodash';

export default (e, models) => {
    if (e.errors.name === models.sequelize.ValidationError) {
    // if (e instanceof models.sequelize.ValidationError) {
        return e.errors.map(x => _.pick(x, ['path', 'message']));
    }
    return [{ path: 'name', message: 'something went wrong'}];
};