import { Link } from 'react-router-dom';
import { Table, Button, Toast } from 'react-bootstrap';
import Message from '../../components/message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useDeleteUserMutation, useGetUsersQuery } from '../../features/slices/usersApiSlice';
import { FaTimes, FaCheck, FaEdit, FaTrash } from 'react-icons/fa';
const UserListScreen = () => {

    const { data: users, isLoading, error, refetch } = useGetUsersQuery();

    const [deleteUser] = useDeleteUserMutation();

    const deleteHandler = async (id) => {

        if (window.confirm("Are you sure ??")) {
            try {
                await deleteUser(id);
                refetch();
                toast.warning("DELETED");
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };
    return (<>

        <h1>All Users</h1>
        {
            isLoading ? (<Loader />) : error ?
                <Message variant={"danger"}>{error?.data?.message}</Message> :
                (<Table striped hover responsive className='table-sm'>
                    <thead>
                        <tr className='text-uppercase'>
                            <th>id</th>
                            <th>name</th>
                            <th>email</th>
                            <th>role</th>
                            <th>admin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(e => (
                                <tr key={e._id}>
                                    <td>{e._id}</td>
                                    <td>
                                        <a href={"mailto:" + e.email}>
                                            {e.name}
                                        </a>
                                    </td>
                                    <td>{e.email}</td>
                                    <td>{e.isAdmin ? "Owner" : "Client"}</td>
                                    <td>
                                        {e.isAdmin ?
                                            (<FaCheck color='green' />) :
                                            (<FaTimes color="red" />)}
                                    </td>

                                    <td>
                                        <Button
                                            className='btn-sm m-1'
                                            as={Link}
                                            to={"/user/" + e._id + "/edit"}
                                            variant='light'
                                        >
                                            <FaEdit />
                                        </Button>
                                        <Button
                                            className='btn-sm'
                                            variant='danger'
                                            onClick={() => deleteHandler(e._id)}
                                        >
                                            <FaTrash color='white' />
                                        </Button>

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>)
        }

    </>);
};

export default UserListScreen;