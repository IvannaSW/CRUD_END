const express = require('express');
const bodyParser= require('body-parser')
const pug = require('pug');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var db;



app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(bodyParser.json());

// form page 
app.get('/form', function(req, res) {
  res.render('pages/form');
});

MongoClient.connect('mongodb://IvannaSW:ivano4ka1234@ds127928.mlab.com:27928/first_mongodb', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.use(bodyParser.urlencoded({extended: true}))

//READ
app.get('/', (req, res) => {
  db.collection('data').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('studentlist(1)', {data: result})
  })
})

//CREATE
app.post('/data', (req, res) => {
  db.collection('data').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})


//UPDATE
app.put('/data', (req, res) => {
  db.collection('data')
  .findOneAndUpdate({"_id" : ObjectID(req.body._id)}, {
    $set: {
      id: req.body.id,
      name: req.body.name,
      surname: req.body.surname,
      age:req.body.age
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });
});

//DELETE

app.delete('/data', (req, res) => {
  db.collection('data').findOneAndDelete({"_id" : ObjectID(req.body._id)},
  (err, result) => {
    if (err) return res.send(500, err);
    res.send(result);
  });
})



