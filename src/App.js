import React from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import Blog from './Blog/Blog';
import Dashboard from './Dashboard';
import CreateArticle from './Blog/CreateArticle';
import Login from './Auth/Login';
import Article from './Blog/Article';
import AboutUs from './AboutUs';
import SafetyTips from './SafetyTips';
import Register from './Auth/Register';
import Resources from './Resources/Resources';

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

        <Route exact path="/auth/dashboard" element={<Dashboard />} />
        <Route exact path="/blog/create" element={<CreateArticle />} />
        <Route path="/blog/article/:articleId" element={<Article />} />
      </Routes>
    </Router>
  );
};

export default App;
