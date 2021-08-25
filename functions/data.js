require('dotenv').config();
const axios = require('axios');

const { TRELLO_KEY, TRELLO_TOKEN } = process.env;

exports.handler = async function(event, context) {
  const { data: cardsData } = await axios(`https://api.trello.com/1/boards/60eeb18587fc8a2b42997f39/cards?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`);
  const { data: listsData } = await axios(`https://api.trello.com/1/boards/60eeb18587fc8a2b42997f39/lists?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`);

  return {
      statusCode: 200,
      body: JSON.stringify({
        cardsData,
        listsData,
      })
  };
}
