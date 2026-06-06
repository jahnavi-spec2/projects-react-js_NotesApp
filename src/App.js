import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NoteForm from './Components/NoteForm';
import { useState } from 'react';
import NotesCard from './Components/NotesCard'
import { Plus } from 'lucide-react';
import {useEffect} from 'react';
function App() {
  const [showForm,setShowForm]= useState(false); 
  const [notes,setNotes]= useState(JSON.parse(localStorage.getItem("notes")) || []);


  useEffect(() => {
  localStorage.setItem("notes", JSON.stringify(notes));
}, [notes]); 


  function addNotes(newNote){
setNotes([...notes,newNote]);

  }

function deleteNote(id){
  setNotes(notes.filter(note=> note.id!==id));

}


return ( 
 
   <>
<nav className="navbar navbar-light bg-light">
  <div className="container-fluid d-flex align-items-center">

    
    <a className="navbar-brand fw-bold" href="#">
      Notes App
    </a>


    <button
      onClick={() => setShowForm(true)}
      className="btn btn-danger shadow"
      style={{
        borderRadius: "50%",
        width: "48px",
        height: "48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "10px"
      }}
    >
      <Plus size={22} color="white" />
    </button>

   
    <div className="ms-auto">
      <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search notes..."
        />
        <button className="btn btn-outline-success">
          Search
        </button>
      </form>
    </div>

  </div>
</nav>
<div className='container' style={{backgroundColor: "#08325c", minHeight: "100vh", display:"flex", justifyContent:"center", alignItems:"center"}}> 
   <div className='row' style={{backgroundColor: "#c7d8e9",width:"400px", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", textAlign: "center"}}>
   <h1  > Your Notes </h1>
   <p>..... What's Going On?....</p>
  


{showForm && <NoteForm addNotes={addNotes}  setShowForm={setShowForm} />}

 {notes.length==0? (
   <div className="text-center mt-4">
    <h5>No Notes Yet  <span> &#x1F4DD;</span></h5>
    <p className="text-muted">Click + to add your first note</p>
  </div>
 ):(  
 
 
 notes.map((note) => (
          <NotesCard
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
          />
        )))}
   </div>
  </div>
   </>
  );
}

export default App;
