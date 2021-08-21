import React from 'react';
import GlobalStyle from './GlobalStyle';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SettingPage from './pages/SettingPage';
import EditProfilePage from './pages/EditProfilePage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import HashTagPage from './pages/HashTagPage';
import TweetDetailPage from './pages/TweetDetailPage';
import ExplorePage from './pages/ExplorePage';
import BookmarkPage from './pages/BookmarkPage';
import { useThemeContext } from './context/ThemeContext';
import { ThemeProvider } from 'styled-components';

const App = () => {
  const { theme } = useThemeContext();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path='/' exact>
            <Layout>
              <HomePage />
            </Layout>
          </Route>
          <Route path='/explore' exact>
            <Layout>
              <ExplorePage />
            </Layout>
          </Route>
          <Route path='/bookmark' exact>
            <Layout>
              <BookmarkPage />
            </Layout>
          </Route>
          <Route path='/profile/:id' exact>
            <Layout>
              <ProfilePage />
            </Layout>
          </Route>
          <Route path='/tweet/:tweet_id' exact>
            <Layout>
              <TweetDetailPage />
            </Layout>
          </Route>
          <Route path='/search' exact>
            <Layout>
              <SearchPage />
            </Layout>
          </Route>
          <Route path='/hashtag/:tag' exact>
            <Layout>
              <HashTagPage />
            </Layout>
          </Route>
          <Route path='/setting' exact>
            <Layout>
              <SettingPage />
            </Layout>
          </Route>
          <Route path='/setting/edit' exact>
            <Layout>
              <EditProfilePage />
            </Layout>
          </Route>
          <Route path='/login'>
            <LoginPage />
          </Route>
          <Route path='/signup'>
            <SignupPage />
          </Route>
        </Switch>
      </Router>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
