const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
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
    response.send(`<p> Phonebook has info for ${persons.length} people </p> <p> ${time}</p>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request,response) => {
    const id =Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
})

app.delete('/api/persons/:id',(request,response)=> {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()

})

const generateId =() =>{
    return Math.floor(Math.random() * 100+ Math.random() * 1000);
}

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
  
    if (!body.name || !body.number ) {
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
  
    const person = {
      id: generateId(),
      name: body.name,
      number: body.number,
      
    }
  
    persons = persons.concat(person)
  
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})