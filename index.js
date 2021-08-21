const express = require('express')
const path = require('path')
const moment = require('moment')
const { HOST } = require('./src/constants')
const db = require('./src/database')

const PORT = process.env.PORT || 5000

const app = express()
  .set('port', PORT)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

// Static public files
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.send('Dank Dogz braaaaaaah!');
})

app.get('/api/token/:token_id', function(req, res) {
  const tokenId = parseInt(req.params.token_id).toString()
  const dogz = db[tokenId]
  const data = {
    'name': dogz.name,
    'description': dogz.description,
    'image': dogz.image,
    'attributes': {
      'Background': dogz.background,
      'Body': dogz.body,
      'Tongue': dogz.tongue,
      'Eyes': dogz.eyes,
      'Ear Piercing': dogz.earpiercing,
      'Glasses': dogz.glasses,
      'Facial Feature': dogz.facialfeature,
      'Clothes': dogz.clothes,
      'Headgear': dogz.headgear,
    }
  }
  res.send(data)
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
})