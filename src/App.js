import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import { auth } from './firebase';

//Components
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

function App() {

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

          <Route path="/play/:id/:url">
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

export default App;
