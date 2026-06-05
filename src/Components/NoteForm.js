 function NoteForm({ }) {
    return (
        <div className="note-form" style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", width: "100%" }}>
            <h1> Your Notes </h1>
            <input
            type="text"
            placeholder="Enter title"
            className="form-control mb-3" 
            />
            <textarea            
            placeholder="Enter content"
            className="form-control mb-3"
            rows="4"/>
            <button className="btn btn-success" style={{ width: "100%" }}>
                Save Note
            </button>
     
        </div>
    )
 }
