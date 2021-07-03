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
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  let history = useHistory();

  const handleSignup = async () => {

  }
  return (
    <Box minH="100vh" d="flex" alignItems="center" justifyContent="center" className="arcade">
      <Stack spacing={3} minW="360px">
        <Box d="flex" alignItems="center" justifyContent="center" flexDirection="column">

          <Text
            className="arcade"
            fontSize={["4vw", "2vw"]}
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            textAlign="center"
          >
            Signup
          </Text>
        </Box>

        <Text fontSize="2xl" mt="4" textAlign="center"> Let's get started 👋</Text>
        <Input placeholder="Username" value={username} onChange={(event) => setUsername(event.currentTarget.value)} />
        <Input placeholder="Email" value={email} onChange={(event) => setEmail(event.currentTarget.value.toLocaleLowerCase().trim())} />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <Button colorScheme="teal"
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
