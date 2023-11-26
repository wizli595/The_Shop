import { Container, Row, Col } from 'react-bootstrap';
import propTypes from 'prop-types';
const FormContainer = ({ children }) => {
    return (<>
        <Container>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>

    </>);
}
FormContainer.propTypes = {
    children: propTypes.array
}
export default FormContainer;