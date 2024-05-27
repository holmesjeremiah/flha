import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Components/Nav';
import Header from './Components/Header';
import Resources from './Resources';
import Blog from './Blog/Blog';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BlogPreview from './Blog/BlogPreview';


function HomePage() {
    return (
        <div>
            <Nav />
            <Header />

            <BlogPreview articleCount={3} />
        </div>
    );
}

export default HomePage;