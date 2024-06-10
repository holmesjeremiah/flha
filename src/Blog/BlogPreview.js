import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { FaAngleDown } from "react-icons/fa6";
import ArticlePreview from './ArticlePreview';

const BlogPreview = ({ articleCount }) => {
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
            if (articleCount) {
                setArticles(articles.slice(0, articleCount));
            }
            else {
                setArticles(articles);
            }
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
        <div className='' style={{ padding: '100px 0' }}>
            <div style={{ padding: '25px 50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ color: 'black', fontSize: '60px', textAlign: 'center' }}>FLHA Blog</div>

            </div>
            {articles.length === 0 ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>

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
                    <a style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none', }} href="/blog">

                        <button style={{ backgroundColor: '#1b3a59', padding: '15px 25px', borderRadius: '25px', fontSize: '20px', color: '#fff' }}>View All</button>
                    </a>
                </section>
            )}
        </div>
    );
};

export default BlogPreview;