import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Components/Nav';
import Banner from './Banner';
import Header from './Components/Header';
import BlogPreview from './Blog/BlogPreview';
import Footer from './Components/Footer';
import PostBanner from './Media/MediaPreview';


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