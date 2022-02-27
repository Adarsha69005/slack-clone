import React from 'react';
import { useParams } from 'react-router-dom';

import Sidebar from '../containers/Sidebar';
import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';

const ViewTeam = () => { 

let {teamId} = useParams();
console.log('params teamId value:',teamId);
return (
 <AppLayout>
     <Sidebar currentTeamId={teamId} />
     <Header />
     <Messages>
        <ul className="message-list">
            <li />
            <li />
        </ul>
    </Messages>
    <SendMessage />
 </AppLayout>
);
};

export default ViewTeam;