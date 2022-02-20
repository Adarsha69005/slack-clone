import React, { useState } from 'react';
import { Container, Header , Input, Button, Message, Form} from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client';
import { useNavigate} from 'react-router-dom';

const LOGIN_MUTATION = gql`
    mutation loginUser($email: String!, $password:String!) 
    {
        login (email: $email, password: $password)
        {
          ok
          token
          refreshToken
          errors {
            path
            message
          }
        }
    }
`;

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const getValues = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        if(name === 'email') {
            setEmail(value);
        }
        if(name === 'password'){
            setPassword(value);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');
        console.log('clicked');
        console.log(email,password);
        const response = await loginUser({variables: {email: email,password: password}});
        console.log('response:',response);
        const {ok, refreshToken, token, errors } = response.data.login;
        if(ok) {
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
        // }
    //         navigate("/");
        } else {
            errors.forEach(({ path, message}) => {
                if(`${path}` === 'email') {
                    setEmailError(message);
                }
                if(`${path}` === 'password') {
                    setPasswordError(message);
                }
            });

        }
        
    };

    const [loginUser, {data}] = useMutation(LOGIN_MUTATION);

    return (
        <Container text>
        <Header as='h2'>Login</Header>
        <Form>
        <Form.Field error={!!emailError}><Input  fluid value={email}  name='email' placeholder='Email' onChange={getValues}  /></Form.Field>
        <Form.Field error={!!passwordError}><Input  fluid value={password}  name='password' type='password' placeholder='Password' onChange={getValues} /></Form.Field>
        <Button onClick={onSubmit}>Submit</Button> 
        </Form>   
        {(emailError || passwordError) ? 
        <Message
            error
            header= "There was some errors with your submission"
            list= {[emailError || passwordError]}
         /> 
         : null}  
    </Container>
    );
}

export default Login;