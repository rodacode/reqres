import { useState } from 'react';
import {
  Button,
  Stack,
  Input,
  Box,
  Text
} from '@chakra-ui/react';
import {
  Link,
  useHistory
} from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const url = 'https://reqres.in/api/register'

  let history = useHistory();

  const handleSignup = () => {
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
  return (
    <Box minH="100vh" d="flex" alignItems="center" justifyContent="center">
      <Stack spacing={3} minW="360px">
        <Box d="flex" alignItems="center" justifyContent="center" flexDirection="column">

          <Text
            fontSize={["4vw", "2vw"]}
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            textAlign="center"
          >
            Signup
          </Text>
        </Box>

        <Text fontSize="2xl" mt="4" textAlign="center"> Let's get started 👋</Text>
        {isError ? <Text fontSize="2xl" color="red" textAlign="center">Wrong email or password </Text> : null}
        <Input placeholder="Email" value={email} onChange={(event) => setEmail(event.currentTarget.value.toLocaleLowerCase().trim())} />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <Button isLoading={isLoading} colorScheme="teal"
          onClick={() => handleSignup(email, password, email)}>Sign up</Button>
        <Box d="flex" flexDirection="row" justifyContent="space-around">

          <Text fontSize="l"> Already have an account?</Text>
          <Box _hover={{
            color: "teal"
          }}>
            <Link to="/" >Login </Link>
          </Box>
        </Box>

      </Stack>
    </Box>

  );
};

export default Signup;
