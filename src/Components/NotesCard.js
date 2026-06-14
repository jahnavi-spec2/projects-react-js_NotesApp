import {FaHeart, FaRegHeart} from "react-icons/fa";

function NotesCard({title,content,createdAt,onDelete,id,isFav,onFavClick,onEnableEdit}) {

   
    return (
        <div className="card h-100 note-card" style={{
            
            width: "100%", margin: "15px",  border: "none",
            borderRadius: "16px",
         boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
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
    <img 
    src="/edit.png"
    alt="Edit"
    onClick= {()=>onEnableEdit(id)}
    style={{
        width:"18px", 
        height:"18px"
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
              <div
  className="d-flex justify-content-between align-items-center mb-2"
>
  <h5
    className="card-title"
    style={{
      textAlign: "left",
      fontWeight: "700",
      marginBottom: "0"
    }}
  >
    {title}
  </h5>

  <small className="text-muted">
    {createdAt}
  </small>
</div>
               <p
  className="card-text"
  style={{
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 4,
    WebkitBoxOrient: "vertical"
  }}
>
  {content}
</p>
               <div className="d-flex justify-content-end mt-3">
                <button className="btn btn-outline-danger btn-sm"  onClick={()=> onDelete(id)}>
                    Delete 
                </button>
                 </div> 
            </div>
        </div>
    )
}
export default NotesCard;
