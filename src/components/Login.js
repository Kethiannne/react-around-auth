import React from 'react';
import { Link } from 'react-router-dom';

export default function Login (props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChange(evt){
    evt.target.name === "email" ? setEmail(evt.target.value) : setPassword(evt.target.value);
  }

  function handleSubmit(evt){
    evt.preventDefault();

    props.onSubmit({
      email: email,
      password: password
    })
  }
  return (
    <div className='form form_dark'>
      <h2 style={{color: 'white'}} > Log in </h2>
      <input name="email" value={email} onChange={handleChange} type="email" required className="form__field form__field_dark"
        placeholder="Email" minLength={2} maxLength={40} />

      <input name="password" value={password} onChange={handleChange} type="password" required className="form__field form__field_dark"
        placeholder="Password" minLength={2} maxLength={200} />
      <button type="submit" className="form__save-button form__save-button_light button-hover">
        Log in
      </button>
      <Link to={'/signup'} className='form__link' > Not a member yet? Sign up here! </Link>
    </div>
  )
}
