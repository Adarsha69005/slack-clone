import React from 'react';
import { gql, useQuery } from '@apollo/client';

const allUsersQuery = gql`
    query getAllUsers {
        allUsers {
            id
            email
        }
    }
`;



function Home() {
    const { loading, error, data } = useQuery(allUsersQuery);
    if(loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>
    return data.allUsers.map(u => <h1 key={u.id}>{u.email}</h1>);
};

export default Home;