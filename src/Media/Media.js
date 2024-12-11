import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { helix } from 'ldrs'


import { FaAngleDown } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";

import Nav from '../Components/Nav';
import Footer from '../Components/Footer';
import MediaCard from './MediaCard';

const Media = ({ }) => {
    const [medias, setMedias] = useState([]);
    const [sortBy, setSortBy] = useState('Latest');
    const [searchQuery, setSearchQuery] = useState('');

    helix.register()


    const fetchArticles = async () => {
        try {
            //const response = await axios.get(process.env.REACT_APP_API_URL + 'media');
            const response = fetch('/flha.media.json')
                
            
            let media = sortArticles('Latest', response);
            
            //if (filterBy) {
            //  medias = filterArticles(filterBy, medias)
            //}



            setMedias(media);

            console.log(medias);
        } catch (error) {
            console.error('Error fetching medias:', error);
            // Handle error gracefully
        }
    };

    const sortArticles = (sortBy, medias) => {
        if (sortBy === 'Hottest') {
            const sortedArticles = [...medias].sort((a, b) => b.views - a.views);
            return sortedArticles;
        } else if (sortBy === 'Latest') {
            const sortedArticles = [...medias].sort((a, b) => new Date(b.publication.date) - new Date(a.publication.date));
            return sortedArticles;
        }
    };
    const filterArticles = (filterBy, medias) => {
        let filteredArticles = medias.filter(article => {
            if (!article.tags) {
                return false;
            }
            return article.tags.includes(filterBy);
        });
        return filteredArticles;
    };

    const handleSortChange = (sortBy) => {
        setSortBy(sortBy);
        setMedias(sortArticles(sortBy, medias));
    };

    useEffect(() => {
        fetchArticles();

    }, []);

    return (
        <div >
            <Nav />
            <div className='' style={{}}>
                <div style={{ padding: '25px 50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '60px' }}>Media</div>

                </div>
                {medias.length === 0 ? (
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
                                {medias.map((article, key) => (
                                    <div className="col-lg-4 mb-5" key={article.id}>
                                        <MediaCard articleInfo={article} />
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

export default Media;