import { Alert } from "react-bootstrap";
import propTypes from 'prop-types';
const Message = ({ variant, children }) => {
    return (<Alert variant={variant}>
        {children}
    </Alert>);
}
Message.propTypes = {
    variant: propTypes.string,
    children: propTypes.string
}
Message.defaultProps = {
    variant: 'info'
}
export default Message;