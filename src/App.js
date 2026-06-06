import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NoteForm from './Components/NoteForm';
import { useState } from 'react';
import NotesCard from './Components/NotesCard'
import { Plus } from 'lucide-react';
function App() {
  const [showForm,setShowForm]= useState(false); 
  const [notes,setNotes]= useState(JSON.parse(localStorage.getItem("notes")) || []);
  function addNotes(newNote){
setNotes([...notes,newNote]);
localStorage.setItem("notes",JSON.stringify([...notes,newNote]));
  }

function deleteNote(id){
  setNotes(notes.filter(note=> note.id!==id));

}


return ( 
 
   <>
   <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Notes App</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <div/>
       <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
      <div >
      <button type="button" className="btn btn-danger"  style={{borderRadius:"100px"}} onClick={() => setShowForm(true)}><Plus size={30} color="white"/></button>
    </div>
    </div>
  </div>
</nav>
<div className='container' style={{backgroundColor: "#08325c", minHeight: "100vh", display:"flex", justifyContent:"center", alignItems:"center"}}> 
   <div className='row' style={{backgroundColor: "#c7d8e9",width:"400px", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", textAlign: "center"}}>
   <h1  > Your Notes </h1>
   <p>..... What's Going On?....</p>
  


{showForm && <NoteForm addNotes={addNotes}  setShowForm={setShowForm} />}

 {notes.map((note) => (
          <NotesCard
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
          />
        ))}
   </div>
  </div>
   </>
  );
}

export default App;
