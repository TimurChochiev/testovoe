import React from "react";
import watch from "../assets/watch.png";

import tikets from "../assets/flights.json";

function getTimeFromMins(mins) {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  return hours + "ч " + minutes + "мин";
}

const Tickets = ({ ticketsToRender, onClickMore }) => {
  return (
    <div className="wrapper">
      <div className="itemsBox">
        {ticketsToRender.map((el, index) => (
          <div key={index} className="items">
            <div className="header">
              <div className="logo">
                <p>{el.flight.carrier.uid}</p>
              </div>
              <div className="itemPrice">
                <div>
                  {el.flight.price.total.amount}{" "}
                  {el.flight.price.total.currency}
                </div>
                <div>Стоимость для одного взрослого пассажира</div>
              </div>
            </div>
            <div className="direction">
              {el.flight.legs[0].segments[0].departureCity.caption},{" "}
              {el.flight.legs[0].segments[0].departureAirport.caption}{" "}
              <span>
                ({el.flight.legs[0].segments[0].departureAirport.uid})
              </span>
              <span>&rarr;</span>
              {el.flight.legs[0].segments.length > 1
                ? el.flight.legs[0].segments[1].arrivalCity
                  ? el.flight.legs[0].segments[1].arrivalCity.caption
                  : "Не найден город прибытия"
                : el.flight.legs[0].segments[0].arrivalCity.caption}
              ,
              {el.flight.legs[0].segments.length > 1
                ? el.flight.legs[0].segments[1].arrivalAirport.caption
                : el.flight.legs[0].segments[0].arrivalAirport.caption}
              <span>
                (
                {el.flight.legs[0].segments.length > 1
                  ? el.flight.legs[0].segments[1].arrivalAirport
                    ? el.flight.legs[0].segments[1].arrivalAirport.uid
                    : "Не найден идентификатор города"
                  : el.flight.legs[0].segments[0].arrivalAirport.uid}
                )
              </span>
            </div>
            <div className="times">
              <div className="start">
                {new Date(
                  el.flight.legs[0].segments[0].departureDate
                ).toLocaleString()}
              </div>
              <div className="flight">
                <img className="watch" src={watch} alt="watch" />
                <div>{getTimeFromMins(el.flight.legs[0].duration)}</div>
              </div>
              <div className="end">
                {el.flight.legs[0].segments.length === 2
                  ? new Date(
                      el.flight.legs[0].segments[1].arrivalDate
                    ).toLocaleString()
                  : new Date(
                      el.flight.legs[0].segments[0].arrivalDate
                    ).toLocaleString()}
              </div>
            </div>
            <div className="title">
              {" "}
              {el.flight.legs[0].segments.length === 2 ? "1 пересадка" : ""}
            </div>
            <div className="itemEnd">
              Рейс выполняет: {el.flight.carrier.caption}
            </div>
            <div className="line"></div>
            <div className="direction">
              {el.flight.legs[1].segments[0].departureCity
                ? el.flight.legs[1].segments[0].departureCity.caption
                : "Город отправления не найден"}
              ,{el.flight.legs[1].segments[0].departureAirport.caption}
              <span>
                (
                {el.flight.legs[1].segments[0].departureCity
                  ? el.flight.legs[1].segments[0].departureCity.uid
                  : "не найден идентификатор города"}
                )
              </span>
              <span>&rarr;</span>
              {el.flight.legs[1].segments.length === 2
                ? el.flight.legs[1].segments[1].arrivalCity.caption
                : el.flight.legs[1].segments[0].arrivalCity.caption}
              ,
              {el.flight.legs[1].segments.length === 2
                ? el.flight.legs[1].segments[1].arrivalAirport.caption
                : el.flight.legs[1].segments[0].arrivalAirport.caption}
              <span>
                (
                {el.flight.legs[1].segments.length === 2
                  ? el.flight.legs[1].segments[1].arrivalAirport.uid
                  : el.flight.legs[1].segments[0].arrivalAirport.uid}
                )
              </span>
            </div>
            <div className="times">
              <div className="start">
                {new Date(
                  el.flight.legs[1].segments[0].departureDate
                ).toLocaleString()}
              </div>
              <div className="flight">
                <img className="watch" src={watch} alt="watch" />
                <div>{getTimeFromMins(el.flight.legs[1].duration)}</div>
              </div>
              <div className="end">
                {el.flight.legs[1].segments.length === 2
                  ? new Date(
                      el.flight.legs[1].segments[1].arrivalDate
                    ).toLocaleString()
                  : new Date(
                      el.flight.legs[1].segments[0].arrivalDate
                    ).toLocaleString()}
              </div>
            </div>
            <div className="title">
              {el.flight.legs[1].segments.length === 2 ? "1 пересадка" : ""}
            </div>
            <div className="itemEnd">
              Рейс выполняет: {el.flight.carrier.caption}
            </div>

            <button>Выбрать</button>
          </div>
        ))}
      </div>
      <button className="buttonMore" onClick={onClickMore}>
        Загрузить больше
      </button>
    </div>
  );
};

export default Tickets;
