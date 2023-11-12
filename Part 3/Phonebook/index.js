const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'))

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

app.get('/api/info', (request, response) => {
    const datetime = new Date().toLocaleString()
    response.send(`<h1>Phonebook has info for ${persons.length} persons</h1>
    <p>${datetime}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    console.log(id)
    console.log(person)
    if (person){
        response.json(person)
    }
    else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

const generateId = () => {
    const min = 5
    const max = 100000
    const id = Math.floor(Math.random() * (max - min + 1) + min)
    console.log(id)
    return id
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number){
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    const personExists = persons.some(p => p.name === newPerson.name)
    if (!personExists){
        persons = persons.concat(newPerson)
        response.json(newPerson)
        //console.log(persons)
    } else {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})