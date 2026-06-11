import {FaHeart, FaRegHeart} from "react-icons/fa";

function NotesCard({title,content,onDelete,id,isFav,onFavClick}) {

   
    return (
        <div className="card mb-3" style={{
            
             width: "100%", margin: "15px",  border: "none",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
    transition: "0.3s ease"}}>
            <div className="card-body " style={{padding: "20px"}}>

      <div
         style={{
         display: "flex",
         justifyContent: "space-between",
          alignItems: "center",
         marginBottom: "10px"
  }}
>
  <button
    style={{
         background: "#f8f9fa",
    border: "none",
    borderRadius: "8px",
    padding: "6px",
    cursor: "pointer"
    }}
 
  >
    <img src="/edit.png"
    alt="Edit"
    style={{
        width:"18px", height:"18px"
    }}/>

  </button>

  <button
    onClick={() => onFavClick(id)}
    style={{
      background: "transparent",
      border: "none",
      cursor: "pointer",
        fontSize: "20px"
    }}
  >
    {isFav ? (
      <FaHeart style={{ color: "red" }} />
    ) : (
      <FaRegHeart />
    )}
  </button>
</div>
                <h5 className="card-title" style={{textAlign:"left",  fontWeight: "700",
    marginBottom: "10px"}}>{title}</h5>
                <p className="card-text" style={{textAlign: "left",
    color: "#555",
    lineHeight: "1.6"}}>{content}</p>
               <div justify>
                <button className="btn btn-outline-danger btn-sm"  onClick={()=> onDelete(id)}>
                    Delete 
                </button>
                 </div> 
            </div>
        </div>
    )
}
export default NotesCard;
