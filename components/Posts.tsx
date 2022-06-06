import React from 'react';
import { db } from '../firebase';
import { collection, DocumentData, orderBy, query, QueryDocumentSnapshot } from 'firebase/firestore';
// https://www.npmjs.com/package/react-firebase-hooks
import { useCollection } from 'react-firebase-hooks/firestore';
import Post from './Post';

export default function Posts(): JSX.Element {
    const [realtimePosts, loading, error] = useCollection<DocumentData>(
        query(
            collection(db, 'posts'),
            orderBy('timestamp', 'desc')
        ),
        {
            snapshotListenOptions: { includeMetadataChanges: true }
        }
    );

    return (
        <div>{
            realtimePosts?.docs.map((post: QueryDocumentSnapshot) => {
                return <Post
                    key={post.id}
                    name={post.data().name}
                    message={post.data().message}
                    email={post.data().email}
                    timestamp={post.data().timestamp}
                    image={post.data().image}
                    postImage={post.data().postImage}
                />
            })}</div>
    )
}