import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { helix } from 'ldrs'


import { FaAngleDown } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";

import ArticlePreview from './ArticlePreview';
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';

const Blog = ({ }) => {
    const [articles, setArticles] = useState([]);
    const [sortBy, setSortBy] = useState('Latest');
    const [searchQuery, setSearchQuery] = useState('');

    helix.register()


    const fetchArticles = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + 'articles');
            let articles = sortArticles('Latest', response.data.objects);
            //if (filterBy) {
            //  articles = filterArticles(filterBy, articles)
            //}

            setArticles(articles);

            console.log(articles);
        } catch (error) {
            console.error('Error fetching articles:', error);
            // Handle error gracefully
        }
    };

    const sortArticles = (sortBy, articles) => {
        if (sortBy === 'Hottest') {
            const sortedArticles = [...articles].sort((a, b) => b.views - a.views);
            return sortedArticles;
        } else if (sortBy === 'Latest') {
            const sortedArticles = [...articles].sort((a, b) => new Date(b.publication.date) - new Date(a.publication.date));
            return sortedArticles;
        }
    };
    const filterArticles = (filterBy, articles) => {
        let filteredArticles = articles.filter(article => {
            if (!article.tags) {
                return false;
            }
            return article.tags.includes(filterBy);
        });
        return filteredArticles;
    };

    const handleSortChange = (sortBy) => {
        setSortBy(sortBy);
        setArticles(sortArticles(sortBy, articles));
    };

    useEffect(() => {
        fetchArticles();

    }, []);

    return (
        <div >
            <Nav />
            <div className='' style={{}}>
                <div style={{ padding: '25px 50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h1 style={{}}>FLHA Blog</h1>
                    <div className='fs-1 ' style={{ paddingLeft: '20px' }}>

                        <a href="/auth/dashboard" style={{ textDecoration: 'none', color: 'black' }}>

                            <FaRegUserCircle />
                        </a>
                    </div>
                </div>
                {articles.length === 0 ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>

                        <l-helix
                            size="45"
                            speed="2.5"
                            color="black"
                        ></l-helix>
                    </div>
                ) : (
                    <section className="section pb-0 text-light">
                        <div className="container">
                            <div className="row">
                                {articles.map(article => (
                                    <div className="col-lg-4 mb-5" key={article.id}>
                                        <ArticlePreview articleInfo={article} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Blog;