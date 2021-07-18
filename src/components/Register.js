import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import {register} from '../auth';
import InfoToolTip from './InfoToolTip';

export default function Register (props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChange(evt){
    evt.target.name === "email" ? setEmail(evt.target.value) : setPassword(evt.target.value);
  }

  function handleSubmit(evt){
    evt.preventDefault();
    register(email, password)
      .then((res) => {
        res.message ? props.setDidSucceed(false) : props.setDidSucceed(true);
      })
      .then(()=>{
        props.setIsToolTipOpen(true);
      })
  }


  return (
    <main>
      <Header>
        <nav className='header__nav'>
          <Link className='header__link button__hover' to={ '/signin' } >Sign in</Link>
        </nav>
      </Header>
      <div className='form form_dark'>
        <h2> Sign up </h2>
        <input name="email" value={email} onChange={handleChange} type="email" required className="form__field form__field_dark"
          placeholder="Email" minLength={2} maxLength={40} />

        <input name="password" value={password} onChange={handleChange} type="password" required className="form__field form__field_dark"
          placeholder="Password" minLength={2} maxLength={200} />
        <button type="submit" onClick={handleSubmit} className="form__save-button form__save-button_light button-hover">
          Sign up
        </button>
        <Link to={'/signin'} className='form__link' >Already a member? Log in here!</Link>
      </div>
      <InfoToolTip isOpen={props.isOpen} didSucceed={props.didSucceed} onClose={props.onClose} />

    </main>
  )
}
