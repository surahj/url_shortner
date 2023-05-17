const express =  require('express');
const cors =  require('cors');
const dotenv = require('dotenv');
const urlRouter = require('./routes/urlRouter');
const urlController = require('./controllers/urlController');


// const config = require('./database');


// const db = knex(config);
dotenv.config({ path: './config.env' });

const app = express();
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get('/', async (req, res) => {
  const urls = urlController.getUrls;

  res.render('index', {urls : urls});
})


app.use('/', urlRouter);

// Server Setup
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});