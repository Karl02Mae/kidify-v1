import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import { auth } from './firebase';

//Components for Web View
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Sidebar2 from './components/Sidebar2';
import Videos from './components/Videos';
import SearchPage from './components/SearchPage';
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLogin';
import AdminRegister from './components/AdminRegister';
import UploadAnnounce from './components/UploadAnnounce';
import VideoUploadPage from './components/VideoUploadPage';
import VideoPlayer from './components/VideoPlayer';
import UserProfile from './components/UserProfile';

//Components for Mobile View
import MobileLogin from './Mobile_View/MobileLogin';
import MobileHeader from './Mobile_View/MobileHeader';
import MobileHome from './Mobile_View/MobileHome';

function App() {

  if (window.innerWidth < 767.98) {
    return (
      <div className='mobile'>

        <Router>

          <Switch>

            <Route path='/login'>
              <MobileLogin />
            </Route>

            <Route path='/' exact>
              <MobileHeader />
              <MobileHome />
            </Route>

          </Switch>

        </Router>

      </div>
    )
  } else {

    return (
      <div className="app">

        <Router>

          <Header />

          <Switch>

            <Route path="/login">

              <AdminLogin />

            </Route>

            <Route path="/register">

              <AdminRegister />

            </Route>

            <Route path="/profile">
              <div className='app__page'>
                <UserProfile />
              </div>
            </Route>

            <Route path="/search/:searchTerm">
              <div className="app__page">
                <Sidebar />
                <SearchPage />
              </div>
            </Route>

            <Route path="/uploadvideos">
              <div className="app__page">
                <Sidebar />
                <VideoUploadPage />
              </div>
            </Route>

            <Route path="/videos">
              <div className="app__page">
                <Sidebar2 />
                <Videos />
              </div>
            </Route>

            <Route path="/play/:id/">
              <div className="app__page">
                <VideoPlayer />
              </div>
            </Route>

            <Route path="/newannounce">
              <div className="app__page">
                <Sidebar />
                <UploadAnnounce />
              </div>
            </Route>

            <Route path="/" exact>
              <div className="app__page">
                <Sidebar />
                <HomePage />
              </div>
            </Route>

          </Switch>
        </Router>



      </div>
    );
  }
}

export default App;
