const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const uri = "mongodb+srv://pallavkhatri9991:pallav99@cluster0.r1iv7ks.mongodb.net/ecom?retryWrites=true&w=majority";
const db = mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected!'))
  .catch(() => console.log('Opps NotConnected!'));

module.exports = db

