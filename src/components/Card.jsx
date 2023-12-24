import "./Card.css";
import { useState, useEffect } from 'react';
import '../data/sample.json';
import { useAuthState, useDbUpdate, useDbData } from '../utilities/firebase';
import { dateFormat, timeFormat } from '../utilities/jsFunctions';

const Card = ({ user, concert, cid, toggleSelectedConcert }) => {
  concert.attendees = concert.attendees !== undefined ? concert.attendees : [];

  const isUserSignedUp =
    user &&
    (concert.attendees !== undefined
      ? concert.attendees.includes(user.uid)
      : false);

  const [userData] = useDbData(user ? `/User/` : null);

  const [values, setValues] = useState([]);

  const actualid = cid + 1;
  const [updateUserData] = useDbUpdate(user ? `/Concerts/${actualid}` : null);

  const handleSignUp = () => {
    if (isUserSignedUp) {
      const attendeez = concert.attendees;
      let index = attendeez.indexOf(user.uid);
      if (index > -1) {
        attendeez.splice(index, 1);
      }
      updateUserData({ attendees: attendeez });
    } else {
      updateUserData({ attendees: [...concert.attendees, user.uid] });
    }
  };

  useEffect(() => {
    if (userData) {
      setValues(userData);
    }
  }, [userData]);

  return (
    <div className='card m-1 p-2'>
      <img
        src={concert.image && concert.image.url ? concert.image.url : 'defaultImageURL'} // Replace 'defaultImageURL' with the path to your default image.
        className='card-img-top'
        alt={concert.name}
      />
      <div className="card-body">
        <h5 className="card-title">{concert.name}</h5>
        <p className="card-text">{dateFormat(concert.date)}</p>
        <p className="card-text">{timeFormat(concert.time)}</p>
        <p className="card-text">{concert.location.venue} 
          <img src="/GoogleMaps-Icon.webp" className="map-icon" alt="image" onClick={() => toggleSelectedConcert(concert.location.coordinates)}/>
        </p>
        <p className='card-text'>
          {concert.attendees.length === 0
            ? 'No one signed up yet'
            : concert.attendees.length === 1
            ? '1 already signed up'
            : `${concert.attendees.length} already signed up`}
        </p>
        {!user || !user.uid || !values[user.uid] ? (
          <button className='btn btn-secondary disabled'>
            Sign in and submit your info to sign up for this concert!
          </button>
        ) : (
          <button
            className={`btn ${isUserSignedUp ? 'btn-success' : concert.attendees.length === 0 ? 'btn-warning' : 'btn-primary'}`}
            onClick={handleSignUp}
          >
            {isUserSignedUp ? 'Signed up' : (concert.attendees.length === 0 ? 'Post and be the first to sign up' : 'Sign Up')}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
