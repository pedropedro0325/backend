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
   Note.find()
   .then(notes =>{res.send(notes);
}).catch(err =>{
    res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
    });
});

};
//Find a single note with a noteId
exports.findOne=(req, res)=>{
    Notes.findById(req.params.noteId)
    .then(note =>{
        if(!note){
            return res.status(404).send({
                message:"Note not found with id"+req.params.noteId
            });

        }
        res.send(note);
    }).catch(err =>{
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message:"Note not found with id" +req.params.noteId
            });
        }
        return res.status(500).send({
            message:"Error retrieving note with id " +req.params.noteId
        });
    });
    
};
// Update a note identified by the noteId in in the request
 exports.update=(req,res)=>{
     //Validate Request
     if(!req.body.content){
         return res.status(400).send({
             message:"Note content can  not  be empty"
         })
     }
     //Find note and update it  with th request body
     Note.findByIdAndUpdate(req.params.noteId,{
         title:req.body.title || "Untitled Note",
         content:req.body.content
     },{new:true})
     .then(note => {
         if (!note){
             return res.status(404).send({
                 message:"Note not found with id " + req.params.noteId
             });
         }
         res.send(note);
     }).catch(err =>{
         if(err.kind==='ObjectId'){
             return res.status(404).send({
                 message:"Note not found   with id " + req.params.noteId
             });
         }
         return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
     
 };
 // Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};
//TODO
