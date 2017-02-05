import React, { Component, PropTypes } from 'react';

const propTypes = {
  favs: PropTypes.array,
  cart: PropTypes.array,
  products: PropTypes.array,
  user: PropTypes.object,
  updateCart: PropTypes.func,
  updateFavs: PropTypes.func,
  addToCart: PropTypes.func,
};


export default class Products extends Component {

  render() {
    const { addToCart, products } = this.props;
    return (
      <div className='products'>
        <div className='products-search'>
          <input className='products-search_input' />
        </div>
        <ul className='products-lists'>
          { this.props.products.map((product) => (
            <li 
              className='products-item'
              key={ product.id }
            >
              <img 
                src={ `/images/products/${product.image}` }
                className='products-item-stock-photo' />
              <div className='products-item-name'>
                { product.name }
              </div>
              <div className='products-item-description'>
                { product.description }
              </div>
              <div className='products-item-footer'>
                <div className='products-item-cart'>
                  <button onClick={() => addToCart(product.id)}>
                    <img src={`/images/AddToCart${product.inCart ? 'Selected' : 'Unselected'}.png`} />
                  </button>
                </div>
                <div className='products-item-favorite'> 
                  <img src='/images/HeartItemUnselected.png' />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Products.displayName = 'Products';
Products.propTypes = propTypes;
