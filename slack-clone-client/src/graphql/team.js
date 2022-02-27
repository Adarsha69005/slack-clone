import {gql, useQuery} from '@apollo/client';

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

export default allTeamsQuery;