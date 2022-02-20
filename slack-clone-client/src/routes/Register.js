import React, { useState } from 'react';
import { Container, Header , Input, Button, Message, Form} from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client';
import { useNavigate} from 'react-router-dom';

const REGISTER_USER_MUTATION = gql`
    mutation registerUser(
        $username: String!,
        $email: String!,
        $password: String!
        ) {
        register(username: $username, email: $email, password: $password) {
            ok
            errors {
                path
                message
            }
        }
    }
`;

const Register = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');

    let navigate = useNavigate();

    const getValues = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        if(name === 'email') {
            setEmail(value);
        }
        if(name === 'username') {
            setUsername(value);
        }
        if(name === 'password'){
            setPassword(value);
        }
    }

    const onSubmit = async (e) => {
        const errorList = {};
        e.preventDefault();
        setUsernameError('');
        setEmailError('');
        setPasswordError('');
        setNameError('');
        console.log('clicked');
        console.log(email,username,password);
        const response = await registerUser({variables: {email: email, username: username, password: password}});
        console.log('response:',response);
        const {ok, errors} = response.data.register;
        if(ok) {
            navigate("/");
        } else {
            errors.forEach(({ path, message}) => {
                if(`${path}` === 'username') {
                    setUsernameError(message);
                }
                if(`${path}` === 'email') {
                    setEmailError(message);
                }
                if(`${path}` === 'password') {
                    setPasswordError(message);
                }
                if(`${path}` === 'name') {
                    setNameError(message);
                }
                // err[`${path}Error`] = message;
            });

        }
        
    };

    const [registerUser, {data}] = useMutation(REGISTER_USER_MUTATION);
    
    return (

    <Container text>
        <Header as='h2'>Register</Header>
        <Form>
        <Form.Field error={!!usernameError}><Input  fluid value={username} name='username' placeholder='Username' onChange={getValues} /></Form.Field>
        <Form.Field error={!!emailError} ><Input fluid value={email} name='email' placeholder='Email' onChange={getValues}  /></Form.Field>    
         <Form.Field error={!!passwordError}><Input  fluid value={password} name='password' type='password' placeholder='Password' onChange={getValues} /></Form.Field>    
        <Button onClick={onSubmit}>Submit</Button> 
        </Form>
        {(usernameError || emailError || passwordError || nameError) ? 
        <Message
            error
            header= "There was some errors with your submission"
            list= {[usernameError || emailError || passwordError || nameError]}
         /> 
         : null}      
    </Container>);
};

export default Register;