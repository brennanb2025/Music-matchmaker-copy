import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Dispatcher from "./components/Dispatcher";
import Banner from "./components/Banner";
import { Link } from "react-router-dom";
import { useDbData } from "./utilities/firebase";
import { useState, useEffect } from "react";

const App = () => {

  const [concertData, error] = useDbData('/Concerts');
  //const [concerts, setConcerts] = useState([]);

  console.log(error);

  if (error) return <h1>error</h1>;
  if (concertData === undefined) return <h1>Loading data</h1>;
  if (!concertData) return <h1>No data</h1>;
  

  /*useEffect(() => {
    if (concertData) {
      setConcerts(concertData);
      console.log(concertData);
    }
  }, [concertData]);*/

  return (
    <BrowserRouter>
      <div className="App">
        <Banner />
        <Dispatcher concerts={concertData}/>
      </div>
    </BrowserRouter>
  );
};

export default App;

