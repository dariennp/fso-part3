require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Entry = require('./models/entry')

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    
    return response.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
}

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.static('build'))

morgan.token('person', function (request,response) {return JSON.stringify(request.body)} )
app.use(morgan(':method :url :status :res[content-length] :response-time ms :person'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    let time= new Date()
    Entry.countDocuments().then(count =>{
      response.send(`<p> Phonebook has info for ${count} people </p> <p> ${time}</p>`)
    })
    
})

app.get('/api/persons', (request, response) => {
    Entry.find({}).then(persons => {
      response.json(persons)
    })
})

app.get('/api/persons/:id', (request,response, next) => {
    Entry.findById(request.params.id).then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id',(request,response,next)=> {
  Entry.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})


// const generateId =() =>{
//     return Math.floor(Math.random() * 100+ Math.random() * 1000);
// }

const nameExists = (name) =>{
    const entry = persons.find(person => person.name === name)
    if (entry){
        console.log("true")
        return true
    }
    else {
        console.log("false")
        return false
    }
}

app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (body.name === undefined || !body.number === undefined ) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
    else {
        const exists= nameExists(body.name)
        if (exists){
            return response.status(400).json({
                error: "Name already exists"
            })
        }
    } 
  
    const person = Entry({
      name: body.name,
      number: body.number,
    })
  
    person.save().then(savedEntry => {
      response.json(savedEntry)
    })
})

app.put('/api/persons/:id', (request,response, next ) => {
  const body = request.body

  const entry = {
    name: body.name,
    number: body.number,
  }

  Entry.findByIdAndUpdate(request.params.id, entry, { new: true })
    .then(updatedEntry => {
      response.json(updatedEntry)
    })
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})