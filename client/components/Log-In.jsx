import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { logIn } from '../api';

const propTypes = {
  updateUser: PropTypes.func
};

export default class LogIn extends React.Component {
  

  render() {
    return (
      <div className='auth-login'>
        <form onSubmit={(e) => {
            e.preventDefault();
            console.log(e.target);
            logIn(e.target)
              .then(user => {
                this.props.updateUser(user);
                browserHistory.push('/');
              }
            );
          }}>
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

LogIn.displayName = 'LogIn';
LogIn.propTypes = propTypes;
