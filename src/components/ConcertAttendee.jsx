const ConcertAttendee = ({ concertInfo, userData }) => {
  return (
    <div className="col-md-auto">
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <h3>Attendees</h3>
          </li>
          {concertInfo.attendees.map((attendeeId, index) => (
            <li key={index} className="list-group-item">
              {userData[attendeeId]?.Info?.name || "Unknown"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ConcertAttendee;
