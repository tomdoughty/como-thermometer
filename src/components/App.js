import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);

  const getData = async () => {
    try {
      const { data: { listsData, cardsData } } = await axios.get(`/.netlify/functions/data`);

      const lists = listsData
        .filter((category) => category.name !== 'REFERENCE')
        .map((category) => ({
          ...category,
          count: cardsData.filter((card) => card.idList === category.id).length,
          checked: false,
          name: category.name.replaceAll('_', '')
        }));

      setCards(cardsData);
      setLists(lists);
    }
    catch(error) {
      console.log(error);
    }
	};

  useEffect(() => {
		getData();
	}, []);

  const handleCheck = (event) => {
    const newLists = lists.map((listItem) => {
      if (event.target.name === listItem.id) {
        return {
          ...listItem,
          checked: event.target.checked
        }
      }
      return listItem;
    })

    setLists(newLists);
  }

  const getCheckedPercentage = () => {
    const checkedCategories = lists.filter((category) => Boolean(category.checked))
    const checkedCount = checkedCategories.reduce((a, b) => a + b.count, 0);
    return Math.round((checkedCount / cards.length) * 100);
  }

  const checkedPercentage = `${getCheckedPercentage()}%`;

  return (
    <>
      <header className="nhsuk-header nhsuk-header--transactional" role="banner">
        <div className="nhsuk-width-container nhsuk-header__container">
          <div className="nhsuk-header__logo nhsuk-header__logo--only">
            <a className="nhsuk-header__link" href="/" aria-label="NHS homepage">
            <svg className="nhsuk-logo" role="presentation" focusable="false" viewBox="0 0 40 16">
              <path className="nhsuk-logo__background" d="M0 0h40v16H0z"></path>
              <path className="nhsuk-logo__text" d="M3.9 1.5h4.4l2.6 9h.1l1.8-9h3.3l-2.8 13H9l-2.7-9h-.1l-1.8 9H1.1M17.3 1.5h3.6l-1 4.9h4L25 1.5h3.5l-2.7 13h-3.5l1.1-5.6h-4.1l-1.2 5.6h-3.4M37.7 4.4c-.7-.3-1.6-.6-2.9-.6-1.4 0-2.5.2-2.5 1.3 0 1.8 5.1 1.2 5.1 5.1 0 3.6-3.3 4.5-6.4 4.5-1.3 0-2.9-.3-4-.7l.8-2.7c.7.4 2.1.7 3.2.7s2.8-.2 2.8-1.5c0-2.1-5.1-1.3-5.1-5 0-3.4 2.9-4.4 5.8-4.4 1.6 0 3.1.2 4 .6"></path>
            </svg>
            </a>
          </div>
          <div className="nhsuk-header__transactional-service-name">
            <a className="nhsuk-header__transactional-service-name--link" href="/">CoMo thermometer</a>
          </div>
        </div>
      </header>
      <div className="nhsuk-width-container">
        <main id="main-content" className="nhsuk-main-wrapper">
          <div className="nhsuk-grid-row">
            <div className="nhsuk-grid-column-one-half">
              <div className="nhsuk-form-group">
                <fieldset className="nhsuk-fieldset" aria-describedby="example-hint">
                  <legend className="nhsuk-fieldset__legend nhsuk-fieldset__legend--l">
                    <h1 className="nhsuk-fieldset__heading">
                      What would you like to view progress on?
                    </h1>
                  </legend>
                  <div className="nhsuk-hint" id="example-hint">
                    Select all options that are relevant to you.
                  </div>
                  <div className="nhsuk-checkboxes">
                    { lists.map((category) => (
                      <div className="nhsuk-checkboxes__item" key={ category.id }>
                        <input className="nhsuk-checkboxes__input" id={ category.id } name={ category.id } type="checkbox" value={ category.id } onChange={ handleCheck } checked={ category.checked } />
                        <label className="nhsuk-label nhsuk-checkboxes__label" htmlFor={ category.id }>
                          { category.name } ({ category.count })
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>
            <div className="nhsuk-grid-column-one-half">
              <div className="progress-container">
                <div className="progress" style={{ height: checkedPercentage }}></div>
                <span className="total-text">{ cards.length }</span>
                <span className="progress-text" style={{ bottom: checkedPercentage }}>{ checkedPercentage }</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
