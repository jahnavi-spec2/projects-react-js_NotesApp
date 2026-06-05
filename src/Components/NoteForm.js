 import {useState} from 'react';
 
 function NoteForm({addNotes }) {

const [title,setTitle] =useState("");
const [content,setContent]=useState("");
  function saveNote(){
const newNote={
    id:Date.now(),
    title,
    content
};
addNotes(newNote);
setTitle("");
setContent("");
  }
    
    return (
        <div className="note-form" style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", width: "100%" }}>
            <h1> Your Notes </h1>
            <input 
              className="form-control mb-2"
           value={title}
           onChange={(e)=>
            setTitle(e.target.value)
           }
            placeholder="Enter title"
           
            />
            <textarea   
              className="form-control mb-2"  
            value={content}
            onChange={(e)=>
                setContent(e.target.value)
            }       
            placeholder="Enter content"/>
            
            <button className="btn btn-success" style={{ width: "100%" }} onClick={saveNote}>
                Save Note
            </button>
         
     
        </div>
    )
 }
export default NoteForm;
