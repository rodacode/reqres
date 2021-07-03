import React, { useState, useEffect } from 'react';
import { Box, Image } from '@chakra-ui/react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text
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

const List = () => {
    const [users, setUsers] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const url = 'https://reqres.in/api/users'
    const { currentPage, setCurrentPage } = usePaginator({
        initialState: { currentPage: 1 }
    });
    const [pagesQuantity, setPagesQuantity] = useState()


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
            console.log('wtf')
            fetch(`https://reqres.in/api/users/${id}`, {
                method: 'DELETE'
            }
            ).then((response) => {
                console.log('response', response)
            })
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <Box d="flex" p={["0", "4"]} flexDirection='column' justifyContent="center">
            <Text mb="8" fontSize={["4vw", "2vw"]}>Users List</Text>
            <Box d="flex" width={["100%"]} p="8" ml="auto" mr="auto" flexDirection='column' justifyContent="center">

                {!isLoading ? (
                    <>
                        <Table variant="simple" size={["sm", "md"]}>
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
                                {users && users.map((user) => {
                                    return (
                                        <Tr key={user.id} height="50px">
                                            <Td colSpan={4}><Image mr="auto" ml="auto" borderRadius="full" src={user.avatar} boxSize="40px"
                                            /></Td>
                                            <Td>{user.first_name}</Td>
                                            <Td>{user.last_name}</Td>
                                            <Td>{user.email}</Td>
                                            <Td colSpan={2} isNumeric><EditIcon /></Td>
                                            <Td colSpan={2} onClick={() => handleDeleteUser(user.id)} isNumeric><DeleteIcon /></Td>
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

        </Box>

    );
};

export default List;
