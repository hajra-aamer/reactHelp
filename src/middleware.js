//const express = require('express');
//const request = require('request');
//
//const app = express();
//
//app.use((req, res, next) => {
//  res.header('Access-Control-Allow-Origin', '*');
//  next();
//});
//
//app.get('/jokes/random', (req, res) => {
//  request(
//    { url: 'https://joke-api-strict-cors.appspot.com/jokes/random' },
//    (error, response, body) => {
//      if (error || response.statusCode !== 200) {
//        return res.status(500).json({ type: 'error', message: err.message });
//      }
//
//      res.json(JSON.parse(body));
//    }
//  )
//});
//
//const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => console.log(`listening on ${PORT}`));
//
//
//
////const express = require('express')
////const app = express()
////const port = 4000
////
////app.get('/whoami', (req, res) => {
////    res.send('Who is anybody?')
////})
////
////app.use(cors({
////    origin: 'http://127.0.0.1:3000',
////}))