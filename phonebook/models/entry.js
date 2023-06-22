require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
    

const entrySchema = new mongoose.Schema({
    name: String, 
    number: String
})

const Entry = mongoose.model('Entry', entrySchema)

// if (process.argv.length === 3) {
//     console.log("Phonebook: ")
//     Entry.find({}).then(result => {
//         result.forEach(entry => {
//             console.log(`${entry.name} : ${entry.number}`)
//         })
//             mongoose.connection.close()
//           })
//         console.log("hello")
// }

entrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Entry',entrySchema)


