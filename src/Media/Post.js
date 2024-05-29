import { React, useState, useRef, useEffect } from 'react';
import { GrFormView } from "react-icons/gr";
import { CiEdit } from "react-icons/ci";
import { IoCloseCircleOutline } from "react-icons/io5";



function Post({ articleInfo, hideDiague }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const dialogRef = useRef(null);






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
        <div class="" style={{ backgroundColor: '', borderRadius: '10px', maxWidth: '500px' }} ref={dialogRef}>

            {
                articleInfo.image
                && <img class="card-img-top" src={'https://api.jeremiah.business' + articleInfo.image} alt="Card image cap" style={{ height: '150px', objectFit: 'cover', borderBottom: '2px solid #84B7D3', borderRadius: '10px' }} />
            }
            {
                articleInfo.youtubeUrl && (
                    <iframe
                        className="card-video-top"
                        src={`https://www.youtube.com/embed/${articleInfo.youtubeUrl}`}
                        title="YouTube video player"
                        style={{ borderRadius: '10px', height: '150px', width: '100%', objectFit: 'cover', borderBottom: '2px solid #84B7D3' }}
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

                <p class="card-title text-dark" style={{}}>{articleInfo.caption}</p>



            </div>
            <a href='#' onClick={hideDiague} style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
                <IoCloseCircleOutline size={'75px'} style={{ margin: '20px' }} color='black' />

            </a>
        </div>

    );
}

export default Post;