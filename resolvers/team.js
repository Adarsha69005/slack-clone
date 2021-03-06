import formatErrors from "../formatErrors";
import requiresAuth  from "../permission";
import team from "../schema/team";

export default {
    Query : {
        allTeams: requiresAuth.createResolver(async (parent, args, {models, user}) => 
            models.Team.findAll({ where: { owner: user.id } }, { raw: true })),
    },
    // allTeams:async (parent, args, context) => 
    //         context.models.Team.findAll({ owner: 1 }, { raw: true }),
    // },
    Mutation: {
        createTeam: requiresAuth.createResolver(async (parent, args, {models, user}) => {
        try{
            console.log("at teamresolver:", user)
            console.log('useridtype:',typeof(user.id));
            const team = await models.Team.create({ ...args, owner: user.id });
            console.log('at resolver team::', team);
            await models.Channel.create({ name: 'general', public: true, teamId: team.id})
            return {
                ok: true,
                team
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
    Team: {
        channels: ({id}, args, {models}) => 
            models.Channel.findAll({ where: {teamId: id } }),
    },
};