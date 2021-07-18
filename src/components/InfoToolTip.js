import successImg from '../images/icons/success.png';
import failureImg from '../images/icons/failure.png';
import { useHistory } from 'react-router';

export default function InfoToolTip (props) {
  const history = useHistory();

  const close = () => {
    props.onClose();
    if(props.didSucceed) { history.push('/signin'); }
  }

  const success = () => {
    return (
      <div className= { 'form' } >
        <img src={ successImg } alt={ 'Success' } className={ 'form__image' } />
        <h2 className={ 'form__title' }>
          Success! You have now been registered.
        </h2>
      </div>
      )
  }

  const failure = () => {
    return (
      <div className= { 'form' } >
        <img src={ failureImg } alt={ 'Failure' } className={ 'form__image' } />
        <h2 className={ 'form__title' }>
          Oops, something went wrong!
          Please try again.
        </h2>
      </div>
    )
  }

  return (
    <div className= { `popup popup_InfoToolTip ${ props.isOpen ? `popup_opened` : `` }` }
      onClick={(evt)=>{
        if (evt.target === evt.currentTarget){
          close()
        }
      }}
    >
      <div className={`popup__wrapper`} >
        <button className="popup__close-button button-hover" type="button"
          aria-label="Close" onClick={ close }>
        </button>

        {props.didSucceed ? success() : failure()}

      </div>
    </div>
  )
}
