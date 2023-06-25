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

function phoneNumValidate(num){
    return (/\d{3}-/.test(num) || /\d{2}-/.test(num))
} 

const entrySchema = new mongoose.Schema({
    name: {
        type:String,
        minLength: 3,
    },
    number: {
        type:String,
        minLength:8,
        validate:phoneNumValidate
    }
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


