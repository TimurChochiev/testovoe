import React, { useEffect, useState } from "react";

const sortProp = [
  { value: "asc", name: "По возрастанию цены" },
  { value: "desc", name: "По убыванию цены" },
  { value: "time", name: "По времени в пути" },
];

const filterBox = [
  { name: "1 пересадка", value: "transfer" },
  { name: "Без пересадок", value: "straight" },
];

const companiesArray = [
  { name: "LOT Polish Airlines", value: "polish" },
  { name: "Аэрофлот - российские авиалинии", value: "russia" },
  { name: "Air France", value: "france" },
  { name: "KLM", value: "KL" },
];

const Filters = ({ allTickets, setFiltredAndSortedTickets }) => {
  const [filter, setFilter] = useState({
    orderBy: "",
    transfersCheckbox: [],
    costFrom: 0,
    costTo: 200000,
    companiesCheckbox: [],
  });

  const handleChange = (event) => {
    const target = event.target;
    if (target.name.includes("Checkbox")) {
      let updatedList = [...filter[target.name]];
      if (target.checked) {
        updatedList = [...filter[target.name], target.value];
      } else {
        updatedList.splice(filter[target.name].indexOf(target.value), 1);
      }
      setFilter({ ...filter, [target.name]: updatedList });
    } else {
      setFilter({ ...filter, [target.name]: target.value });
    }
    if (target.name === "costFrom" || target.name === "costTo") {
      setFilter({ ...filter, [target.name]: Number(target.value) });
    }
  };
  useEffect(() => {
    setFiltredAndSortedTickets(
      allTickets
        .filter((ticket) => {
          if (
            ticket?.flight?.price?.total?.amount > +filter.costFrom &&
            ticket?.flight?.price?.total?.amount < +filter.costTo
          )
            return true;
          return false;
        })
        .filter((ticket) => {
          if (filter.companiesCheckbox.length === 0) {
            return true;
          } else if (
            filter.companiesCheckbox.includes(ticket.flight.carrier.caption)
          ) {
            return true;
          }
          return false;
        })
        .filter((ticket) => {
          if (filter.transfersCheckbox.length === 0) return true;

          if (filter.transfersCheckbox.includes("straight")) {
            if (
              ticket.flight.legs[0].segments.length === 1 &&
              ticket.flight.legs[1].segments.length === 1
            ) {
              return true;
            }
          }
          if (filter.transfersCheckbox.includes("transfer")) {
            if (ticket.flight.legs[0].segments.length === 2) {
              return true;
            }
          }

          return false;
        })
        .sort((a, b) => {
          switch (filter.orderBy) {
            case "asc":
              return a.flight.price.total.amount - b.flight.price.total.amount;
            case "desc":
              return b.flight.price.total.amount - a.flight.price.total.amount;
            case "time":
              return Number(
                String(
                  a.flight.legs[0].duration - b.flight.legs[0].duration
                ).padEnd(4, "0") +
                  String(a.flight.legs[1].duration - b.flight.legs[1].duration)
                    .padEnd(4, "0")
                    .replace("-", "")
              );
            default:
              return true;
          }
        })
    );
  }, [
    filter.costFrom,
    filter.costTo,
    filter.companiesCheckbox.length,
    filter.orderBy,
    filter.transfersCheckbox.length,
  ]);

  return (
    <div className="filters">
      <form className="sort">
        <p>
          <b>Сортировать</b>
        </p>
        <div>
          {sortProp.map((el, index) => (
            <p key={index}>
              <input
                onChange={handleChange}
                name="orderBy"
                type="radio"
                value={el.value}
                checked={filter.orderBy === el.value}
              />
              {el.name}
            </p>
          ))}
        </div>
      </form>
      <form className="filter">
        <p>
          <b>Фильтровать</b>
        </p>
        <div>
          {filterBox.map((el, index) => (
            <p key={index}>
              <input
                onChange={handleChange}
                name="transfersCheckbox"
                type="checkbox"
                value={el.value}
              />
              {el.name}
            </p>
          ))}
        </div>
      </form>
      <form className="price">
        <p>
          <b>Цена</b>
        </p>
        <p>
          От
          <input
            type="number"
            name="costFrom"
            onChange={handleChange}
            value={filter.costFrom}
          />
        </p>
        <p>
          До{" "}
          <input
            type="number"
            name="costTo"
            onChange={handleChange}
            value={filter.costTo}
          />
        </p>
      </form>
      <form className="company">
        <p>
          <b>Авиокомпания</b>
        </p>
        <div>
          {companiesArray.map((el, index) => (
            <p key={index}>
              <input
                onChange={handleChange}
                name="companiesCheckbox"
                type="checkbox"
                value={el.name}
              />
              {el.name}
            </p>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Filters;
