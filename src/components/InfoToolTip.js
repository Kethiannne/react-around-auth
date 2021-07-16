import successImg from '../images/icons/success.png';
import failureImg from '../images/icons/failure.png';

export default function InfoToolTip (props) {

  const success = () => {
    return (
      <div className= {'form'}>
        <img src={successImg} alt={'Success'} className={'form__image'} />
        <h2 className={'form__title'}>
          Success! You have now been registered.
        </h2>
      </div>
      )
  }

  const failure = () => {
    return (
      <div className= {'form'} >
        <img src={failureImg} alt={'Failure'} className={'form__image'} />
        <h2 className={'form__title'}>
          Oops, something went wrong!
          Please try again.
        </h2>
      </div>
    )
  }

  return (
    <div className= {`popup popup_InfoToolTip ${props.isOpen ? `popup_opened` : ``}`}
      onClick={(evt)=>{
        if (evt.target === evt.currentTarget){
          props.onClose()
        }
      }}
    >
      <div className={`popup__wrapper`} >
        <button className="popup__close-button button-hover" type="button"
          aria-label="Close" onClick={props.onClose}>
        </button>

        {props.didSucceed ? success() : failure()}

      </div>
    </div>
  )
}
