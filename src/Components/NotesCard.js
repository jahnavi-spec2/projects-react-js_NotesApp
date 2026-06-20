import { Pencil, Trash2, Heart } from 'lucide-react';

function NotesCard({ title, content, createdAt, onDelete, id, isFav, onFavClick, onEnableEdit }) {
  return (
    <div className={`card h-100 note-card ${isFav ? "note-card--fav" : ""}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <button
            className="note-card-icon-btn"
            onClick={() => onEnableEdit(id)}
            aria-label="Edit note"
          >
            <Pencil size={15} />
          </button>

          <button
            className={`fav-btn ${isFav ? "is-fav" : ""}`}
            onClick={() => onFavClick(id)}
            aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
          >
            <Heart size={19} fill={isFav ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="d-flex justify-content-between align-items-start mb-2" style={{ gap: "10px" }}>
          <h5 className="note-card-title">{title}</h5>
          <span className="note-card-date">{createdAt}</span>
        </div>

        <p className="note-card-content">{content}</p>

        <div className="d-flex justify-content-end mt-3">
          <button className="delete-btn" onClick={() => onDelete(id)}>
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotesCard;