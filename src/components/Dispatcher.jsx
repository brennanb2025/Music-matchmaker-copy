import { Routes, Route } from 'react-router-dom';
import CardList from './CardList';
import ProfilePage from './ProfilePage';
import ChatRoom from './ChatRoom';
import { useAuthState, useDbData } from '../utilities/firebase';
import { useState, useEffect } from 'react';
import PostPage from './PostPage';

const Dispatcher = ({ concerts }) => {
  const [user] = useAuthState();
  const [isLoading, setIsLoading] = useState(true);
  const [userData] = useDbData(user ? `/User` : null);

  useEffect(() => {
    if (user && userData) {
      setIsLoading(false);
    }
  }, [user, userData]);

  return (
    <Routes>
      <Route path='/' element={<CardList user={user} concerts={concerts} />} />
      <Route path='/profile' element={<ProfilePage concerts={concerts} />} />
      <Route path='/postpage' element={<PostPage  user={user} concerts={concerts}/>} />
      (!isLoading ? (
      <Route
        path='/chat/:concertId'
        element={
          <ChatRoom user={user} userData={userData} concerts={concerts} />
        }
      />
      ) : null)
    </Routes>
  );
};

export default Dispatcher;
