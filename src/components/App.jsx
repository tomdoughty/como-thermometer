import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { defaultState, excludedColumns } from '../constants';
import { getStatus } from '../utils';

function App() {
  const [state, setState] = useState(defaultState);
  const [loaded, setLoaded] = useState(false);

  const getData = async () => {
    try {
      // Fetch Trello data using Netlify function
      const { data: { cardsData } } = await axios.get('/.netlify/functions/data');

      // Filter out cards from REFERENCE column
      const cards = cardsData.filter(({ idList }) => !excludedColumns.includes(idList));
      const newState = { ...defaultState };

      // Loop over cards and apply card to newState
      cards.forEach((card) => {
        const status = getStatus(card.idList);
        newState[status].count += 1;
      });

      // Compute percentages and totals for statuses
      Object.keys(newState).forEach((key) => {
        newState[key].percentage = (newState[key].count / cards.length) * 100;
        newState[key].total = `${newState[key].count} / ${cards.length}`;
      });

      // Set state
      setState(newState);
      setLoaded(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      { loaded && Object.entries(state).map(([key, value]) => (
        <div key={key} className={key} style={{ height: `${value.percentage}%` }}>
          <h1>
            <b>{ value.display }</b>
            <span>
              { Math.round(value.percentage) }
              % -
              {' '}
              { value.total }
            </span>
          </h1>
        </div>
      ))}
    </>
  );
}

export default App;
