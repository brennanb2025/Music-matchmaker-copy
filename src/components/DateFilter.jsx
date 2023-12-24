import { useState } from 'react';
import './DateFilter.css';

const DateFilter = ({ setFilteredConcertsByDate, concerts }) => {
  const [startDate, setStartDate] = useState(''); // State for start date
  const [endDate, setEndDate] = useState(''); // State for end date

  const handleDateFilter = () => {
    // Filter concerts based on the selected date range
    const filteredByDate = Object.entries(concerts).filter(([id, concert]) => {
      const concertDate = new Date(concert.date);
      const filterStartDate = new Date(startDate);
      const filterEndDate = new Date(endDate);

      return concertDate >= filterStartDate && concertDate <= filterEndDate;
    });

    // Update the filtered concerts
    setFilteredConcertsByDate(filteredByDate);
  };
  return (
    <div className='date-picker mb-3'>
      <div className='date-picker-item'>
        <label htmlFor='startDate' className='form-label'>
          Start Date:
        </label>
        <input
          type='date'
          id='startDate'
          className='form-control'
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div className='date-picker-item mx-2'>
        <label htmlFor='endDate' className='form-label'>
          End Date:
        </label>
        <input
          type='date'
          id='endDate'
          className='form-control'
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className='date-picker-button-container'>
        <button
          className='date-picker-button btn btn-primary'
          onClick={handleDateFilter}
        >
          Filter
        </button>
      </div>
    </div>
  );
};

export default DateFilter;
