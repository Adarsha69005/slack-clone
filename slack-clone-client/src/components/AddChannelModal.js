import {React, useState, useEffect} from "react";
import { Button, Header, Image, Modal, Container, Form, Input,Message } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';

const CREATE_CHANNEL_MUTATION = gql`
    mutation createChannel($teamId: Int!, $name: String!) 
    {
        createChannel (teamId: $teamId, name: $name) {
            ok
            channel {
                id
                name
            }
        }
    }
`;


const ChannelModal = ({open, onAddChannelClick}) => {


    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    let navigate = useNavigate();

    let {teamId} = useParams();

    const getValues = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        if(name === 'name') {
            setName(value);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setNameError('');
        console.log('clicked');
        console.log(name);
        const response = await createChannel({
            variables: {teamId: parseInt(teamId), name: name},
            optimisticResponse: {
                createChannel : {
                    id: teamId,
                    __typename:"Channel",
                    name:name,
                    ok:'ok',
                    channel:'channel'
                }
            }
        });
        // const response = await createTeam({variables: {name: name}});
        console.log('response:',response.data.createChannel);
        // const {ok,errors, team } = response.data.createTeam;
        if(response.data.createChannel.ok) {
            // navigate(`/view-team/${teamId}`);
            onAddChannelClick();
        }
        
    };

    const [createChannel] = useMutation(CREATE_CHANNEL_MUTATION);

    return (<Modal
      onClose={onAddChannelClick}
      onOpen={onAddChannelClick}
      open={open}
      trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>Add Channel</Modal.Header>
      <Modal.Content>
        <Modal.Description>
        <Container text>
            {/* <Header as='h2'>Create a Team</Header> */}
            <Form>
            <Form.Field error={!!nameError}><Input  fluid value={name}  name='name' placeholder='Channel Name' onChange={getValues}  /></Form.Field>
            <Button onClick={onSubmit}>Submit</Button> 
            <Button color='red' onClick={onAddChannelClick}>Cancel</Button> 
            </Form>   
            {(nameError) ? 
            <Message
                error
                header= "There was some errors with your submission"
                list= {[nameError]}
             /> 
             : null}  
        </ Container>
        </Modal.Description>
      </Modal.Content>
    </Modal>);
};

export default ChannelModal;