

function NotesCard({title,content,onDelete,id}) {

   
    return (
        <div className="card mb-3" style={{ width: "100%", margin: "20px" }}>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{content}</p>
               <div justify>
                <button className="btn btn-danger" style={{ width: "100%" }} onClick={()=> onDelete(id)}>
                    Delete Note
                </button>
                 </div> 
            </div>
        </div>
    )
}
export default NotesCard;
