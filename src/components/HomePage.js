import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
//import AnnounceImageUpload from './AnnounceImageUpload';
import './HomePage.css';
import NotifCard from './NotifCard';
import { Helmet } from 'react-helmet';

function HomePage() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user has logged in
                console.log(authUser);
                setUser(authUser);
            } else {
                //user is logged out
                setUser(null);
            }
        })

        return () => {
            // perform clean up actions
            unsubscribe();
        }
    }, [user]);

    useEffect(() => {
        db.collection('announce').orderBy('date', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
            })))
        })
    }, []);


    return (
        <div className="HomePage">
            <Helmet>
                <title>Kidify</title>
                <meta
                    name="description"
                    content="Welcome to KIDIFY!. You are currently viewing the home page of Kidify! "
                    data-react-helmet="true"
                />
                <meta
                    property="og:description"
                    content="Welcome to KIDIFY!. You are currently viewing the home page of Kidify! "
                    data-react-helmet="true"
                />
                <meta
                    name="keywords"
                    content="Kidify, Church Lessons, Announcements, announcements, Home, home, church lessons, kidify"
                    data-react-helmet="true"
                />
                <meta
                    property="og:title"
                    content="Kidify"
                    data-react-helmet="true"
                />
            </Helmet>
            <h2>Announcements and Notifications</h2>
            <div className="HomePage__Notif">
                {
                    posts.map(({ id, data }) => (
                        < NotifCard
                            key={id}
                            user={data.username}
                            imageUrl={data.imageUrl}
                            title={data.title}
                            date={data.date}
                            message={data.caption}
                        />
                    ))

                }
            </div>
        </div>
    )
}

export default HomePage
