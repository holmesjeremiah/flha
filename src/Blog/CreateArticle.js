
import React, { useState, } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import DatePicker from 'react-datepicker'; // Import the date picker component
import TimePicker from 'react-time-picker'; // Import the time picker component
import 'react-datepicker/dist/react-datepicker.css'; // Import date picker CSS
import 'react-time-picker/dist/TimePicker.css'; // Import time picker CSS
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'; // Import Editor's CSS
import axios from 'axios';
import Nav from '../Components/Nav';

import { GrFormView } from "react-icons/gr";
import { IoIosRefresh } from "react-icons/io";

import Footer from '../Components/Footer';
import { useAuth } from 'avacan-auth';


const CreateArticle = () => {
    const [url, setUrl] = useState('');
    const [videoId, setVideoId] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const [checked, setChecked] = useState(false);

    const { userEmail } = useAuth();



    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [articleInfo, setArticleInfo] = useState({
        title: "",
        description: "",
        publication: {
            author: getCurrentUser().username,
            date: new Date(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) // Set default time to current time
        },
        articleText: '',
        image: null,
        views: 0,
        tags: []
    });
    const [articlePublished, setArticlePublished] = useState(false);
    const [articleId, setArticleId] = useState(null);
    const [tag, setTag] = useState('');
    const [filteredOptions, setFilteredOptions] = useState([]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setArticleInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleTypeChange = () => {
        setChecked(!checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Basic validation
        console.log(articleInfo);
        if (!articleInfo.title || !articleInfo.description || !articleInfo.articleText || (!articleInfo.image && !videoId)) {
            alert("Please fill in all required fields");
            return;
        }
        try {

            const response = await axios.post(process.env.REACT_APP_API_URL + 'articles', articleInfo, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.statusText === 'Created') {
                setArticleId(response.data.objectId);
                setArticlePublished(true)
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }

    };

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

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

    const previewYoutube = (e) => {
        e.preventDefault();
        const videoId = getYouTubeVideoId(url);
        setArticleInfo(prevState => ({
            ...prevState,
            'youtubeUrl': videoId
        }));
        setArticleInfo(prevState => ({
            ...prevState,
            'image': null
        }));
        setVideoId(videoId);
    };




    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
        const contentState = newEditorState.getCurrentContent();
        const html = stateToHTML(contentState);
        setArticleInfo(prevState => ({
            ...prevState,
            articleText: html
        }));
    };

    const handleDateChange = (dateString) => {
        const date = new Date(dateString);

        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();

        const formattedDate = `${month}/${day}/${year}`;

        setArticleInfo(prevState => ({
            ...prevState,
            publication: {
                ...prevState.publication,
                date: formattedDate
            }
        }));
    };

    const handleTimeChange = (time) => {
        setArticleInfo(prevState => ({
            ...prevState,
            publication: {
                ...prevState.publication,
                time: time
            }
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }

        setArticleInfo(prevState => ({
            ...prevState,
            image: file
        }));
        setArticleInfo(prevState => ({
            ...prevState,
            'youtubeUrl': null
        }));

    };

    const handleTagsChange = async (e) => {
        const inputValue = e.target.value;
        setTag(inputValue);
        let tags = await axios.get(process.env.REACT_APP_API_URL + 'tags');
        tags = tags.data.objects.map(item => item.tag);

        // Filter the options based on the input value
        const filtered = tags.filter(option =>
            option.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredOptions(filtered);
    };
    const addTag = async () => {
        if (tag.trim() === "") {
            return; // Prevent adding empty tags
        }

        // Check if the tag already exists
        if (articleInfo.tags && articleInfo.tags.includes(tag)) {
            // Tag already exists, no need to add it again
            setTag('');
            return;
        }

        const tags = await axios.get(process.env.REACT_APP_API_URL + 'tags');
        console.log(tags.data.objects);
        if (!tags.data.objects.some(item => item.tag === tag)) {

            await axios.post(process.env.REACT_APP_API_URL + 'tags', { 'tag': tag }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        }


        let newTags = [];
        if (articleInfo.tags) newTags = [...articleInfo.tags];
        newTags.push(tag);

        setArticleInfo(prevState => ({
            ...prevState,
            tags: newTags
        }));
        setTag('');
    };

    const removeTag = (indexToRemove) => {
        setArticleInfo(prevState => ({
            ...prevState,
            tags: prevState.tags.filter((_, index) => index !== indexToRemove)
        }));
    };




    return (
        <div className="" style={{ backgroundColor: '#1b3a59' }}>
            <Nav />
            <form className="container text-light p-3" onSubmit={handleSubmit}>

                {
                    articlePublished ?
                        (
                            <div>
                                <h2>Article Posted</h2>
                                <div className="row align-items-center">
                                    <a href={"/blog/article/" + articleId}>
                                        <div className="col text-center " style={{ height: '200px' }}>
                                            <GrFormView size={50} />
                                            <p>View Article</p>
                                        </div>
                                    </a>
                                    <a href='#' onClick={() => {
                                        setEditorState(EditorState.createEmpty());
                                        setArticleInfo({
                                            title: "",
                                            description: "",
                                            publication: {
                                                author: getCurrentUser().username,
                                                date: new Date(),
                                                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // Set default time to current time
                                            },
                                            articleText: '',
                                            image: null,
                                            views: 0,
                                            tags: []
                                        });

                                        return setArticlePublished(false);
                                    }}>

                                        <div className="col text-center " style={{ height: '200px' }}>
                                            <IoIosRefresh size={50} />
                                            <p>Publish Another Article</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        ) :
                        (
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                    <h2>Create Blog Article</h2>


                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Title:</label>
                                    <input type="text" className="form-control bg-dark text-light" name="title" value={articleInfo.title} onChange={handleInputChange} />
                                </div>


                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="flexSwitchCheckDefault"
                                        checked={checked}
                                        onChange={handleTypeChange}
                                        style={{ accentColor: 'red' }}
                                    />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                                        Image / Youtube Video
                                    </label>
                                </div>
                                {
                                    !checked ?
                                        <div>
                                            <div className="mb-3">
                                                <label className="form-label">Image:</label>
                                                <input type="file" accept="image/*" onChange={handleImageChange} className="form-control bg-dark text-light" />
                                            </div>
                                            {
                                                imagePreview &&

                                                <div className="mt-3">
                                                    <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
                                                </div>
                                            }
                                        </div>
                                        :
                                        <div>
                                            <label className="form-label">Youtube URL:</label>
                                            <div className='mb-3 input-group'>

                                                <input
                                                    className='form-control bg-dark text-light'
                                                    type="text"
                                                    value={url}
                                                    onChange={handleUrlChange}
                                                    placeholder="Enter YouTube URL"
                                                    style={{ marginRight: '10px' }}
                                                />
                                                <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={previewYoutube}>Preview</button>

                                            </div>
                                            {videoId && (
                                                <div style={{ marginTop: '20px', }}>
                                                    <iframe
                                                        className="img-fluid"
                                                        style={{ maxHeight: '500px' }}
                                                        src={`https://www.youtube.com/embed/${videoId}`}
                                                        title="YouTube video player"
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                            )}
                                        </div>
                                }
                                <div className="mb-3 ">
                                    <label className="form-label">Article Text:</label>
                                    <div className='border border-white rounded-3'>

                                        <Editor

                                            editorState={editorState}
                                            onEditorStateChange={onEditorStateChange}
                                            wrapperClassName="wrapper-class"
                                            editorClassName="editor-class bg-dark text-light"
                                            toolbarClassName="toolbar-class"

                                        />
                                    </div>
                                </div>
                                <div className='mb-2 ' style={{ display: 'flex', gap: '25px', alignItems: 'end' }}>
                                    <div className=''>
                                        <label className="form-label">Tag:</label>
                                        <input
                                            type="text"
                                            className="form-control bg-dark text-light"
                                            name="tags"
                                            value={tag}
                                            onChange={handleTagsChange}
                                            list="tagSuggestions" // Using the list attribute
                                            autoComplete="off" // Disable browser's default autocomplete
                                        />
                                        <datalist id="tagSuggestions">
                                            {/* Display filtered options */}
                                            {filteredOptions.map((option, index) => (
                                                <option key={index} value={option} />
                                            ))}
                                        </datalist>
                                    </div>
                                    <div className=''>
                                        <button type="button" onClick={() => addTag()} className="btn btn-outline-light">Add Tag</button>
                                    </div>
                                </div>
                                <div className="d-flex flex-wrap mb-3">
                                    {(articleInfo.tags ?? []).map((tag, index) => (
                                        <a key={index} onClick={() => removeTag(index)} href="#">

                                            <span key={index} className="badge bg-primary me-1 mb-1">{tag}</span>
                                        </a>
                                    ))}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Short Description:</label>
                                    <textarea className="form-control bg-dark text-light" name="description" value={articleInfo.description} onChange={handleInputChange} />
                                </div>
                                <div className='row'>
                                    <div className="mb-3 col-4">
                                        <label className="form-label">Author:</label>
                                        <input type="text" className="form-control bg-dark text-light" name="author" value={articleInfo.publication.author} onChange={e => handleInputChange({ target: { name: 'publication', value: { ...articleInfo.publication, author: e.target.value } } })} />
                                    </div>
                                    <div className="mb-3 col-6">
                                        <label className="form-label">Date:</label>
                                        <br />
                                        <DatePicker
                                            selected={articleInfo.publication.date}
                                            onChange={handleDateChange}
                                            className="form-control bg-dark text-light"
                                        />
                                    </div>
                                    <div className="mb-3 col-6">
                                        <label className="form-label">Time:</label>
                                        <TimePicker
                                            onChange={handleTimeChange}
                                            value={articleInfo.publication.time}
                                            className="form-control bg-dark text-light"
                                            disableClock={true}
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-outline-light">Submit</button>
                            </div>
                        )
                }
            </form >
            <Footer />
        </div >
    );
};

export default CreateArticle;