import React from 'react';
import './VideoUploadPage.css';
import VideoUpload from './VideoUpload';
import { Helmet } from 'react-helmet';

function VideoUploadPage() {

    return (
        <div className="root">
            <Helmet>
                <title>Kidify - Upload Videos </title>
                <meta
                    name="description"
                    content="Welcome to KIDIFY!. if you are not an admin of this page, then please visit https://kidifyv1.netlify.app/."
                    data-react-helmet="true"
                />
                <meta
                    property="og:description"
                    content="Welcome to KIDIFY!. if you are not an admin of this page, then please visit https://kidifyv1.netlify.app/."
                    data-react-helmet="true"
                />
                <meta
                    name="keywords"
                    content="Kidify, Church Lessons, Upload, upload, church lessons, kidify"
                    data-react-helmet="true"
                />
                <meta
                    property="og:title"
                    content="Kidify - Upload Videos"
                    data-react-helmet="true"
                />
            </Helmet>
            <h1>Upload New Video Lessons</h1>
            <VideoUpload />
        </div>
    )
}

export default VideoUploadPage
