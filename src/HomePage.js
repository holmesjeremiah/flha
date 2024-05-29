import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Components/Nav';
import Header from './Components/Header';
import Blog from './Blog/Blog';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BlogPreview from './Blog/BlogPreview';
import Footer from './Components/Footer';
import Resources from './Resources/Resources';
import PostBanner from './PostBanner';
import Banner from './Banner';


function HomePage() {
    return (
        <div style={{ minHeight: '100vh' }}>
            <Nav />
            <Banner />
            <PostBanner />
            <Header />

            <BlogPreview articleCount={3} />

            <Footer />
        </div>
    );
}

export default HomePage;