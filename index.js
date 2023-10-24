const express = require('express')
const app = express()

app.use(express.json())
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

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) =>{
    const id = request.params.id;
    const person = persons.find(e => e.id === Number(id))
    if (person) {
        response.send(person);
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    persons = persons.filter(e => e.id !== Number(id))
    response.status(204).end()
})

function generateID() {
  const random = Math.floor(Math.random()*1000) 
  if (!persons.filter(e => e.id === random ).length) {
    return random
  } else {
    return generateID()
  }
}

app. post('/api/persons', (request, response) => {
  
  if(!request.body.name) {
    return response.status(400).json({
      error: "name is missing"
    })
  }
  if(!request.body.number) {
    return response.status(400).json({
      error: "number is missing"
    })
  }
  if(persons.filter(person => person.name === request.body.name).length) {
    return response.status(400).json({
      error: "name must be unique"
    })
  }
  const newPerson = {
    "id": generateID(),
    "name": request.body.name,
    "number": request.body.number
  }
  response.json(persons.concat(newPerson))
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})