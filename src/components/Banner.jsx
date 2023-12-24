import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Banner.css';
import {
  signInWithGoogle,
  signOut,
  useAuthState,
  useDbData,
} from '../utilities/firebase';

const AuthButton = ({ user }) => {
  return (
    <button
      className='authButton btn btn-dark'
      onClick={user ? signOut : signInWithGoogle}
    >
      {user ? 'Sign out' : 'Sign in'}
    </button>
  );
};

const Banner = () => {
  const navigate = useNavigate();
  const [user] = useAuthState();
  const [userData] = useDbData(user ? `/User/` : null);

  useEffect(() => {
    if (user && userData && !userData.hasOwnProperty(user.uid)) {
      navigate('/profile');
    }
  }, [user, userData, navigate]);

  return (
    <div className='bannerContainer'>
      <div className='headerContainer'>
        <h1>Music Matchmaker</h1>
        <p>Find friends for your next concert!</p>
      </div>
      <div className='authButtonContainer'>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {user !== null && (
            <Link to='/profile'>
              <img
                src={user ? user.photoURL : null}
                alt='user profile pic'
                className='profile-pic'
              />
            </Link>
          )}
        </div>
        <AuthButton user={user} />
      </div>
    </div>
  );
};

export default Banner;
