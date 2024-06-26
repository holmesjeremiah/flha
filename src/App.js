import React from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import Blog from './Blog/Blog';
import Dashboard from './Auth/Dashboard';
import CreateArticle from './Blog/CreateArticle';
import Login from './Auth/Login';
import Article from './Blog/Article';
import AboutUs from './AboutUs';
import SafetyTips from './SafetyTips';
import Register from './Auth/Register';
import Resources from './Resources/Resources';
import Media from './Media/Media';
import CreateMedia from './Media/CreateMedia';
import UserManagement from './Auth/UserMangement';

const App = () => {
  return (
    <Router>

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/blog" element={<Blog />} />
        <Route exact path="/AboutUs" element={<AboutUs />} />
        <Route exact path="/SafetyTips" element={<SafetyTips />} />
        <Route exact path="/Resources" element={<Resources />} />


        <Route exact path="/auth/login" element={<Login />} />
        <Route exact path="/auth/register" element={<Register />} />

        <Route exact path="/media" element={<Media />} />
        <Route exact path="/media/create" element={<CreateMedia />} />

        <Route exact path="/auth/dashboard" element={<Dashboard />} />
        <Route exact path="/auth/usermanagement" element={<UserManagement />} />
        <Route exact path="/blog/create" element={<CreateArticle />} />
        <Route path="/blog/article/:articleId" element={<Article />} />
      </Routes>
    </Router>
  );
};

export default App;
