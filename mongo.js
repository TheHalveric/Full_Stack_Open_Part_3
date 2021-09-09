const mongoose = require('mongoose')

// eslint-disable-next-line no-undef
const password = process.argv[2]
// eslint-disable-next-line no-undef
const inputName = process.argv[3]
// eslint-disable-next-line no-undef
const inputNumber = process.argv[4]
const url = `mongodb+srv://jbaquirindev:${password}@cluster0.m9nfa.mongodb.net/phonebookDB?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)
const person = new Person({
  name: inputName,
  number: inputNumber,
})

// eslint-disable-next-line no-undef
if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  // eslint-disable-next-line no-undef
  process.exit(1)
}

if ((inputName !== undefined) && (inputNumber !== undefined)) {
  person.save().then(result => {
    console.log(`Added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
      mongoose.connection.close()
    })
  })
}

