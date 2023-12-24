import { useState, useEffect } from "react";
import { useAuthState, useDbUpdate, useDbData } from "../utilities/firebase";
import { Link } from "react-router-dom";
import UserProfileEditor from "./UserProfileEditor";
import MyConcertCard from "./MyConcertCard";
import Modal from "./Modal";
import MapView from "./MapView";

import {
  dateFormat,
  timeFormat,
  sortConcertsByDate,
} from "../utilities/jsFunctions";

const ProfilePage = ({ concerts }) => {
  const [user] = useAuthState();
  const [userConcerts, setUserConcerts] = useState([]);
  const [attendeeInfo, setAttendeeInfo] = useState({});
  const [attendeeData, id] = useDbData(`/User/`);

  useEffect(() => {
    if (user) {
      setUserConcerts(
        Object.entries(concerts).filter(([id, concert]) => {
          return concert.attendees !== undefined
            ? concert.attendees.includes(user?.uid)
            : false;
        })
      );
    }
  }, [user]);

  useEffect(() => {
    if (attendeeData) {
      setAttendeeInfo(attendeeData);
    }
  }, [attendeeData]);

  const [selectedLocation, setSelectedLocation] = useState(); //Stores selected concert's location
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const toggleSelected = (item) => {
    setSelectedLocation(item);
    openModal();
  };

  const sortedConcerts = [...userConcerts].sort((a, b) => {
    const dateA = new Date(a[1].date);
    const dateB = new Date(b[1].date);
    return dateA - dateB;
  });

  return (
    <div className="container">
      <Modal open={open} close={closeModal}>
        {selectedLocation !== undefined && (
          <MapView location={selectedLocation} />
        )}
      </Modal>
      <h1>
        <b>Profile</b>
      </h1>
      <Link to="/" className="back-button">
        <button className="btn btn-secondary mt-2">Back</button>
      </Link>
      <h2 className="mt-5">My Concerts</h2>
      {sortedConcerts.length === 0 && (
        <h4 className="m-4">
          None yet... Sign up for a concert on the main page!
        </h4>
      )}
      <div className="card-list">
        {sortedConcerts.map(([id, concert]) => (
          <MyConcertCard
            key={id}
            concert={concert}
            toggleSelectedConcert={toggleSelected}
            attendeeInfo={attendeeInfo}
            concertId={id}
          />
        ))}
      </div>
      <h2 className="mt-5">Edit Profile</h2>
      <UserProfileEditor />
    </div>
  );
};

export default ProfilePage;
