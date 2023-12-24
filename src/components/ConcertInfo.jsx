import React from 'react';

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
              <p className='card-text'>Date: {concertInfo.date}</p>
              <p className='card-text'>
                Location: {concertInfo.location.venue}
              </p>
              <p className='card-text'>Time: {concertInfo.time}</p>
              <p className='card-text'>Genre: {concertInfo.genre.join(', ')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcertInfo;
