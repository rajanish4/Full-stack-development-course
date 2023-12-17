const mongoose = require('mongoose')

if (process.argv.length<3){
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const nameInput = process.argv[3]
const numberInput = process.argv[4]

const url = `mongodb+srv://rajanish4:${password}@cluster0.aplgh4q.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('person', personSchema)

if (nameInput && numberInput) {
  const person = new Person({
    name: nameInput,
    number: numberInput,
  })
  person.save().then(result => {
    console.log(`added ${nameInput} number ${numberInput} to phonebook`)
    mongoose.connection.close()
  })
}
else {
  Person.find({}).then(result => {
    result.forEach(element => {
      console.log(element)
    })
    mongoose.connection.close()
  })
}