import React, { useState, useEffect } from 'react';

import { GrFormView } from "react-icons/gr";
import { getCurrentUser } from './Auth/Auth';
import { CiEdit } from "react-icons/ci";
import axios from 'axios';


const PostBanner = () => {
    const [orientationHorizontal, setOrientationHorizontal] = useState(false);
    const [show, setShow] = useState(false);
    const [articleInfo, setArticleInfo] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        e.preventDefault();
        setShow(true);
    };

    const fetchPosts = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + 'media');
            let media = response.data.objects;
            //if (filterBy) {
            //  medias = filterArticles(filterBy, medias)
            //}

            setArticleInfo(media[0]);

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
    if (!articleInfo || Object.keys(articleInfo).length === 0) {
        return <div>Loading...</div>;
    }
    return (
        <div style={{ padding: '50px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h1 style={{}}>FLHA News</h1>

            </div>
            <div
                id='home'
                className="h-100" // Use Bootstrap classes for height
                style={{
                    border: '0px',
                    display: 'flex',

                    justifyContent: 'center'
                }}

            >

                <div fluid className="h-100 p-5" style={{}}> {/* Container can be fluid for full width */}
                    <div className="row justify-content-center align-items-center h-100">

                        <div style={{ overflow: 'hidden', borderBottom: '2px solid #84B7D3', maxHeight: '500px', }} className="text-center col-sm-12 col-md-6">
                            {
                                articleInfo.youtubeUrl ?

                                    (
                                        <iframe
                                            className="img-fluid"
                                            src={`https://www.youtube.com/embed/${articleInfo.youtubeUrl}`}
                                            title="YouTube video player"
                                            style={{ width: '100%', height: '400px', objectFit: 'cover', }}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    )
                                    :
                                    <img
                                        src={'https://api.jeremiah.business' + articleInfo.image}
                                        alt="Article Image"
                                        className="" // Bootstrap class for responsive images
                                        style={{ objectFit: 'cover', width: '100%', borderRadius: '5px', }}
                                    />
                            }
                        </div>
                        <div className="text-center col-sm-12 col-md-6 m-3">

                            <div style={{ color: '#fff' }}>

                                <p>
                                    <h1 className="display-4 font-italic">{articleInfo.title}</h1>
                                    <div className="mb-1 text-dark">{articleInfo.publication.author} | {new Date(articleInfo.publication.date).toLocaleDateString('en-US')} | <GrFormView size={20} style={{ display: 'inline' }} />{articleInfo.views}</div>
                                    <div className="d-flex flex-wrap  " style={{ justifyContent: 'center' }}>
                                        {(articleInfo.tags ?? []).map((tag, index) => (


                                            <span key={index} className="badge bg-light text-dark me-1 mb-1">{tag}</span>

                                        ))}
                                    </div>
                                    <div style={{ justifyContent: 'center', display: 'flex' }}>

                                        <p className="my-3" style={{ maxWidth: '700px', color: 'black' }}>{articleInfo.caption}</p>
                                    </div>
                                    <a href={"/article/" + articleInfo._id.$oid} className="btn btn-outline-light btn-lg">View Article</a>
                                    <span> {
                                        getCurrentUser().level === 'admin' &&
                                        (
                                            <a href={"/updatearticle/" + articleInfo._id.$oid} className="btn btn-outline-light btn-lg"><CiEdit size={'25px'} /></a>

                                        )
                                    }</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    );
};

export default PostBanner;