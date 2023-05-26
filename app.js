const express = require('express');
const app = express();

const fetchData = require('./public/js/fetchData');

app.set('view engine', 'ejs'); // Set EJS as the view engine

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Define routes

app.get('/about', (req, res) => {
  res.send('About page');
});

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});


app.get('/', (req, res) => {
  fetchData
  .then((data) => {
    const media = data.data.Media;
    res.render('home', { media });
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
    res.render('error'); // Render an error page or handle the error case appropriately
  })
});
  
  

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
