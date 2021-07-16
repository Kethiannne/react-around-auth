import React from 'react'
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardConfirmPopup from './DeleteCardConfirmPopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoToolTip';
import * as Auth from '../auth';

function App() {
  // A Section For States
  //-----------------------------------------------------------------
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [didSucceed, setdidSucceed] = React.useState(true);
  const [forDeletion, setForDeletion] = React.useState();
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [isAvaterOpen, setIsAvatarOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isToolTipOpen, setIsToolTipOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
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

  // experimental stuff
    function handleToolTipOpen(){
      setIsToolTipOpen(true);
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
    api.addCard({link, name})
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
  }
  function handleUpdateUser(values){
    api.updateUserInfo(values)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch(err => {
        console.log((`User update not received properly: ${err}`));
      })
  }

  function handleUpdateAvatar(url){
    api.updateAvatar(url)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch(err => {
        console.log((`Avatar not received properly: ${err}`));
      })
  }

  function handleRegisterSubmit(){
    setIsToolTipOpen(true);
  }

  function handleLoginSubmit(){
    setLoggedIn(true);
  }

  function handleLogout(){
    setLoggedIn(false);
  }
  //-----------------------------------------------------------------

  // A Section for Other API Calls
  //-----------------------------------------------------------------

  // A Call for Checking User Token
  React.useEffect(()=>{
    handleTokenCheck();
  })

  const handleTokenCheck = () => {
    //build this later!!!
  }

  // A Call for Initial Cards
  React.useEffect(()=>{
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch(err => {
        console.log((`Cards could not be delivered as dialed: ${err}`))
      })
  }, [])

  // A Call for Initial User Info
  React.useEffect(()=>{
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(err => {
        console.log((`User info not received properly: ${err}`));
      })
  }, [])


  // A Set of Calls for Handling Likes
  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Send a request to the API and getting the updated card data
    function afterBoolean(newCard) {
      setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
    }

    function handleFalse(id) {
      api.updateLikeTrue(id)
        .then((newCard) => {afterBoolean(newCard)})
        .catch(err => {
          console.log((`Like Functions Broken: ${err}`))
        })
    }

    function handleTrue(id) {
      api.updateLikeFalse(id)
        .then((newCard) => {afterBoolean(newCard)})
        .catch(err => {
          console.log((`Like Functions Broken: ${err}`))
        })
    }

    isLiked ? handleTrue(card._id): handleFalse(card._id);
  }

  // A Call for Deleting a Card
  function handleCardDelete(){
    api.deleteCard(forDeletion)
      .then(() => {
        console.log('i did it!');
        setCards((cards) => cards.filter(card => card._id !== forDeletion))
        closeAllPopups();
      })
      .catch(err => {
        console.log((`Card Refuses to Leave Peacefully: ${err}`))
      })
  }

  //-----------------------------------------------------------------

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__wrapper">
        <BrowserRouter>

          <Switch>
            <ProtectedRoute exact path='/main-view'>
              <Header>
                <p>{currentUser.email}</p>
                <Link onClick={handleLogout()}>Logout</Link>
              </Header>
              <Main
                cards={cards}
                component={Main}
                isloggedIn={loggedIn}
                onAddClick={handleAddOpen}
                onAvatarClick={handleAvatarOpen}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onDeleteClick={handleDeleteClick}
                onEditClick={handleEditOpen}
              />
            </ProtectedRoute>

            <Route path='/signup' isloggedIn={loggedIn} >
              <Register onSubmit={handleRegisterSubmit} />
            </Route>

            <Route path='/signin' isloggedIn={loggedIn}>
              <Login onSubmit={handleLoginSubmit} />
            </Route>
            <Route path='*'>
              {loggedIn ? <Redirect to="/main-view" /> : <Redirect to="/signin" />}
            </Route>
          </Switch>

        </BrowserRouter>
        <Footer />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <AddPlacePopup isOpen={isAddOpen} onClose={closeAllPopups} onSubmit={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={isAvaterOpen} onClose={closeAllPopups} onSubmit={handleUpdateAvatar} />
        <EditProfilePopup isOpen={isEditOpen} onClose={closeAllPopups} onSubmit={handleUpdateUser} />
        <DeleteCardConfirmPopup isOpen={isDeleteOpen} onClose={closeAllPopups} onSubmit={handleCardDelete} />
        <InfoToolTip isOpen={isToolTipOpen} didSucceed={didSucceed} onClose={closeAllPopups}
          handleError={setIsToolTipOpen} handleErrors={setdidSucceed} handleIt={handleToolTipOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );

}

export default App;
