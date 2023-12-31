const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.h59eklu.mongodb.net/noteApp?retryWrites=true&w=majority&appName=AtlasApp`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: {
      type: String,
      minLength: 5,
      required: true
    },
    important: Boolean
  })
  
  const Note = mongoose.model('Note', noteSchema)

  const note = new Note({
    content: 'Mongoose makes things easy',
    date: new Date(),
    important: true,
  })

  Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })

  /*
  const note = new Note({
    content: 'HTML is Easy',
    important: true,
  })
  
  note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })
  */
 