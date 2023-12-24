import React, { useState, useEffect } from 'react';
import Card from './Card';
import ConcertSearchBar from './ConcertSearchBar';
import './CardList.css';
import { Link } from 'react-router-dom';
import { sortConcertsByDate } from '../utilities/jsFunctions';
import Modal from './Modal';
import MapView from './MapView';
import DateFilter from './DateFilter';

const PostPage = ({ user, concerts }) => {


    const [selectedLocation, setSelectedLocation] = useState(); //Stores selected concert's location
    const [open, setOpen] = useState(false);
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    const toggleSelected = (item) => {
      setSelectedLocation(item);
      openModal();
    };


    
    const [filteredConcertsByName, setFilteredConcertsByName] = useState(
        Object.entries(concerts)
      );
      const [filteredConcertsByGenre, setFilteredConcertsByGenre] = useState(
        Object.entries(concerts)
      );
      const [filteredConcertsByDate, setFilteredConcertsByDate] = useState(
        Object.entries(concerts)
      );
      const [selectedGenre, setSelectedGenre] = useState('all');
      const [filteredConcerts, setFilteredConcerts] = useState([]); // Updated state for combined filtering
    
      const handleFilterConcerts = (newFilteredConcerts) => {
        const newFiltered = Object.entries(newFilteredConcerts);
        setFilteredConcertsByName(newFiltered);
      };
    
      const uniqueGenres = Array.from(
        new Set(Object.values(concerts).flatMap((concert) => concert.genre))
      ).sort();
    
      useEffect(() => {
        const filteredByGenre = sortConcertsByDate(
          Object.entries(concerts).filter(
            ([id, concert]) =>
              selectedGenre === 'all' || concert.genre.includes(selectedGenre)
          )
        );
        setFilteredConcertsByGenre(filteredByGenre);
      }, [selectedGenre, concerts]);
    
      useEffect(() => {
        const nameSet = new Set(
          filteredConcertsByName.map(([id, concert]) => concert.cid)
        );
        const dateSet = new Set(
          filteredConcertsByDate.map(([id, concert]) => concert.cid)
        );
        const intersection = filteredConcertsByGenre.filter(([id, concert]) =>
          nameSet.has(concert.cid) && dateSet.has(concert.cid)
        );
    
        const combinedFilteredConcerts = sortConcertsByDate(intersection);
        setFilteredConcerts(combinedFilteredConcerts);
      }, [filteredConcertsByName, filteredConcertsByGenre, filteredConcertsByDate]);
  return (
    <div className='container'>
      <Modal open={open} close={closeModal}>
        {selectedLocation !== undefined && (
          <MapView location={selectedLocation} />
        )}
      </Modal>
        <h1>Post Your Own Concert</h1>
        <Link to='/' className='back-button'>
        <button className='btn btn-secondary mt-3'>Back</button>
      </Link>
      

      <div className='mb-3'>
        <label htmlFor='genreFilter' className='form-label'>
          Filter by Genre:{' '}
        </label>
        <select
          id='genreFilter'
          className='form-select'
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          style={{ maxHeight: '200px', overflowY: 'auto' }}
        >
          <option value='all'>All Genres</option>
          {uniqueGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <ConcertSearchBar
        concerts={concerts}
        onFilterConcerts={handleFilterConcerts}
      />
      <DateFilter
        setFilteredConcertsByDate={setFilteredConcertsByDate}
        concerts={concerts}
      />
      {filteredConcerts.length === 0 ? (
        <h2>
          <br />
          No results...
        </h2>
      ) : (
        <div className='card-list'>
          {filteredConcerts.map(([id, concert]) => (
            <Card user={user} 
                  key={id} 
                  concert={concert} 
                  cid={concert.cid}
                  toggleSelectedConcert={toggleSelected}  />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostPage;
