import { Spinner } from "react-bootstrap";
import propTypes from 'prop-types';

const Loader = ({ width = "100px", height = "100px" }) => {
    return (
        <Spinner animation="border"
            role="status"
            style={
                {
                    width: width,
                    height: height,
                    margin: "auto",
                    display: "block"
                }
            }
        >
        </Spinner>);
}
Loader.propTypes = {
    width: propTypes.string,
    height: propTypes.string
}
export default Loader;