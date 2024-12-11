import React, { useState, useEffect } from 'react';


import axios from 'axios';

import { IoArrowBackCircleSharp, IoArrowForwardCircleSharp } from "react-icons/io5";
import SubSignUp from '../SubSignUp';



const MediaPreview = () => {

    const [currentPost, setCurrentPost] = useState(0);
    const [allPosts, setAllPosts] = useState([]);
    const nextPost = () => {
        if (currentPost === 0) {
            return;
        }
        setCurrentPost(currentPost - 1)
    };
    const sortArticles = (medias) => {
        const sortedArticles = [...medias].sort((a, b) => new Date(b.publication.date) - new Date(a.publication.date));
        return sortedArticles;
    };
    const previousPost = () => {
        if (allPosts.length === currentPost + 1) {
            return
        }
        setCurrentPost(currentPost + 1)
    };

    const fetchPosts = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + 'media');
            let media = response.data.objects;

            setAllPosts(sortArticles(media));

        } catch (error) {
            console.error('Error fetching medias:', error);

        }
    };

    useEffect(() => {
        fetchPosts();

    }, []);

    // Render loading state if articleInfo is not available
    if (!allPosts || Object.keys(allPosts).length === 0) {
        return <div>Loading...</div>;
    }
    return (
        <div style={{  }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '60px', textAlign: 'center' }}>FLHA News</div>

            </div>
            <div
                className="h-100" // Use Bootstrap classes for height
                style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <div fluid className="h-100 p-5" style={{}}> {/* Container can be fluid for full width */}
                    <div className="row justify-content-center align-items-center h-100">

                        <div style={{ overflow: 'hidden', borderBottom: '2px solid #84B7D3', maxHeight: '500px', }} className="text-center col-sm-12 col-md-5">
                            {
                                allPosts[currentPost].youtubeUrl ?

                                    (
                                        <iframe
                                            className="img-fluid"
                                            src={`https://www.youtube.com/embed/${allPosts[currentPost].youtubeUrl}`}
                                            title="YouTube video player"
                                            style={{ width: '100%', height: '400px', objectFit: 'cover', }}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    )
                                    :
                                    <img
                                        src={'/logo.png'}
                                        alt="Article Image"
                                        className="" // Bootstrap class for responsive images
                                        style={{ objectFit: 'cover', width: '100%', borderRadius: '5px', }}
                                    />
                            }
                        </div>
                        <div className="text-center col-sm-12 col-md-5">

                            <div>

                                <p>
                                    <h1 className="display-4 font-italic">{allPosts[currentPost].title}</h1>
                                    <div className="mb-1 text-dark">{allPosts[currentPost].publication.author} | {new Date(allPosts[currentPost].publication.date).toLocaleDateString('en-US')}</div>
                                    <div className="d-flex flex-wrap  " style={{ justifyContent: 'center' }}>
                                        {(allPosts[currentPost].tags ?? []).map((tag, index) => (


                                            <span key={index} className="badge bg-light text-dark me-1 mb-1">{tag}</span>

                                        ))}
                                    </div>
                                    <div style={{ justifyContent: 'center', display: 'flex' }}>

                                        <p className="my-3" style={{ color: 'black' }}>{allPosts[currentPost].caption}</p>
                                    </div>

                                </p>
                                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                    <a onClick={() => nextPost()}>
                                        <IoArrowBackCircleSharp style={{ color: currentPost === 0 ? 'grey' : '#13758d', fontSize: '50px' }} />

                                    </a>
                                    <a onClick={() => previousPost()}>

                                        <IoArrowForwardCircleSharp style={{ color: allPosts.length === currentPost + 1 ? 'grey' : '#13758d', fontSize: '50px' }} />
                                    </a>


                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <SubSignUp />
        </div >
    );
};

export default MediaPreview;