require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('dist'))
morgan.token('req', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req'))

app.get('/api/persons', (request, response) => {
    Person.find({}).then ( person => {
      response.json(person)
    })
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (request, response, next) =>{
    Person.findById(request.params.id) .then (person => {
      if (person) {
        response.send(person);
      }
      else {
        response.status(404).end()
      }
    })
    .catch( err=> next(err))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
})




app. post('/api/persons', (request, response) => {
  console.log(request.body)
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
  // if(persons.filter(person => person.name === request.body.name).length) {
  //   return response.status(400).json({
  //     error: "name must be unique"
  //   })
  // }
  const newPerson = new Person({
    "name": request.body.name,
    "number": request.body.number
  })
  newPerson.save().then( savedPerson => {
    response.json(savedPerson)

  })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  }
}
app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})