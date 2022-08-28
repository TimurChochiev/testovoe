import { useEffect, useState } from "react";
import Tickets from "./components/Tickets";
import Filters from "./components/Filters";

import tickets from "./assets/flights.json";

import "./App.scss";

const ticketsPerPage = 2;

function App() {
  const [allTickets] = [tickets.result.flights];
  const [filtredAndSortedTickets, setFiltredAndSortedTickets] =
    useState(allTickets);

  const [ticketsToShow, setTicketsToShow] = useState([]);
  const [next, setNext] = useState(1);

  useEffect(() => {
    setNext(1);
  }, [filtredAndSortedTickets]);

  useEffect(() => {
    setTicketsToShow(filtredAndSortedTickets.slice(0, next * ticketsPerPage));
  }, [next]);

  const handleShowMorePosts = () => {
    setNext(next + 1);
  };

  return (
    <div className="App">
      <div className="menu">
        <Filters
          filtredAndSortedTickets={filtredAndSortedTickets}
          setFiltredAndSortedTickets={setFiltredAndSortedTickets}
          allTickets={allTickets}
        />
      </div>
      {ticketsToShow.length ? (
        <Tickets
          ticketsToRender={ticketsToShow}
          onClickMore={handleShowMorePosts}
        />
      ) : (
        <p>Загрузка</p>
      )}
      <div></div>
    </div>
  );
}

export default App;
