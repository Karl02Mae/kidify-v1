import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth } from '../firebase';
import firebase from 'firebase/compat';
import './Comments.css';

function Comments() {
    const { id } = useParams();
    const [user, setUser] = useState('');
    //const [username, setUserName] = useState('');
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user has logged in
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
        let unsubs;
        if (id) {
            unsubs = db
                .collection("videos")
                .doc(id)
                .collection("comments")
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => ({
                        data: doc.data(),
                        id: doc.id
                    })));
                });
        }

        return () => {
            unsubs();
        };
    }, [id]);

    const postComment = (event) => {
        //event.preventDefault();

        db.collection("videos").doc(id).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }

    return (
        <div>
            {user && (
                <form className="post__commentBox">
                    <input
                        className="post__input"
                        type="text"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        className="post__button"
                        disabled={!comment}
                        type="submit"
                        onClick={postComment}
                    >
                        Post Comment
                    </button>
                </form>
            )}

            <div className="post__comments">
                {comments.map(({ id, data }) => (
                    <p key={id}>
                        <strong>{data.username}</strong> {data.text}
                    </p>
                ))}
            </div>


        </div>
    )
}

export default Comments
