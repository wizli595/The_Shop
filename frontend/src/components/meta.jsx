import { Helmet } from "react-helmet-async";
import propTypes from 'prop-types';
const Meta = ({ title, desc = "", keyword = [] }) => {
    return (<>
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={desc} />
            <meta name="keyword" content={keyword} />
        </Helmet>

    </>);
}

Meta.propTypes = {
    title: propTypes.string,
    desc: propTypes.string,
    keyword: propTypes.array
}
export default Meta;