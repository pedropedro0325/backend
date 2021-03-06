module.exports= (app) => {

    const notes = require('../controllers/note.controller.js');

//create a new note
    app.post('/notes', notes.create);


//Retrieve all notes
app.get('/notes',notes.findAll);

//Retrieve a single Note with noteId
app.get('/notes/:noteId',notes.findOne);
//Update a Note  with noteId
app.put('/notes/:notesId',notes.update);
//Delete a Note with noteId
app.delete('/notes/:noteId',notes.delete);
}
//TODO