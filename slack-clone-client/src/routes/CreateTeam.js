import React, { useState } from 'react';
import { Container, Header , Input, Button, Message, Form} from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client';
import { useNavigate} from 'react-router-dom';

const CREATE_TEAM_MUTATION = gql`
    mutation createTeam($name: String!) 
    {
        createTeam (name: $name)
        {
          ok
          team {
            id
          }
          errors {
            path
            message
          }
        }
    }
`;

const Team = () => {

    const [name, setName] = useState('');
    // const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState('');
    // const [passwordError, setPasswordError] = useState('');
    let navigate = useNavigate();

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
        const response = await createTeam({variables: {name: name}});
        console.log('response:',response);
        const {ok,errors, team } = response.data.createTeam;
        if(ok) {
            navigate(`/view-team/${team.id}`);
        }
        // } else {
        //     errors.forEach(({ path, message}) => {
        //         if(`${path}` === 'email') {
        //             setEmailError(message);
        //         }
        //         if(`${path}` === 'password') {
        //             setPasswordError(message);
        //         }
        //     });

        // }
        
    };

    const [createTeam] = useMutation(CREATE_TEAM_MUTATION);

    return (
        <Container text>
        <Header as='h2'>Create a Team</Header>
        <Form>
        <Form.Field error={!!nameError}><Input  fluid value={name}  name='name' placeholder='Team Name' onChange={getValues}  /></Form.Field>
        <Button onClick={onSubmit}>Submit</Button> 
        </Form>   
        {(nameError) ? 
        <Message
            error
            header= "There was some errors with your submission"
            list= {[nameError]}
         /> 
         : null}  
    </Container>
    );
}

export default Team;