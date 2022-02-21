import formatErrors from "../formatErrors";
import requiresAuth  from "../permission";

export default {
    Mutation: {
        createTeam: requiresAuth.createResolver(async (parent, args, {models, user}) => {
        try{
            console.log("at teamresolver:", user)
            console.log('useridtype:',typeof(user.id));
            await models.Team.create({ ...args, owner: user.id });
            return {
                ok: true,
            };
        } catch (err) {
            console.log(err);
            return {
                ok: false,
                errors: formatErrors(err),
            };
        }
        }),
    },
};