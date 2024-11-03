import React from 'react';
import { dateFormat, timeFormat } from '../utilities/jsFunctions';

const ConcertInfo = ({ concertInfo, userData }) => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-auto'>
          <div className='card'>
            <img
              src={concertInfo.image.url}
              className='card-img-top'
              alt={concertInfo.name}
            />
            <div className='card-body'>
              <h5 className='card-title'>{concertInfo.name}</h5>
              <p className="card-text">{dateFormat(concertInfo.date)}, {timeFormat(concertInfo.time)}</p>
              <p className='card-text'>
                Location: {concertInfo.location.venue}
              </p>
              <p className='card-text'>Genres: {concertInfo.genre.join(', ')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcertInfo;
