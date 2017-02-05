import React, { PropTypes } from 'react';
import { signUp } from '../api';
import { browserHistory } from 'react-router';

const propTypes = {
  updateUser: PropTypes.func,
};

export default class SignUp extends React.Component {

  render() {
    return (
      <div className='auth-signup'> 
        <form onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target);
          signUp(e.target)
            .then(user => {
              this.props.updateUser(user);
              browserHistory.push('/');
            }
          );
        }}>
          <label>
            <input 
              placeholder='name'
              name='username'
              type='text'
            />
          </label>
          <label>
            <input 
              placeholder='email'
              name='email'
              type='text'
            />
          </label>
          <label>
            <input 
              placeholder='password'
              name='password'
              type='password'
            />
          </label>
          <button type='submit'>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

SignUp.displayName = 'SignUp';
SignUp.propTypes = propTypes;
