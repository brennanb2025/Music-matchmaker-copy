import "./Card.css";
import '../data/sample.json';
import { Link } from 'react-router-dom';
import { dateFormat, timeFormat } from '../utilities/jsFunctions';

const MyConcertCard = ({ concert, toggleSelectedConcert, attendeeInfo, concertId }) => {
  return (
    <div className='card m-1 p2' key={concert.cid}>
        <img
            src={concert.image.url}
            className='card-img-top'
            alt={concert.name}
        />
        <h5 className='card-title'>{concert.name}</h5>
        <p className='card-text'>{dateFormat(concert.date)}, {timeFormat(concert.time)}</p>
        <p className='card-text'>{concert.location.venue}</p>
        {/* deleted maps integration */}
        {/* <p className="card-text">{concert.location.venue} 
          <img src="/GoogleMaps-Icon.webp" className="map-icon" alt="image" onClick={() => toggleSelectedConcert(concert.location.coordinates)}/>
        </p> */}
        <h3 className='card-text'>
            {concert.attendees !== undefined ? concert.attendees.length : 0}{' '}
            signed up
        </h3>
        <br></br>
        <div className='attendee-info'>
            <h5>Attendees:</h5>
            {concert.attendees.map((uid) => (
                <div key={uid}>
                    <h6>{attendeeInfo[uid]?.Info.name}</h6>
                    {/* <p>Email: {attendeeInfo[uid]?.Info.email}</p>
                    <p>Phone: {attendeeInfo[uid]?.Info.phone}</p> */}
                </div>
            ))}
            <Link to={`/chat/${concertId}`}>
                <button className='btn btn-primary'>Go to Chat</button>
            </Link>
        </div>
    </div>
  );
};

export default MyConcertCard;
