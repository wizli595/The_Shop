import { Link } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import Message from '../../components/message';
import Loader from '../../components/Loader';
import { useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery } from '../../features/slices/productsApiSlice';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';


const ProductListScreen = () => {
    const { data: products, isLoading, error, refetch } = useGetProductsQuery();

    const [createProduct, { isLoading: loadingCreat, error: creatError }] = useCreateProductMutation();

    const [deleteProduct, { isLoading: deleteLoading }] = useDeleteProductMutation();

    const createProductHandler = async () => {
        if (window.confirm("Are you sure you want to create a new product")) {
            try {
                await createProduct();
                refetch();
                toast.success("Product created successfully");
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure ??")) {
            try {
                await deleteProduct(id);
                refetch();
                toast.warning("DELETED");
            } catch (err) {
                console.log(err);
                toast.error(err?.data?.message || err.error);
            }
        }
    };
    return (<>
        <Row>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className='text-end'>
                <Button className='btn-sm m-3' onClick={createProductHandler}>
                    <FaEdit /> Create Product
                </Button>
            </Col>
        </Row>
        {loadingCreat && <Loader />}
        {deleteLoading && <Loader />}
        {isLoading ?
            (<Loader />) : error ?
                (<Message variant={"danger"}>{error?.data?.message}</Message>) :
                (<>
                    <Table striped hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>name</th>
                                <th>price</th>
                                <th>category</th>
                                <th>Brand</th>
                                <th></th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                products.map(e => (
                                    <tr key={e._id}>
                                        <td>{e._id}</td>
                                        <td>{e.name}</td>
                                        <td>{e.category}</td>
                                        <td>{e.price}</td>
                                        <td>{e.brand}</td>
                                        <td>
                                            <Button className='btn-sm mx-2'
                                                as={Link}
                                                to={"/admin/product/" + e._id + "/edit"}
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
                    </Table>
                </>)
        }

    </>);
};

export default ProductListScreen;