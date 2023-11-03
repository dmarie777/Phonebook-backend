const mongoose = require('mongoose');

const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB')
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
    },
    number: {
        type: String,
        minLength:8,
        validate: {
            validator: function(v) {
                return v.split('-').length ===2?  
                v.split('-').map((e,i) => (i === 0 && e.length >= 2 && e.length < 4  && typeof +e === 'number') || (i === 1 && typeof +e === 'number' )? true:false ).every(e=> e===true)
                : false
            },
            message: props => `${props.value} is not a valid phone number`
        },
        required: [true, 'User phone number required']
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject._v
    }
})

module.exports = mongoose.model('Person', personSchema)

