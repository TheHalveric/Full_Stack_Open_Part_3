const express = require('express')
const app = express()
const cors = require('cors')
var morgan = require('morgan')
morgan.token('data', function (req) {
    return JSON.stringify(req.body)})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(cors())

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

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req,res) => {
    let personCount = persons.length
    console.log(personCount)
    res.send(`<p>Phonebook has info for ${personCount} people.<p> 
        ${new Date()}`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
  
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, re) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
  
    re.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
  
    if (!body.name) {
      return res.status(400).json({ 
        error: 'Name missing' 
      })
    } else if (!body.number) {
        return res.status(400).json({
            error: 'Number missing'
        })
    }

    let names = persons.map(person => person.name)
    if (names.includes(body.name)) {
        return res.status(400).json({
            error: 'Name must be unique.'
        })
    }

    const person = {
      name: body.name,
      number: body.number,
      id: Math.floor(Math.random()* 1000)
    }
  
    persons = persons.concat(person)
  
    res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})