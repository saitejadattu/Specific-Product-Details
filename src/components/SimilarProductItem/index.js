// Write your code here
import './index.css'
const SimilarProductItem = props => {
  const {each} = props
  const {
    id,
    brand,
    imgUrl,
    title,
    rating,
    totalReviews,
    style,
    price,
    description,
    availability,
  } = each
  return (
    <li className="similar-products-list-item">
      <img
        src={imgUrl}
        alt="similar product"
        className="similar-product-image"
      />
      <p>{title}</p>
      <p>{brand}</p>
      <div className="price-rating-container">
        <p>RS {price}/-</p>
        <div className="star-number-container">
          {rating}
          <img
            className="star-icon"
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
          />
        </div>
      </div>
    </li>
  )
}
export default SimilarProductItem
