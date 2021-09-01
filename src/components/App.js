import { useState, useEffect } from 'react';
import axios from 'axios';

const defaultState = {
  todo: {
    display: 'Todo',
    count: 0,
    percentage: 0,
    keys: [
      '60eeb18b9eb2b908e846d248',
      '60eeb190800ce3469f94eb3d',
      '6114e871130fd765a7d5fafe'
    ],
  },
  inProgress: {
    display: 'In progress',
    count: 0,
    percentage: 0,
  },
  done: {
    display: 'Done',
    count: 0,
    percentage: 0,
    keys: [
      '60f05359cad30c2c74be3b1b'
    ],
  },
  loaded: false,
}

function App() {
  const [state, setState] = useState(defaultState);

  const getData = async () => {
    try {
      const { data: { cardsData } } = await axios.get(`/.netlify/functions/data`);
      let state = { ...defaultState };

      cardsData.forEach((card) => {
        let status = 'inProgress';
        if (defaultState.todo.keys.includes(card.idList)) status = 'todo';
        if (defaultState.done.keys.includes(card.idList)) status = 'done';

        const count = state[status].count + 1
        state[status] = {
          ...state[status],
          count,
          percentage: `${(count / cardsData.length * 100).toFixed(2)}%`,
          total: `${count} / ${cardsData.length}`
        }
      });

      state.loaded = true;

      setState(state);
    }
    catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      { state.loaded && Object.entries(state).map(([key, value]) => (
        <div key={key} className={key} style={{ height: value.percentage }}>
          <h1>
            <b>{ value.display }</b> 
            <span>{ value.percentage } - { value.total }</span>
          </h1>
        </div>
      ))}
    </>
  );
}

export default App;
