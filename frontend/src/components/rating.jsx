import propTypes from 'prop-types';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
const Rating = ({ stars, text }) => {
    const starArray = [];

    for (let i = 0; i < 5; i++) {
        starArray.push(
            stars >= i + 1 ? <FaStar key={i} /> : stars >= i + 0.5 ? <FaStarHalfAlt key={i} /> : <FaRegStar key={i} />
        );
    }
    return <>
        {starArray}
        <span className='rating-text'>{text} Reviews</span>
    </>;
}
Rating.propTypes = {
    stars: propTypes.number,
    text: propTypes.number
}
export default Rating;