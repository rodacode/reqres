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

const PageNotFound = () => {


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
                        Page Not Found
                    </Text>
                </Box>
            </Stack>
        </Box>

    );
};

export default PageNotFound;
