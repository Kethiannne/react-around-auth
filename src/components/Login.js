import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';


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
    <main>
      <Header>
        <nav className='header__nav'>
          <Link className='header__link button__hover' to={ '/signup' } >Sign up</Link>
        </nav>
      </Header>
      <div className='form form_dark'>
        <h2> Log in </h2>
        <input name="email" value={email} onChange={handleChange} type="email" required className="form__field form__field_dark"
          placeholder="Email" minLength={2} maxLength={40} />

        <input name="password" value={password} onChange={handleChange} type="password" required className="form__field form__field_dark"
          placeholder="Password" minLength={2} maxLength={200} />
        <button type="submit" className="form__save-button form__save-button_light button-hover">
          Log in
        </button>
        <Link to={'/signup'} className=' button__hover form__link ' > Not a member yet? Sign up here! </Link>
      </div>
    </main>
  )
}
