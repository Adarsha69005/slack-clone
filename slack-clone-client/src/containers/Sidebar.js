import React from "react";
import {gql, useQuery} from '@apollo/client';
import Channels from '../components/Channels';
import Teams from '../components/Team';
import findIndex from 'lodash/findIndex';
import decode from 'jwt-decode';


const allTeamsQuery = gql`
    query allTeams {
        allTeams {
            id
            name
            channels {
                id
                name
            }
        }
    }
`;


const Sidebar = ({currentTeamId}) => {
    const { loading, error, data } = useQuery(allTeamsQuery);
    console.log('data:',data);
    if(loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>
    console.log('fetched data:',data.allTeams)
    const teamIdx = currentTeamId ? findIndex(data.allTeams, ['id',parseInt(currentTeamId)]): 0;
    // const teamIdx = currentTeamId ? findIndex(data.allTeams, ['id',parseInt(currentTeamId, 10)]): 0;
    console.log('teamIdx:', teamIdx);
    const team = data.allTeams[teamIdx]
    console.log('team:',team);
    let username = '';
    try {
        const token = localStorage.getItem('token');
        const {user} = decode(token);
        username = user.username;
    } catch (err) {}
    return ( 
        <>
        <Teams teams={data.allTeams.map(t => ({
            id: t.id,
            letter: t.name.charAt(0).toUpperCase(),
        }))} />
        <Channels teamName={team.name} username={username} channels={team.channels} users={[{id:1, name:"slackbot"}]} />
        </>);
};

export default Sidebar;