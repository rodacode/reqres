import { useState } from 'react';
import {
    Button,
    Input,
    Box,
    Text,
    useToast
} from '@chakra-ui/react';


const AddUserForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const url = 'https://reqres.in/api/users'
    const toast = useToast()


    const handleAddUser = () => {
        try {
            setIsLoading(true)
            const body = JSON.stringify({
                "id": 200,
                "first_name": firstName,
                "last_name": lastName,
                "avatar": avatar,
                "email": email
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
                if (response.status === 201) {
                    setIsLoading(false)
                    toast({
                        title: "User Created!",
                        status: "success",
                        duration: 6000,
                        isClosable: true,
                    })
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
        <Box d="flex" ml="auto" mr="auto" alignItems="center" justifyContent="center" flexWrap="wrap" width={["100%", "70%"]}>
            {isError ? <Text fontSize="2xl" color="red" textAlign="center">Wrong email </Text> : null}
            <Input m="2" placeholder="firstName" value={firstName} onChange={(event) => setFirstName(event.currentTarget.value)} required />
            <Input m="2" placeholder="lastName" value={lastName} onChange={(event) => setLastName(event.currentTarget.value)} required />
            <Input m="2" placeholder="email" value={email} onChange={(event) => setEmail(event.currentTarget.value)} required />
            <Input m="2" placeholder="avatar" value={avatar} onChange={(event) => setAvatar(event.currentTarget.value)} required />

            <Button isLoading={isLoading} colorScheme="teal"
                onClick={handleAddUser}>Submit</Button>
        </Box>

    );
};

export default AddUserForm;
