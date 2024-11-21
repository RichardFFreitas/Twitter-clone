import React, { useState, useEffect } from 'react';

import Sidebar from '../Sidebar';
import TwitterForm from '../TwitterForm';
import Tweet from '../Tweet';
import Aside from '../Aside';

import { getAvatar, getRandomImage } from '../../utils/generateImages';
import { fetchTweets } from '../../api/tweet_api';

const Home = () => {
    const [tweets, setTweets] = useState([]);

    // Random user information
    const userName = "User";

    useEffect(() => {
        const loadTweets = async () => {
            const result = await fetchTweets();
            if (result.success && Array.isArray(result.data)) {
                const updatedTweets = result.data.map(tweet => ({
                    ...tweet,
                    avatar: getAvatar(`user${tweet.id}@email.com`),
                    name: tweet.name,
                    username: `user${Math.floor(Math.random() * 1000)}`,
                    time: new Date(tweet.created_at).toLocaleString([], { 
                        hour: '2-digit',
                        minute: '2-digit',
                    })
                }));
                setTweets(updatedTweets);
            } else {
                console.error("Fetched tweets are not an array:", result);
            }
        };
        loadTweets();
    }, []);
    return (
        <div className='flex mx-auto max-w-7xl'>
            <Sidebar />
            <main className='flex-grow border-l border-r border-gray-700 max-w-xl'>
                <header className='sticky top-0 z-10 bg-twitter-background bg-opacity-80 backdrop-blur-sm'>
                    <h2 className='px-4 py-3 text-xl font-bold'>For you</h2>
                </header>
                <TwitterForm
                    onTweet={(newTweet) => setTweets((prevTweets) => [newTweet, ...prevTweets])} 
                    userName={userName}
                    userUsername={`user${Math.floor(Math.random() * 1000)}`}
                    userAvatar= {getAvatar(`user${Math.floor(Math.random() * 1000)}@email.com`)}
                />
                <div>
                    {tweets.map(tweet => (
                        <Tweet key={tweet.id} tweet={tweet} />
                    ))}
                </div>
            </main>
            <Aside />
        </div>
    );
}

export default Home;
