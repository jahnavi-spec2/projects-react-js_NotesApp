
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
 
  const [searchTerm,setSearchTerm]=useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const[EditNote,setEditNote]= useState(null);

  function onSearchingBar(e){
    e.preventDefault();
    const query=searchTerm.toLowerCase();
const result= notes.filter((note)=>
note.title.toLowerCase().includes(query) ||
note.content.toLowerCase().includes(query)
);
setFilteredNotes(result);
  }
 
function toggleFavourite(id){
setNotes(
  notes.map(note=>
    note.id===id?{  
    ...note,
    favourite: !note.favourite
   }
  :note
     
  )
);

}


 function EditNotes(id){
const note=notes.find(note=> note.id===id);
setEditNote(note);
setShowForm(true);
}

  useEffect(() => {
 localStorage.setItem("notes", JSON.stringify(notes));
}, [notes]); 


  function addNotes(newNote){
setNotes([...notes,newNote]);

  }

function deleteNote(id){
  setNotes(notes.filter(note=> note.id!==id));

}
 const sortedNotes=[...notes].sort(
  (a,b)=> b.favourite - a.favourite
 );
const notesToShow =
  searchTerm.trim() === ""
    ? sortedNotes
    : filteredNotes;


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
          value={searchTerm}
          onChange={(e)=> setSearchTerm(e.target.value)}
        />
        <button className="btn btn-outline-success"
        onClick={onSearchingBar}>
          Search
        </button>
      </form>
    </div>

  </div>
</nav>
<div className='container-fluid px-5 py-4' style={{backgroundColor: "#08325c", minHeight: "100vh", display:"flex"}}> 
   <div className='w-100' style={{backgroundColor: "#c7d8e9", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", textAlign: "center"}}>
<div className="d-flex justify-content-between align-items-center mb-4">
  <div>
    <h2>Your Notes</h2>
    <p className="text-muted">
      {notes.length} notes saved
    </p>
  </div>
</div>


{showForm && 

<NoteForm 
addNotes={addNotes}  
setShowForm={setShowForm} 
EditNote={EditNote}
 setNotes={setNotes} 
 notes={notes} 
   setEditNote={setEditNote} />}

{(!notes || notes.length === 0) ? (
  <div className="text-center mt-4">
    <h5>
      No Notes Yet <span>&#x1F4DD;</span>
    </h5>
    <p className="text-muted">
      Click + to add your first note
    </p>
  </div>
) : (
  <div className="row g-4 mt-3">
    {notesToShow.map((note) => (
      <div
        className="col-lg-4 col-md-6 col-sm-12"
        key={note.id}
      >
        <NotesCard
          id={note.id}
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
          isFav={note.favourite}
          onFavClick={toggleFavourite}
          onEnableEdit={EditNotes}
          createdAt={note.createdAt}
        />
      </div>
    ))}
  </div>
)}
   </div>
</div>

</>
);
}




export default App;
