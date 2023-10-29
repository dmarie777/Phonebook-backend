const mongoose = require('mongoose');
const password = process.argv[2];
const url = 
`mongodb+srv://phonebook:${password}@cluster0.8swjkhm.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1)
} else if (process.argv.length === 3) {
    mongoose.connect(url)
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
} else {
    mongoose.connect(url)
    const person = new Person ({
        name: process.argv[3],
        number: process.argv[4],
    })
    person.save().then(result => {
        console.log('person saved!');
        mongoose.connection.close()
    })
}


