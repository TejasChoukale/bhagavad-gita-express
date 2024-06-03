import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Function to get a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Endpoint to render the home page
app.get('/', async (req, res) => {
  try {
    // Randomly select a chapter and slok number
    const chapter = getRandomInt(1, 18); // Bhagavad Gita has 18 chapters
    const slok = getRandomInt(1, 20);    // Assuming each chapter has at least 20 sloks

    console.log(`Fetching chapter ${chapter}, slok ${slok}`);
    const response = await axios.get(`https://bhagavadgitaapi.in/slok/${chapter}/${slok}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    console.log('API response:', response.data);
    const randomQuote = response.data;
    res.render('index', { secret: randomQuote.slok, user: 'my dear Arjun' }); // Change 'Guest' to 'my dear Arjun'
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
