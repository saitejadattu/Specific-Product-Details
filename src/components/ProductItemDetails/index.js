// Write your code here
import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {BsPlusSquare} from 'react-icons/bs'
import {BsDashSquare} from 'react-icons/bs'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class ProductItemDetails extends Component {
  state = {
    id: this.props.match.params.id,
    product: '',
    similarProductsList: [],
    productsDetails: '',
    cartValue: 1,
    apiStatus: apiStatusConstants.initial,
  }
  getProductDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {id} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(`https://apis.ccbp.in/products/${id}`, options)
    const data = await response.json()
    if (response.ok === true) {
      const productitem = data.similar_products.map(eachitem => ({
        availability: eachitem.availability,
        id: eachitem.id,
        brand: eachitem.brand,
        description: eachitem.description,
        imgUrl: eachitem.image_url,
        price: eachitem.price,
        rating: eachitem.rating,
        style: eachitem.style,
        title: eachitem.title,
        totalReviews: eachitem.total_reviews,
      }))
      const updatedData = {
        availability: data.availability,
        id: data.id,
        brand: data.brand,
        description: data.description,
        imgUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        style: data.style,
        title: data.title,
        totalReviews: data.total_reviews,
      }
      this.setState({
        productsDetails: updatedData,
        similarProductsList: productitem,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }
  componentDidMount() {
    this.getProductDetails()
  }
  onClickDecrease = () => {
    const {cartValue} = this.state
    if (cartValue > 1) {
      this.setState({cartValue: cartValue - 1})
    }
  }
  onClickIncrease = () => {
    const {cartValue} = this.state
    this.setState({
      cartValue: cartValue + 1,
    })
  }
  renderProductdetails = () => {
    const {similarProductsList, productsDetails, cartValue} = this.state
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
    } = productsDetails
    return (
      <>
        <div className="main-bg-similar-containerr">
          <div className="products-card-container">
            <div>
              <img src={imgUrl} alt="product" className="product-image" />
            </div>
            <div className="product-details-text-content">
              <h1>{title}</h1>
              <p>Rs {price}</p>
              <div className="star-container">
                <div className="star-number-container">
                  <p>{rating}</p>
                  <img
                    className="star-icon"
                    src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  />
                </div>
                <div className="total-reviews-text">
                  <p>{totalReviews}</p> Reviews
                </div>
              </div>
              <p>{description}</p>
              <p>
                Available: <p>{availability}</p>
              </p>
              <p>
                Brand: <p>{brand}</p>
              </p>
              <hr />
              <div className="product-add-buttons-container">
                <button
                  data-testid="minus"
                  onClick={this.onClickDecrease}
                  className="product-minus-button"
                >
                  <BsDashSquare />
                </button>
                <p>{cartValue}</p>
                <button
                  data-testid="plus"
                  onClick={this.onClickIncrease}
                  className="product-plus-button"
                >
                  <BsPlusSquare />
                </button>
              </div>
              <button className="add-to-cart-button">ADD TO CART</button>
            </div>
          </div>
          <div className="similar-products-container">
            <h1>Similar Products</h1>
            <div>
              <ul className="similar-products-un-ordered-list-container">
                {similarProductsList.map(each => (
                  <SimilarProductItem key={each.id} each={each} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  }
  onClickContinueShopping = () => {
    const {history} = this.props
    history.replace('/products')
  }
  renderFailureView = () => {
    return (
      <div className="failure-container">
        <img
          className="failure-image"
          alt="failure view"
          alt="error view"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        />
        <h1>Product Not Found</h1>
        <button
          className="continue-shopping-button"
          onClick={this.onClickContinueShopping}
        >
          Continue Shopping
        </button>
      </div>
    )
  }
  renderLoader = () => {
    return (
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    )
  }
  renderAllProducts = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductdetails()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
  render() {
    const {productsDetails, isLoading} = this.state

    return (
      <>
        <Header />
        <div className="loader-container">{this.renderAllProducts()}</div>
      </>
    )
  }
}
export default ProductItemDetails
