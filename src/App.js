
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import NoteForm from './Components/NoteForm';
import { useState } from 'react';
import NotesCard from './Components/NotesCard'
import { Plus, Search,BookOpen } from 'lucide-react';
import {useEffect} from 'react';


import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
  const [showForm,setShowForm]= useState(false); 
  const [notes,setNotes]= useState(JSON.parse(localStorage.getItem("notes")) || []);
 
  const [searchTerm,setSearchTerm]=useState("");

  const[EditNote,setEditNote]= useState(null);

  
 
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

function openAddForm(){
  setEditNote(null);
  setShowForm(true);
}

function closeForm(){
  setShowForm(false);
  setEditNote(null);
}

  useEffect(() => {
 localStorage.setItem("notes", JSON.stringify(notes));
}, [notes]); 


  function addNotes(newNote){
setNotes([...notes,newNote]);

  }

function deleteNote(id){
  const confirmDelete = window.confirm(
    "Are you sure to delete this note?"
  );

  if(confirmDelete){
    setNotes(notes.filter(note => note.id !== id));
    toast.success("Note deleted");
  }
}
 const sortedNotes=[...notes].sort(
  (a,b)=> b.favourite - a.favourite
 );
const notesToShow =
sortedNotes.filter(note=>
  note.title.toLowerCase().includes(searchTerm.toLowerCase())  ||  note.content.toLowerCase().includes(searchTerm.toLowerCase())
);


return ( 
 
   <>

    
<nav className="sticky top-0 z-50 bg-ink950/85 backdrop-blur-md border-b border-white/10 py-3.5">
  <div className="px-4 sm:px-6 flex item-center flex-wrap gap-3">

    
    <a href="#" onClick={(e)=> e.preventDefault()}
     className="flex items-center gap-2.5 font-display font-bold text-xl text-paper" >
           <BookOpen size={22} className="text-gold" />
      Notes App
    </a>


    <button
      onClick={openAddForm}
      aria-label="Add new note"
      className="shrink-0 w-[46px] h-[46px] rounded-full 
      flex items-center justify-center 
      bg-gradient-to-br from-gold to-goldDark
      shadow-[0_4px_14px_rgba(217,167,47,0.4)]
      transition-transform hover:-translate-y-0.5 hover:scale-105 active:scale-95"
      
    >
      <Plus size={22} color="white" />
    </button>

   
    <div className="relative flex items-center ml-auto flex-1 min-w-[240px] max-w-[360px] order-3 sm:order-none">
       <Search size={16} className="absolute left-3.5 text-white/50 pointer-events-none"/>
        <input
        
          type="search"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e)=> setSearchTerm(e.target.value)}
           aria-label="Search notes"
              className="w-full bg-white/10 border border-white/10 text-paper placeholder-white/40 rounded-full py-2.5 pl-10 pr-4 text-sm font-body focus:outline-none focus:border-gold focus:bg-white/15 "
        />
             
    </div>

  </div>
</nav>
<div className= "min-h-[calc(100vh-75px)] bg-app-gradient px-4 sm:px-6 py-10 sm:py-14"> 
   <div className="max-w-[1180px] mx-auto">
<div className="flex justify-between items-end flex-wrap gap-3 mb-8">
  <div>
    <h2 className="font-display font-bold text-2xl sm:text-3xl text-paper text-left mb-1"> Your Notes</h2>
    <p className="font-mono text-xs tracking-widest uppercase text-paper/55">
      {notes.length} {notes.length === 1 ? "note" : "notes"} saved
    </p>
  </div>
</div>


{showForm && 
( 
<NoteForm 
addNotes={addNotes}  
// setShowForm={setShowForm} 
EditNote={EditNote}
 setNotes={setNotes} 
 notes={notes} 
 onClose={closeForm} />)}

{(!notes || notes.length === 0) ? (
  <div className="ext-center py-20 px-5 text-paper/85">
    <h5  className="font-display text-2xl font-semibold mb-2">
      No Notes Yet <span>&#x1F4DD;</span>
    </h5>
    <p className="text-paper/55">
      Click + to add your first note
    </p>
  </div>
):
 notesToShow.length === 0 ? (
            <div className="text-center py-20 px-5 text-paper/85">
              <h5 className="font-display text-2xl font-semibold mb-2">No matches found</h5>
              <p className="text-paper/55">Try a different search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">

 
    {notesToShow.map((note) => (
      
        <NotesCard
         key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
          isFav={note.favourite}
          onFavClick={toggleFavourite}
          onEnableEdit={EditNotes}
          createdAt={note.createdAt}
        />
    
    ))}
  </div>
)}
   </div>
</div>


<ToastContainer position="bottom-right" theme="colored"/>
</>
);
}




export default App;
