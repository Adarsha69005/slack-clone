import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';


const ChannelWrapper = styled.div`
    grid-column: 2;
    grid-row: 1/4;
    background-color: #4e3a4c;
`;

const TeamNameHeader = styled.div`
    color: #fff;
    font-size: 20px;
`;

const SideBarList = styled.div`
    width: 100%;
    list-style: none;
    padding-left: 0px;
`;

const paddingLeft = 'padding-left: 10px';

const SideBarListItem = styled.li`
    padding: 2px;
    ${paddingLeft};
    &:hover {
       background: #3e313c; 
    }
`;

const SideBarListHeader = styled.div`${paddingLeft};`;

const PushLeft = styled.div`${paddingLeft}`;

const Green = styled.span`color: #38978d;`;

const Bubble = ({ on = true }) => (on ? <Green>⬤</Green>: '⬤');

const channel = ({ id, name }) => <SideBarListItem key={`${id}`}># {name}</SideBarListItem>

const user = ({ id, name }) => (
    <SideBarListItem key={`user-${id}`}>
        <Bubble /> {name}
    </SideBarListItem>
);

export default ({teamName, username, channels, users, onAddChannelClick}) => (
    <ChannelWrapper>
        <PushLeft>
            <TeamNameHeader>{teamName}</TeamNameHeader>
            {username}
        </PushLeft>
        <div>
            <SideBarList>
                <SideBarListHeader>Channels <Icon className="add plus circle" onClick={onAddChannelClick} /></SideBarListHeader>
                {channels.map(channel)}
            </SideBarList>
        </div>
        <div>
            <SideBarList>
                <SideBarListHeader>Direct Messages</SideBarListHeader>
                {users.map(user)}
            </SideBarList>
        </div>
    </ChannelWrapper>
);