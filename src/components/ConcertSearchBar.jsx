import { useState, useRef, useEffect, useMemo } from "react";
import Fuse from "fuse.js";
//import "./ConcertSearchBar.css";

const ConcertSearchBar = ({ concerts, onFilterConcerts }) => {
  // console.log("search concerts", concerts);
  // console.log("onfilterc", onFilterConcerts);
  const [searchTerm, setSearchTerm] = useState("");

  //Fuzzy search. Matches by the name of the concert
  const fuse = new Fuse(concerts, {
    keys: ["name"],
    threshold: 0.3,
    includeMatches: true,
    minMatchCharLength: 1,
  });

  //search term changed
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  //Filters the concerts based on the search term
  useEffect(() => {
    if (searchTerm) {
      //fuse.search finds concerts with similar names to searchTerm
      onFilterConcerts(fuse.search(searchTerm).map((result) => result.item));
    } else {
      onFilterConcerts(concerts);
    }
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default ConcertSearchBar;
