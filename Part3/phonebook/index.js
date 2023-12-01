const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const Person = require('./models/person')

const unknownEndpoint = (_request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

const morgan = require('morgan')
morgan.token('body', function (req, _res) { return (req.method==='POST') ? JSON.stringify(req.body) : null })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [] //deprecated, moved to mongoose
  
app.get('/info', (_request, response) => {

    Person.find({}).then(result => {

        const date = Date()
        const length = result.length

      response.send(
            `<p>Phonebook has info for ${length} people</p><p> ${date} </p>`
        )

    })

})

app.get('/api/persons', (_request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))

  })

  app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))

  })

  app.post('/api/persons', (request, response, next) => {
    const body = request.body


    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({ 
          error: 'Person already exists' 
        })
    }

    if (body.name === undefined) {
        return response.status(400).json({ 
          error: 'name is missing' 
        })
    }

    if (body.number === undefined) {
        return response.status(400).json({ 
          error: 'number is missing' 
        })
    }
    
    const person =new Person( {
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
  })

  app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    /*const person =new Person( {
      id: body.id,
      name: body.name,
      number: body.number,
    })*/

    Person.findByIdAndUpdate(
      request.params.id, 
      { name, number}, 
      { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
  })
  
  app.use(unknownEndpoint)

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }

  app.use(errorHandler)


const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })