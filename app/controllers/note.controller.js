const Note = require('../models/note.models.js');

//create and Save a new Note

exports.create =  (req, res) =>{
console.log('inside note module ==>>>>>')
    //Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        })
    }

    //create a note
    const note = new Note({
        tittle: req.body.tittle || "untitled note",
        content: req.body.content
    })

    //Save note inte the database
    note.save()
    .then (data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occured!'
        });
    });
    
};

// Retrieve and return all notes from the DB
exports.findAll = (req,res) =>{


};
//TODO
