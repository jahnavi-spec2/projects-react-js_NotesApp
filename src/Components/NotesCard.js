import { Pencil, Trash2, Heart } from 'lucide-react';

function NotesCard({ title, content, createdAt, onDelete, id, isFav, onFavClick, onEnableEdit }) {
  return (
    <div className={`dog-ear ${isFav ? "dog-ear-fav" : ""}
                  bg-paper rounded-2xl rounded-tr-md p-5 sm:p-6
                  shadow-[0_8px_24px_rgba(11,16,38,0.25)]
                  transition-all duration-300 animate-card-in
                  hover:-translate-y-1.5 hover:shadow-[0_14px_32px_rgba(11,16,38,0.32)]`}>
     
        <div className="flex justify-between items-center mb-3">
          <button
            className="note-card-icon-btn"
            onClick={() => onEnableEdit(id)}
            aria-label="Edit note"
             className="w-8 h-8 rounded-lg flex items-center justify-center
                bg-[#f4f1ea] text-textMuted hover:bg-[#e8e3d6] hover:text-textDark transition-colors"
          >
            <Pencil size={15} />
          </button>

          <button
             className={`flex items-center justify-center transition-transform active:scale-90
                      ${isFav ? "text-coral" : "text-[#c7cad6]"}`}
            onClick={() => onFavClick(id)}
            aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
          >
            <Heart size={19} fill={isFav ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="flex justify-between items-start gap-2.5 mb-2">
          <h5 className="font-display font-bold text-lg text-textDark text-left m-0">{title}</h5>
          <span className="font-mono text-[0.7rem] tracking-wide text-textMuted whitespace-nowrap">{createdAt}</span>
        </div>

        <p className="text-left text-[#3c4054] text-[0.94rem] leading-relaxed line-clamp-4">{content}</p>

        <div className="d-flex justify-content-end mt-4">
          <button  onClick={() => onDelete(id)}
           className="inline-flex items-center gap-1.5 border-[1.5px] border-[#f1b8b8] text-coral
                     rounded-lg px-3.5 py-1.5 text-[0.82rem] font-medium transition-colors
                     hover:bg-coral hover:border-coral hover:text-white" >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>
    
  );
}

export default NotesCard;