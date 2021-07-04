import {
    Stack,
    Box,
    Text,
    Button
} from '@chakra-ui/react';
import {
    useHistory
} from "react-router-dom";

const Error500Page = () => {
    let history = useHistory();

    const handleHomeClick = () => {
        history.push("/")
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
                        Error 500 - Internal server error
                    </Text>
                    <Button colorScheme="teal" onClick={handleHomeClick}>Go to Homepage</Button>
                </Box>
            </Stack>
        </Box>

    );
};

export default Error500Page;
