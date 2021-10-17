import React from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardConfirmPopup from './DeleteCardConfirmPopup';
import InfoToolTip from './InfoToolTip';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import { authorize, checkToken, register } from '../utils/auth';


function App(props) {
  // A Section For States
  //-----------------------------------------------------------------
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [didSucceed, setDidSucceed] = React.useState(false);
  const [forDeletion, setForDeletion] = React.useState();
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [isAvaterOpen, setIsAvatarOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isToolTipOpen, setIsToolTipOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [email, setEmail] = React.useState('');
  const [doneChecking, setDoneChecking] = React.useState(false);
  const [jwt, setJwt] = React.useState('');
  const history = props.history;

  //-----------------------------------------------------------------

  // A Section for Opening and Closing Popups
  //-----------------------------------------------------------------
  function handleAvatarOpen() {
    setIsAvatarOpen(true);
  }
  function handleEditOpen() {
    setIsEditOpen(true);
  }
  function handleAddOpen() {
    setIsAddOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleDeleteClick(id){
    setIsDeleteOpen(true);
    setForDeletion(id);
  }

  function closeAllPopups(){
    setIsAddOpen(false);
    setIsEditOpen(false);
    setIsAvatarOpen(false);
    setIsDeleteOpen(false);
    setSelectedCard({});
    setIsToolTipOpen(false);
  }
  //-----------------------------------------------------------------

  // A Section for Submit Handlers
  //-----------------------------------------------------------------
  function handleAddPlaceSubmit({link, name}){
    api.addCard(jwt, {link, name})
      .then((newCard) => {
        setCards([...cards, newCard.data]);
        closeAllPopups();
      })
      .catch(err => {
        console.log((`New Card not received properly: ${err}`));
      })
  }

  function handleUpdateUser(values){
    api.updateUserInfo(jwt, values)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo.user);
        closeAllPopups();
      })
      .catch(err => {
        console.log((`User update not received properly: ${err}`));
      })
  }

  function handleUpdateAvatar(url){
    api.updateAvatar(jwt, url)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo.user);
        closeAllPopups();
      })
      .catch(err => {
        console.log((`Avatar not received properly: ${err}`));
      })
  }

  function handleLogout(){
    setLoggedIn(false);
    setJwt('');
    localStorage.removeItem('jwt');
  }
  //-----------------------------------------------------------------

  // A Section for Other API Calls
  //-----------------------------------------------------------------

  // A Call for Checking User Token
  React.useEffect(()=> {
    if (localStorage.getItem('jwt')) {
      const token = localStorage.getItem('jwt');
      setJwt(token);
      checkToken(token)
        .then(data => {
          setLoggedIn(true);
          setEmail(data.email);
          history.push('/');
        })
        .then(()=>{
          setDoneChecking(true);
        })
        .catch(err => {
          console.log((`jwt checker broken: ${ err }`))
        })
    } else {
      console.log('no jwt found');
      setDoneChecking(true);
    }

  }, [loggedIn])

  function loginAuthorize(email, password) {
    authorize(email, password)
      .then(() => {
        setLoggedIn(true);
      })
      .then(() => {
        history.push('/');
      })
      .catch(err => {
        setLoggedIn(false)
        console.log((`Login Function Broken: ${ err }`))
      })
  }

  function registerUser(email, password) {
    register(email, password)
      .then((res) => {
        setDidSucceed(true);
      })
      .then(()=>{
        setIsToolTipOpen(true);
      })
      .catch(err => {
        setDidSucceed(false)
        console.log((`Register Function Broken: ${ err }`))
        setIsToolTipOpen(true);
      })
  }

  // A Call for Initial Cards
  React.useEffect(() => {
    api.getInitialCards(jwt)
      .then((res) => {
        setCards(res.data);
      })
      .catch(err => {
        console.log((`Cards could not be delivered as dialed: ${ err }`))
      })
  }, [jwt])

  // A Call for Initial User Info
  React.useEffect(()=>{
    api.getUserInfo(jwt)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(err => {
        console.log((`User info not received properly: ${ err }`));
      })
  }, [jwt])


  // A Set of Calls for Handling Likes
  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some(i => i === currentUser._id);

    // Send a request to the API and getting the updated card data
    function afterBoolean(newCard) {
      setCards((cards) => cards.map((c) => c._id === newCard._id ? newCard : c));
    }

    function handleFalse(id) {
      api.updateLikeTrue(jwt, id)
        .then((newCard) => {console.log(newCard); afterBoolean(newCard.card) })
        .catch(err => {
          console.log((`Like Functions Broken: ${ err }`))
        })
    }

    function handleTrue(id) {
      api.updateLikeFalse(jwt, id)
        .then((newCard) => {console.log(newCard); afterBoolean(newCard.card)})
        .catch(err => {
          console.log((`Like Functions Broken: ${ err }`))
        })
    }

    isLiked ? handleTrue(card._id): handleFalse(card._id);
  }

  // A Call for Deleting a Card
  function handleCardDelete(){
    api.deleteCard(jwt, forDeletion)
      .then(() => {
        setCards((cards) => cards.filter(card => card._id !== forDeletion))
        closeAllPopups();
      })
      .catch(err => {
        console.log((`Card Refuses to Leave Peacefully: ${ err }`))
      })
  }

  //-----------------------------------------------------------------
  if (!doneChecking) {return <div></div>}
  return (
    <CurrentUserContext.Provider value={ currentUser }>
      <div className="page__wrapper">
        <Switch>
          <ProtectedRoute exact path='/'
            cards={ cards }
            component={ Main }
            isLoggedIn={ loggedIn }
            onAddClick={ handleAddOpen }
            onAvatarClick={ handleAvatarOpen }
            onCardClick={ handleCardClick }
            onCardLike={ handleCardLike }
            onDeleteClick={ handleDeleteClick }
            onEditClick={ handleEditOpen }
            onLogoutClick={ handleLogout }
            email={ email }
          />
          <Route path='/signup' isloggedIn={ loggedIn } >
            <Register
              registerUser={ registerUser }
            />
          </Route>
          <Route path='/signin' isloggedIn={ loggedIn }>
            <Login
              setLoggedIn={ setLoggedIn }
              onSubmit={ loginAuthorize }
            />
          </Route>
          <Route path='/*'>
            { loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" /> }
          </Route>
        </Switch>
        <Footer />
        <ImagePopup
          onClose={ closeAllPopups }
          card={ selectedCard }
        />
        <AddPlacePopup
          isOpen={ isAddOpen }
          onClose={ closeAllPopups }
          onSubmit={ handleAddPlaceSubmit }
        />
        <EditAvatarPopup
          isOpen={ isAvaterOpen }
          onClose={ closeAllPopups }
          onSubmit={ handleUpdateAvatar }
        />
        <EditProfilePopup
          isOpen={ isEditOpen }
          onClose={ closeAllPopups }
          onSubmit={ handleUpdateUser }
        />
        <DeleteCardConfirmPopup
          isOpen={ isDeleteOpen }
          onClose={ closeAllPopups }
          onSubmit={ handleCardDelete }
        />
        <InfoToolTip
          isOpen={ isToolTipOpen }
          didSucceed={ didSucceed }
          onClose={ closeAllPopups }
        />
      </div>
    </CurrentUserContext.Provider>
  );

}

export default withRouter(App);
