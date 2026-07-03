import { Pencil, Trash2, Heart } from 'lucide-react';

function NotesCard({ title, content, createdAt, onDelete, id, isFav, onFavClick, onEnableEdit }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-6
                 border border-gray-200 dark:border-gray-700
                 shadow-sm hover:shadow-lg hover:-translate-y-1
                 transition-all duration-200">

      <div className="flex justify-between items-center mb-3">
        <button
          onClick={() => onEnableEdit(id)}
          aria-label="Edit note"
          className="w-8 h-8 rounded-lg flex items-center justify-center
                     bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400
                     hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-blue-400
                     transition-colors"
        >
          <Pencil size={15} />
        </button>

        <button
          className={`flex items-center justify-center transition-transform active:scale-90
                      ${isFav ? "text-red-500" : "text-gray-300 dark:text-gray-600"}`}
          onClick={() => onFavClick(id)}
          aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
        >
          <Heart size={19} fill={isFav ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex justify-between items-start gap-2.5 mb-2">
        <h5 className="font-display font-bold text-lg text-gray-900 dark:text-white text-left m-0">
          {title}
        </h5>
        <span className="font-mono text-[0.7rem] tracking-wide text-gray-400 dark:text-gray-500 whitespace-nowrap">
          {createdAt}
        </span>
      </div>

      <p className="text-left text-gray-600 dark:text-gray-300 text-[0.94rem] leading-relaxed line-clamp-4">
        {content}
      </p>

      <div className="flex justify-end mt-4">
        <button
          onClick={() => onDelete(id)}
          className="inline-flex items-center gap-1.5 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-medium
                     rounded-lg px-3.5 py-1.5 hover:bg-red-500 hover:border-red-500 hover:text-white transition-colors"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
}

export default NotesCard;