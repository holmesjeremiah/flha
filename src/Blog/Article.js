import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Nav from '../Components/Nav';
import { GrFormView } from "react-icons/gr";
import { CiFacebook, CiInstagram, CiShare2 } from "react-icons/ci";
import { useParams } from 'react-router-dom';


const Article = ({ params }) => {
    const { articleId } = useParams();
    const [article, setArticle] = useState([]);

    useEffect(() => {
        // Fetch articles when the component mounts
        fetchArticle();
    }, []); // Empty dependency array ensures this effect runs only once

    useEffect(() => {
        // Update meta tags based on article information

    }, [article]); // Run this effect whenever article changes

    // Function to fetch an article
    const fetchArticle = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + 'articles/' + articleId);
            setArticle(response.data.object);

            setTimeout(function () {
                countView(response.data.object.views);
            }, 5000);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    // Function to count view
    const countView = async (views) => {
        try {
            await axios.put(
                process.env.REACT_APP_API_URL + 'articles/' + articleId + '/updateNestedObject',
                {
                    path: 'views',
                    new_value: parseInt(views) + 1
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        } catch (error) {
            console.error('Error counting view:', error);
        }
    };

    // Function to share
    const share = (url) => {
        const fburl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url);


        window.open(fburl, '_blank');

    };

    // Function to update or create meta tag
    const updateMetaTag = (property, attribute, value) => {
        // Select the meta tag with the given property
        const metaTag = document.querySelector(`meta[property="${property}"]`);

        // If the meta tag exists, update its attribute
        if (metaTag) {
            metaTag.setAttribute(attribute, value);
        } else {
            // If the meta tag doesn't exist, create it
            const newMetaTag = document.createElement('meta');
            newMetaTag.setAttribute('property', property);
            newMetaTag.setAttribute(attribute, value);
            document.head.appendChild(newMetaTag);
        }
    };

    if (!article || Object.keys(article).length === 0) {
        return <div>Loading...</div>;
    }
    function getYouTubeVideoId(url) {
        let videoId;
        if (url.includes('youtu.be')) {
            const match = url.match(/youtu\.be\/([^&?/]+)/);
            videoId = match ? match[1] : null;
        } else {
            const match = url.match(/[?&]v=([^&]+)/);
            videoId = match ? match[1] : null;
        }
        return videoId;
    }


    return (
        <div style={{ backgroundColor: '#1b3a59' }}>
            <Nav />
            <div className='text-light p-5'>
                <h2>{article.title}</h2>
                {article.youtubeUrl ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {
                            article.youtubeUrl && (
                                <iframe
                                    title="YouTube video player"
                                    className="img-fluid"
                                    style={{ width: '100%', height: '400px', objectFit: 'cover', borderBottom: '2px solid #84B7D3' }}
                                    src={`https://www.youtube.com/embed/${article.youtubeUrl}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            )
                        }
                    </div>

                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img
                            src={'https://api.jeremiah.business' + article.image}
                            alt="Article Image"
                            className="img-fluid"
                            style={{ borderBottom: '2px solid #84B7D3', margin: '25px', maxHeight: '500px' }}
                        />
                    </div>
                )}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <p style={{ textAlign: 'center', fontSize: '20px', margin: '10px', maxWidth: '300px' }}>{article.description}</p>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CiShare2 size={'30px'} />
                            Share
                            <div style={{ backgroundColor: '', height: '50px', padding: '0 10px', borderRadius: '15px' }}>
                                <a href='#' onClick={() => share(window.location.href)}><CiFacebook size={'50px'} color='white' /></a>
                            </div>
                        </div>
                        <p style={{ fontSize: '15px' }}>By:  {article.publication.author}  <br /> {new Date(article.publication.date).toLocaleDateString('en-US')} {article.publication.time} <br /> <GrFormView size={20} />{article.views}</p>
                        <div className="d-flex flex-wrap mb-3" style={{ justifyContent: 'center' }}>
                            {(article.tags ?? []).map((tag, index) => (


                                <span key={index} className="badge bg-light text-dark me-1 mb-1">{tag}</span>

                            ))}
                        </div>
                    </div>
                </div>
                <hr style={{ border: '2px solid #84B7D3' }} />
                <div style={{ fontSize: '20px' }} dangerouslySetInnerHTML={{ __html: article.articleText }}></div>
                <hr style={{ border: '2px solid #84B7D3' }} />
            </div>
        </div>
    );
};

export default Article;