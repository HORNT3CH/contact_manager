import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (dispatch, e) => {
    const { name, email, phone } = this.state;
    e.preventDefault();

    // Check for errors
    if (name === '') {
      this.setState({ errors: { name: 'Name is requires' } });
      return;
    }
    if (email === '') {
      this.setState({ errors: { email: 'Email Address is requires' } });
      return;
    }
    if (phone === '') {
      this.setState({ errors: { phone: 'Phone Number is requires' } });
      return;
    }

    const newContact = {
      name,
      email,
      phone
    };

    const res = await axios.post(
      'https://jsonplaceholder.typicode.com/users',
      newContact
    );

    dispatch({ type: 'ADD_CONTACT', payload: res.data });

    // Clear Errors
    this.setState({
      name: '',
      email: '',
      phone: '',
      error: {}
    });

    this.props.history.push('/');

    e.preventDefault();
  };

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className='card mb-3'>
              <div className='card-header display-4'>Add Contact</div>
              <div className='card-body'>
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label='Name'
                    name='name'
                    placeholder='Enter Name'
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label='Email'
                    name='email'
                    type='email'
                    placeholder='Enter
                    Email Address'
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label='Phone'
                    name='phone'
                    placeholder='Enter Phone Number'
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input
                    type='submit'
                    value='Add Contact'
                    className='btn btn-light btn-block'
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
