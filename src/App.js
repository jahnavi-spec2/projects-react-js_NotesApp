import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NoteForm from './components/NoteForm';
import { useState } from 'react';

function App() {
  const [showForm,setShowForm]= useState(false); 
  function addNotes(){
    setShowForm(true);

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
    </div>
  </div>
</nav>
<div className='container' style={{backgroundColor: "#08325c", minHeight: "100vh", display:"flex", justifyContent:"center", alignItems:"center"}}> 
   <div className='row' style={{backgroundColor: "#c7d8e9",width:"400px", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", textAlign: "center"}}>
   <h1  > Your Notes </h1>
   <p>..... What's Going On?....</p>
  <div className="d-flex justify-content-center mt-3">
  <button className="btn btn-primary" style={{ width: "150px" }} onClick={addNotes}>
    <span className="me-4"style={{fontSize: "1.5rem", textAlign:"center", fontFamily:"Arial, sans-serif",fontWeight:"bold"}}>+</span>
    Add Notes
  </button>
</div>

{showForm && <NoteForm />}
   </div>
  </div>
   </>
  );
}

export default App;
