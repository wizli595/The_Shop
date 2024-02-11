import { Form, Button } from 'react-bootstrap';
import Loader from '../../components/Loader';
import Message from '../../components/message';
import FormContainer from '../../components/formContainer';
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useGetProductDetailsQuery, useUpdateProductMutation, useUploadProductImageMutation } from "../../features/slices/productsApiSlice";

const ProductEditScreen = () => {
    const { id: productId } = useParams();

    const navigate = useNavigate();

    const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productId);


    const [prodInfo, setProdInfo] = useState({
        name: "",
        price: 0,
        description: "",
        image: "",
        brand: "",
        category: "",
        countInStock: 0,
        onOrder: false
    });
    const [onOrder, setOnOrder] = useState(false);

    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

    const [uploadImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

    const changeHandler = (e) => {
        const { name, value, type } = e.target;
        setProdInfo(prv => (
            type === "number"
                ? { ...prv, [name]: value > 0 ? value : 0 }
                : { ...prv, [name]: value }
        ));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const newProd = { ...prodInfo, onOrder };

        try {
            await updateProduct({ productId, ...newProd }).unwrap();
            toast.success("Product updated");
            refetch();
            navigate("/admin/productlist");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };


    const uploadHandler = async (e) => {
        const { files } = e.target;
        const formData = new FormData();
        formData.append("image", files[0]);
        try {
            const res = await uploadImage(formData).unwrap();
            toast.success(res.message);
            setProdInfo(prv => ({ ...prv, image: res.image }));
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err.error);
        }
    };


    useEffect(() => {
        if (product) {
            setProdInfo(prv => ({ ...prv, ...product }));
            setOnOrder(product.onOrder || false);
        }
    }, [product]);
    return (
        <>
            <Link to={"/admin/productlist"} className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>

                {loadingUpdate && <Loader />}

                {
                    isLoading ? (<Loader />) :
                        error ? (<Message variant={"danger"}>{error?.data?.message || error.error}</Message>) :
                            (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='name' className='my-2'>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter new Name'
                                            name='name'
                                            value={prodInfo.name}
                                            onChange={changeHandler}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='price' className='my-2'>
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            type='number'
                                            placeholder='Enter new Price'
                                            name='price'
                                            value={prodInfo.price}
                                            onChange={changeHandler}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='description' className='my-2'>
                                        <Form.Label>description</Form.Label>
                                        <Form.Control
                                            as={"textarea"}
                                            rows={6}
                                            type='text'
                                            placeholder='Enter new Description'
                                            name='description'
                                            value={prodInfo.description}
                                            onChange={changeHandler}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='image' className='my-2'>
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter image url'
                                            name="image"
                                            value={prodInfo.image}
                                            onChange={changeHandler}
                                        />
                                        <Form.Control
                                            label="Choose file"
                                            type='file'
                                            onChange={uploadHandler}
                                        />
                                    </Form.Group>
                                    {loadingUpload && <Loader />}
                                    <Form.Group controlId='brand' className='my-2'>
                                        <Form.Label>Brand</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter new Brand'
                                            name='brand'
                                            value={prodInfo.brand}
                                            onChange={changeHandler}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='category' className='my-2'>
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter new Category'
                                            name='category'
                                            value={prodInfo.category}
                                            onChange={changeHandler}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='countInStock' className='my-2'>
                                        <Form.Label>Stock Count</Form.Label>
                                        <Form.Control
                                            type='number'
                                            placeholder='Enter new Stock Count'
                                            name='countInStock'
                                            value={prodInfo.countInStock}
                                            onChange={changeHandler}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='onOrder' className='my-2'>
                                        <Form.Check
                                            type="checkbox"
                                            label="On Order"
                                            checked={onOrder}
                                            onChange={(e) => setOnOrder(e.target.checked)}
                                        />
                                    </Form.Group>
                                    <Button type='submit' variant='primary' className='my-2'>Update</Button>
                                </Form>
                            )
                }
            </FormContainer >

        </>);
};

export default ProductEditScreen;