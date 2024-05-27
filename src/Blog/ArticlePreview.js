import React from 'react';
import { GrFormView } from "react-icons/gr";
import { CiEdit } from "react-icons/ci";


function ArticlePreview({ articleInfo }) {
    if (!articleInfo || Object.keys(articleInfo).length === 0) {
        return <div>Loading...</div>; // Render loading state if articleInfo is not available
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
        <div class="card" style={{ backgroundColor: '#1b3a59', border: '2px solid #D3D7DC', borderRadius: '25px' }}>
            {
                articleInfo.image
                && <img class="card-img-top" src={'https://api.jeremiah.business' + articleInfo.image} alt="Card image cap" style={{ height: '150px', objectFit: 'cover', borderBottom: '2px solid #84B7D3', borderRadius: '25px' }} />
            }
            {
                articleInfo.youtubeUrl && (
                    <iframe
                        className="card-video-top"
                        src={`https://www.youtube.com/embed/${articleInfo.youtubeUrl}`}
                        title="YouTube video player"
                        style={{ borderRadius: '25px', height: '150px', width: '100%', objectFit: 'cover', borderBottom: '2px solid #84B7D3' }}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                )
            }


            <div class="card-body">
                <h5 class="card-title text-light">{articleInfo.title}</h5>
                <div className="d-flex flex-wrap mb-3 ">
                    {(articleInfo.tags ?? []).map((tag, index) => (


                        <span key={index} className="badge bg-light text-dark me-1 mb-1">{tag}</span>

                    ))}
                </div>
                <div className="mb-1 text-light">{articleInfo.publication.author} | {new Date(articleInfo.publication.date).toLocaleDateString('en-US')} | <GrFormView size={20} style={{ display: 'inline' }} />{articleInfo.views}</div>

                <a href={"/blog/article/" + articleInfo._id.$oid}>

                    <button style={{ backgroundColor: '#D3D7DC', color: '#1b3a59', padding: '10px 20px', borderRadius: '25px', fontSize: '15px' }}>View Article</button>
                </a>

            </div>
        </div>

    );
}

export default ArticlePreview;