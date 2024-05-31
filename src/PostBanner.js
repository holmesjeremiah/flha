import React, { useState, useEffect } from 'react';

import { GrFormView } from "react-icons/gr";
import { getCurrentUser } from './Auth/Auth';
import { CiEdit } from "react-icons/ci";
import axios, { all } from 'axios';

import { IoArrowBackCircleSharp, IoArrowForwardCircleSharp } from "react-icons/io5";



const PostBanner = () => {
    const [orientationHorizontal, setOrientationHorizontal] = useState(false);
    const [show, setShow] = useState(false);
    const [articleInfo, setArticleInfo] = useState({});
    const [currentPost, setCurrentPost] = useState(0);
    const [allPosts, setAllPosts] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        e.preventDefault();
        setShow(true);
    };
    const nextPost = () => {
        if (currentPost === 0) {
            return;

        }
        setCurrentPost(currentPost - 1)
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
            //if (filterBy) {
            //  medias = filterArticles(filterBy, medias)
            //}
            setAllPosts(media);

            console.log(media);
        } catch (error) {
            console.error('Error fetching medias:', error);
            // Handle error gracefully
        }
    };

    useEffect(() => {
        fetchPosts();
        const handleResize = () => {
            setOrientationHorizontal(window.innerWidth >= 800);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Render loading state if articleInfo is not available
    if (!allPosts || Object.keys(allPosts).length === 0) {
        return <div>Loading...</div>;
    }
    return (
        <div style={{ padding: '50px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '60px' }}>FLHA News</div>

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

                        <div style={{ overflow: 'hidden', borderBottom: '2px solid #84B7D3', maxHeight: '500px', }} className="text-center col-sm-12 col-md-6">
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
                                        src={'https://api.jeremiah.business' + allPosts[currentPost].image}
                                        alt="Article Image"
                                        className="" // Bootstrap class for responsive images
                                        style={{ objectFit: 'cover', width: '100%', borderRadius: '5px', }}
                                    />
                            }
                        </div>
                        <div className="text-center col-sm-12 col-md-6">

                            <div style={{}}>

                                <p>
                                    <h1 className="display-4 font-italic">{allPosts[currentPost].title}</h1>
                                    <div className="mb-1 text-dark">{allPosts[currentPost].publication.author} | {new Date(allPosts[currentPost].publication.date).toLocaleDateString('en-US')} | <GrFormView size={20} style={{ display: 'inline' }} />{allPosts[currentPost].views}</div>
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
            <div>

            </div>
        </div >
    );
};

export default PostBanner;