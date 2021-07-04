import React, { useState, useEffect } from 'react';
import { Box, Image } from '@chakra-ui/react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    Input,
    Button,
    useToast,
    ScaleFade
} from "@chakra-ui/react"
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import {
    Paginator,
    Container,
    Previous,
    Next,
    PageGroup,
    usePaginator
} from "chakra-paginator";
import ListSkeleton from '../components/ListSkeleton'
import AddUserForm from '../components/AddUserForm'

const List = () => {
    const [users, setUsers] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isAddUserFormShown, setIsAddUserFormShown] = useState(false)

    const url = 'https://reqres.in/api/users'
    const { currentPage, setCurrentPage } = usePaginator({
        initialState: { currentPage: 1 }
    });
    const [pagesQuantity, setPagesQuantity] = useState()
    const [isEditMode, setIsEditMode] = useState(false)
    const [userToEdit, setUserToEdit] = useState()
    const [userFirstName, setUserFirstName] = useState()
    const [userLastName, setUserLastName] = useState()
    const [userEmail, setUserEmail] = useState()
    const [userId, setUserId] = useState()
    const [userAvatar, setUserAvatar] = useState()
    const toast = useToast()

    useEffect(() => {
        handleFetchUsers(currentPage)
    }, [currentPage])

    const handleFetchUsers = (offset) => {
        try {
            setIsLoading(true)
            fetch(`${url}?page=${offset}`).then((res) => res.json()).then((response) => {
                setUsers(response.data);
                setPagesQuantity(response?.total_pages)
                setIsLoading(false)
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteUser = (id) => {
        try {
            const usersFiltered = users.filter((user) => user.id !== id)
            setUsers(usersFiltered)
            fetch(`https://reqres.in/api/users/${id}`, {
                method: 'DELETE'
            }
            ).then((response) => {
                toast({
                    title: `User ID:${id} Deleted`,
                    status: "warning",
                    duration: 6000,
                    isClosable: true,
                })
            })
        } catch (error) {
            console.log(error);
        }

    }

    const handleEditUser = (_user, index) => {
        setUserToEdit(index)
        setUserFirstName(_user.first_name)
        setUserLastName(_user.last_name)
        setUserEmail(_user.email)
        setUserId(_user.id)
        setUserAvatar(_user.avatar)
        setIsEditMode(!isEditMode)
    }

    const handleUpdateUser = () => {
        try {
            const body = JSON.stringify({
                "id": userId,
                "avatar": userAvatar,
                "first_name": userFirstName,
                "last_name": userLastName,
                "email": userEmail
            });
            fetch(url, {
                method: 'PATCH',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                body: body
            }
            ).then((response) => {
                console.log('updated', response)
                users[userToEdit] = { id: userId, avatar: userAvatar, first_name: userFirstName, last_name: userLastName, email: userEmail }
                setIsEditMode(false)
                toast({
                    title: "User Updated",
                    status: "success",
                    duration: 6000,
                    isClosable: true,
                })
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box d="flex" p={["0", "4"]} flexDirection='column' justifyContent="center">
            <Box d="flex" width={["100%"]} p="8" ml="auto" mr="auto" flexDirection='row' justifyContent="space-around">
                <Button isLoading={isLoading} colorScheme="teal"
                    onClick={() => setIsAddUserFormShown(!isAddUserFormShown)}>{isAddUserFormShown ? "Hide From" : "Add User"}</Button>
                {isEditMode ? <Button isLoading={isLoading} colorScheme="teal"
                    onClick={handleUpdateUser}>SAVE</Button> : null}
            </Box>
            {isAddUserFormShown ?
                <ScaleFade initialScale={0.9} in={isAddUserFormShown}>
                    <AddUserForm /></ScaleFade> :
                null}
            <Text m="8" fontSize={"24px"}>Users List</Text>
            <Box d="flex" width={["100%"]} p="8" ml="auto" mr="auto" flexDirection='column' justifyContent="center">
                {!isLoading ? (
                    <>
                        <Table variant="simple" size={"sm"}>
                            <Thead>
                                <Tr>
                                    <Th colSpan={4}></Th>
                                    <Th >Name</Th>
                                    <Th>Last Name</Th>
                                    <Th>Email</Th>
                                    <Th colSpan={2} isNumeric>Edit</Th>
                                    <Th colSpan={2} isNumeric>Delete</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {users && users.map((user, index) => {
                                    return (
                                        <Tr key={index} height="50px" _hover={{ bg: '#033747' }}>
                                            {user && isEditMode && userToEdit === index ?
                                                <>
                                                    <Td colSpan={4}><Image mr="auto" ml="auto" borderRadius="full" src={user.avatar} boxSize="40px"
                                                    /></Td>
                                                    <Td> <Input variant="filled" placeholder="firstName" value={userFirstName} onChange={(event) => setUserFirstName(event.currentTarget.value)} /></Td>
                                                    <Td> <Input variant="filled" placeholder="lastName" value={userLastName} onChange={(event) => setUserLastName(event.currentTarget.value)} /></Td>
                                                    <Td> <Input variant="filled" placeholder="email" value={userEmail} onChange={(event) => setUserEmail(event.currentTarget.value)} /></Td>
                                                    <Td colSpan={2} onClick={() => handleEditUser(user, index)} isNumeric><EditIcon /></Td>
                                                    <Td colSpan={2} onClick={() => handleDeleteUser(user.id)} isNumeric><DeleteIcon /></Td>
                                                </> :
                                                <>
                                                    <Td colSpan={4}><Image mr="auto" ml="auto" borderRadius="full" src={user.avatar} boxSize="40px"
                                                    /></Td>
                                                    <Td>{user.first_name}</Td>
                                                    <Td>{user.last_name}</Td>
                                                    <Td>{user.email}</Td>
                                                    <Td colSpan={2} onClick={() => handleEditUser(user, index)} _hover={{ color: '#16BCF1', cursor: "pointer" }} isNumeric><EditIcon /></Td>
                                                    <Td colSpan={2} _hover={{ color: '#16BCF1', cursor: "pointer" }} isNumeric><DeleteIcon onClick={() => handleDeleteUser(user.id)} /></Td>
                                                </>
                                            }
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                        </Table>
                        <Box d="flex" width={["320px"]} p="8" ml="auto" mr="auto" flexDirection='column' justifyContent="center">
                            {users.length ?
                                <Paginator
                                    pagesQuantity={pagesQuantity}
                                    currentPage={currentPage}
                                    onPageChange={setCurrentPage}
                                >
                                    <Container align="center" justify="space-between" w="full" p={4}>
                                        <Previous>
                                            Previous
                                            {/* Or an icon from `react-icons` */}
                                        </Previous>
                                        <PageGroup isInline align="center" />
                                        <Next>
                                            Next
                                            {/* Or an icon from `react-icons` */}
                                        </Next>
                                    </Container>
                                </Paginator> :
                                null}
                        </Box>
                    </>
                ) :
                    <ListSkeleton />
                }
            </Box>

        </Box >

    );
};

export default List;
