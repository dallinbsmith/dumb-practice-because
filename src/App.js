import React, { useState, useCallback } from "react";
import axios from "axios";

const App = () => {
  const [counter, setCounter] = useState(0);
  const [people, setPeople] = useState([]);
  const [pageNum, setPageNum] = useState(0);

  const getData = useCallback(async (page) => {
    await axios
      .get(`https://randomuser.me/api/?page=${page}&results=10`)
      .then((res) => {
        const persons = res?.data?.results;
        console.log("persons", persons);
        setPeople(persons);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getNextPage = () => {
    getData(pageNum + 1);
    setPageNum(pageNum + 1);
  };

  return (
    <>
      <h1>Welcome to the party</h1>
      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Add</button>
      <button onClick={() => setCounter(counter - 1)}>Subtract</button>
      <button onClick={() => getData()}>get Data!</button>
      <button onClick={() => setPeople([])}>Erase it all</button>
      <button onClick={() => getNextPage()}>NextPage</button>
      {people.map((person, idx) => {
        return (
          <div key={`${person?.name?.last}_${idx}`}>
            <p>
              {person?.name?.last},{person?.name?.first}
            </p>
            <img src={person?.picture?.medium}></img>
          </div>
        );
      })}
    </>
  );
};

export default App;
