import { useState } from 'react';
import {
  Button,
  Stack,
  Input,
  Box,
  Text
} from '@chakra-ui/react';
import {
  useHistory
} from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const url = 'https://reqres.in/api/login'

  let history = useHistory();

  const handleLogin = () => {
    try {
      setIsLoading(true)
      const body = JSON.stringify({
        "email": email,
        "password": password
      });
      fetch(url, {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: body
      }
      ).then((response) => {
        if (response.status === 200) {
          history.push("/list")
        }
        else {
          setIsError(true)
          setIsLoading(false)
        }
      })
    }
    catch (error) {
      console.log('error', error)
    }
  }

  const handleSignupClick = () => {
    history.push("/signup")

  }

  return (
    <Box minH="100vh" d="flex" alignItems="center" justifyContent="center">
      <Stack spacing={3} minW="360px">
        <Box d="flex" alignItems="center" justifyContent="center" flexDirection="column">
          <Text
            fontSize={["4vw", "2vw"]}
            bgClip="text"
            textAlign="center"
          >
            Reqres App
          </Text>
        </Box>
        <Text fontSize="2xl" textAlign="center"> Welcome back 👋</Text>
        {isError ? <Text fontSize="2xl" color="red" textAlign="center">Wrong email or password</Text> : null}

        <Input data-testid="login__email__input" placeholder="Email" value={email} onChange={(event) => setEmail(event.currentTarget.value.toLocaleLowerCase().trim())} required />
        <Input
          data-testid="login__password__input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          required
        />
        <Button isLoading={isLoading} colorScheme="teal"
          onClick={handleLogin}>Login</Button>
        <Box d="flex" flexDirection="column" >
          <Box d="flex" flexDirection="row" justifyContent="space-around" mb="4">
            <Text fontSize="l" pr="4"> Don't have an account yet?</Text>
            <Box _hover={{
              color: "teal"
            }}>
              <Button isLoading={isLoading} colorScheme="teal"
                onClick={handleSignupClick}>Sign Up</Button>
            </Box>

          </Box>
        </Box>
      </Stack>
    </Box>

  );
};

export default Login;
