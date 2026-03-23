import express, { response } from 'express';
const planets = (await import('npm-solarsystem')).default;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

// routes
// root route
app.get('/', async (req, res) => {
   let url = "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=solar%20system";
   try {
      const response = await fetch(url);
      if (!response.ok) {
         throw new Error("Error accessing API endpoint")
      }
      const data = await response.json();
      let randNum = Math.floor(Math.random() * data.hits.length);
      let imgUrl = data.hits[randNum].webformatURL;
      res.render('home.ejs', { imgUrl })
   } catch (err) {

   } //catch
});

// app.get('/mercury', (req, res) => {
//     let mercuryInfo = planets.getMercury();
//     console.log(mercuryInfo);
//     res.render('mercury.ejs', {mercuryInfo})
// });

app.get('/planetInfo', (req, res) => {
   let planet = req.query.planet;
   let planetInfo = planets[`get${planet}`]();
   res.render('planet.ejs', { planetInfo, planet })
});

app.get('/cometsInfo', (req, res) => {
   let cometsInfo = planets.getComets();
   res.render('comets.ejs', { cometsInfo, comet: "Comets" });
});

app.get('/asteroidsInfo', (req, res) => {
   let asteroidsInfo = planets.getAsteroids();
   res.render('asteroids.ejs', { asteroidsInfo, asteroid: "Asteroids" });
});

app.get('/nasapod', async (req, res) => {
   const today = new Date();
   const year = today.getFullYear();
   const month = today.getMonth() + 1;
   const day = today.getDate()-1;
   let url = "https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=" + year+"-"+month+"-"+day;
   try {
      const response = await fetch(url);
      if (!response.ok) {
         throw new Error("Error accessing API endpoint")
      }
      const data = await response.json();
      let imgUrl = data.hdurl;
      res.render('nasapod.ejs', { imgUrl })
   } catch (err) {

   } //catch
});

app.listen(3000, () => {
   console.log('server started');
});
