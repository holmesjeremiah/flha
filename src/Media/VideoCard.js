import React from 'react';
import { GrFormView } from "react-icons/gr";
import { CiEdit } from "react-icons/ci";
import Post from './Post';


function VideoCard({ articleInfo }) {
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

    function showDiague() {
        const dialog = document.querySelector("dialog");
        dialog.showModal();
    }
    function hideDiague() {
        const dialog = document.querySelector("dialog");
        dialog.close();
    }


    return (
        <div class="card" style={{ backgroundColor: '', border: '1px solid #D3D7DC', borderRadius: '10px' }}>
            {
                articleInfo.image
                && <img class="card-img-top" src={'https://api.jeremiah.business' + articleInfo.image} alt="Card image cap" style={{ height: '400px', objectFit: 'cover', borderBottom: '2px solid #84B7D3', borderRadius: '10px' }} />
            }
            {
                articleInfo.youtubeUrl && (
                    <iframe
                        className="card-video-top"
                        src={`https://www.youtube.com/embed/${articleInfo.youtubeUrl}`}
                        title="YouTube video player"
                        style={{ borderRadius: '10px', height: '400px', width: '100%', objectFit: 'cover', borderBottom: '2px solid #84B7D3' }}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                )
            }


            <div class="card-body">
                <h5 class="card-title text-dark">{articleInfo.title}</h5>

                <div className="d-flex flex-wrap mb-3 ">
                    {(articleInfo.tags ?? []).map((tag, index) => (


                        <span key={index} style={{ backgroundColor: '#1b3a59' }} className="badge text-light me-1 mb-1">{tag}</span>

                    ))}
                </div>
                <div className="mb-1 text-dark">@{articleInfo.publication.author} | {new Date(articleInfo.publication.date).toLocaleDateString('en-US')}</div>

                <p class="card-title text-dark" style={{

                }}>{articleInfo.caption}</p>

            </div>
        </div>

    );
}

export default VideoCard;