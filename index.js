const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;


let walletes = [
{
    name:"alizaib",
    haswallet:true
}
]





// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.get('/api/check-wallet', (req, res) => {
    const { userid } = req.query;
    const user = walletes.find(u => u.name === userid);
    if (user && user.haswallet) {
        res.json({ hasWallet: true });
    }
    else {
        res.json({ hasWallet: false });
    }   
});

app.get('/tonconnect-manifest', (req, res) => {
    res.sendFile(path.join(__dirname, 'tonconnect-manifest.json'));
});


app.get("/connect-wallet", (req, res) => {
    res.render('connect-wallet');
});
    

app.get('/', (req, res) => {

    let userId = req.query.userid || 'guest';
    console.log(`User ID: ${userId}`);

    res.render('index', { userId });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
