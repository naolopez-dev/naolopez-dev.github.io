import express from 'express';
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    res.render('home');
});

app.get('/search', async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const response = await fetch(`https://openlibrary.org/search.json?q=${(keyword)}`);
        const data = await response.json();
        const works = data.docs.filter(doc => doc.key.startsWith("/works/"));
        res.render('search', { works, keyword });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching books.");
    }
});

app.get('/random', async (req, res) => {
    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=science`);
        const data = await response.json();
        const works = data.docs.filter(doc => doc.key.startsWith("/works/"));
        const randomBook = works[Math.floor(Math.random() * works.length)];
        res.render('random', { book: randomBook });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching random book.");
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});