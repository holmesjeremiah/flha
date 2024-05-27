import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { FaAngleDown } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";

import ArticlePreview from './ArticlePreview';
import Nav from '../Components/Nav';

const Blog = ({ }) => {
    const [articles, setArticles] = useState([]);
    const [sortBy, setSortBy] = useState('Latest');
    const [searchQuery, setSearchQuery] = useState('');

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
            <div className='text-light' style={{ backgroundColor: '#1b3a59' }}>
                <div style={{ padding: '25px 50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h1 style={{ borderBottom: '2px solid #84B7D3' }}>FLHA Blog</h1>
                    <div className='fs-1 ' style={{ paddingLeft: '20px' }}>

                        <a href="/auth/dashboard" style={{ textDecoration: 'none', color: 'white' }}>

                            <FaRegUserCircle />
                        </a>
                    </div>
                </div>
                {articles.length === 0 ? (
                    <p>No articles found.</p>
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
        </div>
    );
};

export default Blog;