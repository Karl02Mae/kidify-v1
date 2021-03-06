import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import { auth } from './firebase';

//Components for Web View
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Sidebar2 from './components/Sidebar2';
import Sidebar3 from './components/Sidebar3';
import Sidebar4 from './components/Sidebar4';
import Videos from './components/Videos';
import SearchPage from './components/SearchPage';
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLogin';
import AdminRegister from './components/AdminRegister';
import UploadAnnounce from './components/UploadAnnounce';
import VideoUploadPage from './components/VideoUploadPage';
import VideoPlayer from './components/VideoPlayer';
import UserProfile from './components/UserProfile';
import AboutUs from './components/AboutUs';
import Activities from './components/Activities';
import Journal from './components/Journal';
import AdminJournal from './components/AdminJournal';
import MyJournal from './components/MyJournal';
import QuizGame from './components/QuizGame';
import QuizScores from './components/QuizScores';

//Components for Mobile View
import MobileLogin from './Mobile_View/MobileLogin';
import MobileHeader from './Mobile_View/MobileHeader';
import MobileHome from './Mobile_View/MobileHome';
import MobileRegister from './Mobile_View/MobileRegister';
import MobileFooter from './Mobile_View/MobileFooter';
import MobileVideos from './Mobile_View/MobileVideos';
import MobileProfileSettings from './Mobile_View/MobileProfileSettings';
import MobileVerseUpload from './Mobile_View/MobileVerseUpload';
import MobileVideoUpload from './Mobile_View/MobileVideoUpload';
import MobileVideoPlayer from './Mobile_View/MobileVideoPlayer';
import MobileAboutUs from './Mobile_View/MobileAboutUs';
import MobileActivities from './Mobile_View/MobileActivities';
import MobileJournal from './Mobile_View/MobileJournal';
import MobileAdminJournal from './Mobile_View/MobileAdminJournal';
import MobileSearchPage from './Mobile_View/MobileSearchPage';
import MobileMyJournal from './Mobile_View/MobileMyJournal';


function App() {

  if (window.innerWidth < 767.98) {
    return (
      <div className='mobile'>

        <Router>

          <Switch>

            <Route path='/register'>
              <MobileRegister />
            </Route>

            <Route path='/login'>
              <MobileLogin />
            </Route>

            <Route path='/profile'>
              <MobileProfileSettings />
            </Route>

            <Route path='/activities'>
              <MobileActivities />
            </Route>

            <Route path='/journal'>
              <MobileJournal />
            </Route>

            <Route path='/journalDisplay'>
              <MobileAdminJournal />
            </Route>

            <Route path='/myjournal'>
              <MobileMyJournal />
            </Route>

            <Route path='/uploadverse'>
              <MobileVerseUpload />
            </Route>

            <Route path='/uploadvideos'>
              <MobileVideoUpload />
            </Route>

            <Route path='/videos'>
              <MobileHeader />
              <MobileVideos />
              <MobileFooter />
            </Route>

            <Route path='/search/:searchTerm'>
              <MobileHeader />
              <MobileSearchPage />
              <MobileFooter />
            </Route>

            <Route path='/play/:id'>
              <MobileVideoPlayer />
            </Route>

            <Route path='/aboutus'>
              <MobileHeader />
              <MobileAboutUs />
              <MobileFooter />
            </Route>

            <Route path='/' exact>
              <MobileHeader />
              <MobileHome />
              <MobileFooter />
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

            <Route path="/myjournal">
              <div className='app__page'>
                <Sidebar3 />
                <MyJournal />
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

            <Route path='/scores'>
              <div className='app__page'>
                <Sidebar />
                <QuizScores />
              </div>
            </Route>

            <Route path="/videos">
              <div className="app__page">
                <Sidebar2 />
                <Videos />
              </div>
            </Route>

            <Route path='/activities'>
              <div className='app__page'>
                <Sidebar3 />
                <Activities />
              </div>
            </Route>

            <Route path='/journal'>
              <div className='app__page'>
                <Sidebar3 />
                <Journal />
              </div>
            </Route>

            <Route path='/journalDisplay'>
              <div className='app__page'>
                <Sidebar />
                <AdminJournal />
              </div>
            </Route>

            <Route path='/quiz'>
              <div className='app__page'>
                <Sidebar3 />
                <QuizGame />
              </div>
            </Route>

            <Route path='/about'>
              <div className='app__page'>
                <Sidebar4 />
                <AboutUs />
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
