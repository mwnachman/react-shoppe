import React, { cloneElement, PropTypes, Component } from 'react';
import Nav from './Nav.jsx';
import { fetchUser, fetchProducts, addToCart } from '../api';
// import { withRouter } from 'react-router';

export default class App extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      user: {},
      products: [],
      accessToken: null, 
      cart: []
    };
    this.updateUser = this.updateUser.bind(this);
    this.addProducts = this.addProducts.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }
  // bind up here because it's better for some reason (prevents all lower
  // components from having to think about whether they need to re-render too??)

  componentDidMount() {
    fetchProducts()
      .then(products => {
        this.setState({ products: products });
      });
    const id = localStorage.getItem('id', id);
    const accessToken = localStorage.getItem('accessToken', accessToken);
    if (id && accessToken) {
      fetchUser(id, accessToken).then(user => {
        this.setState({ user: user, accessToken: accessToken });
      })
    }
  }

  updateUser(user) {
    if (user.id && user.accessToken) {
      localStorage.setItem('id', user.id);
      localStorage.setItem('accessToken', user.accessToken);
    }
    this.setState({ user: user, accessToken: accessToken });
  }

  addProducts(products) {
    this.setState({ products: products })
  }

  addToCart(itemId) {
    const { user, accessToken } = this.state;
    console.log('in add to cart in App class');
    if (!user.id || !accessToken) {
      console.log('data in add to cart in app class', user.id, accessToken)
      return null;
    }
    addToCart(user.id, accessToken, itemId)
      .then((cart) => {
        console.log('cart', cart);
        this.setState({ cart: cart });
      })
  }

  render() {
    return (
      <div className='app'>
        <Nav />
        <div className='app-child'>
          { cloneElement(this.props.children, {
            // router: this.props.router,
            updateUser: this.updateUser,
            products: this.state.products.map(product => {
              const isInCart = this.state.cart.some((item) => {
                return item.id === product.id;
              });
              if (isInCart) {
                return {
                  ...product,
                  isInCart
                }
              } else {
                return product;
              }
            }),
            addToCart: this.addToCart
            }) 
          }
        </div>
      </div>
    );
  }
}

// export default withRouter(App);
  // we took out 'default' from in front of class and
  // stopped passing the router down as a prop --
  // we were doing this.props.router.push('/') instead of 
  // browserHistory.push('/') in the SignUp redirect
  // but now that we switched it we don't need the 'withRouter'
  // or to pass the router down as a prop

App.propTypes = {
  children: PropTypes.element
};
