import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Nav from '../Components/Nav';
import { GrFormView } from "react-icons/gr";
import { CiFacebook, CiInstagram, CiShare2 } from "react-icons/ci";
import { useParams } from 'react-router-dom';
import Footer from '../Components/Footer';


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



    if (!article || Object.keys(article).length === 0) {
        return <div>Loading...</div>;
    }



    return (
        <div >
            <Nav />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className=' p-5' style={{ maxWidth: '1000px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>

                        <h2 style={{ textAlign: 'center' }}>{article.title}</h2>
                    </div>
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
                                    <a href='#' onClick={() => share(window.location.href)}><CiFacebook size={'50px'} color='black' /></a>
                                </div>
                            </div>
                            <p style={{ fontSize: '15px' }}>By:  @{article.publication.author}  <br /> {new Date(article.publication.date).toLocaleDateString('en-US')} {article.publication.time} <br /> <GrFormView size={20} />{article.views}</p>
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

            <Footer />
        </div>
    );
};

export default Article;