 import {useState,useEffect,useRef} from 'react';
 import { toast } from "react-toastify";
 import { X } from 'lucide-react';

 const CONTENT_LIMIT = 500;

 function NoteForm({addNotes ,setNotes, EditNote, notes, onClose}) {

const [title,setTitle] =useState(EditNote?.title ||"");
const [content,setContent]=useState(EditNote?.content ||"");
const titleRef = useRef(null);

  // Focus the title field as soon as the modal opens
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

   // Let Escape close the modal, same as clicking the backdrop or the X
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function saveNote(){
    if (!title.trim() || !content.trim()) {
  toast.error("Please fill all fields");
  return;


}
const newNote={
    id:Date.now(),
    title,
    content,
    favourite:false,
createdAt: new Date().toLocaleDateString("en-IN",{
  day:"numeric",
  month:"short",
  year:"numeric"
})};
// addNotes(newNote);
if(EditNote){  
setNotes(
  notes.map(note=>
    note.id===EditNote.id
    ?{
      ...note,
      title,
      content
    }
    :note
  )

);
toast.success("Note updated successfully!");
}
else{
  addNotes(newNote);
    toast.success("Note saved!");
}
onClose();
// setTitle("");
// setContent("");
// setShowForm(false);
// setEditNote(null);
  }


  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }
 
  const counterColor =
    content.length >= CONTENT_LIMIT
      ? "text-red-500"
      : content.length > CONTENT_LIMIT * 0.9
      ? "text-yellow-500"
      : "text-gray-400 dark:text-gray-500";

    return (
        <div onClick={handleBackdropClick}
        className="fixed inset-0 z-[1000] flex items-center justify-center p-5
                 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div
        role="dialog"
        aria-modal="true"
        aria-label={EditNote ? "Edit note" : "New note"}
        className="w-full max-w-[460px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 text-left animate-modal-pop"
      >
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-display font-bold text-xl text-gray-900 dark:text-white m-0">
            {EditNote ? "Edit Note" : "New Note"}
          </h4>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full flex items-center justify-center
                       bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400
                        hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>


            <input 
            ref={titleRef}
           value={title}
           onChange={(e)=>
            setTitle(e.target.value)
           }
            placeholder="Title"
           maxLength={60}
           className="w-full mb-3 border-[1.5px]  border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-[10px] px-3.5 py-2.5  text-sm font-body focus:outline-none 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500  transition-colors"
            />


            <textarea   
                 
                 value={content}
                   maxLength={CONTENT_LIMIT}
                 onChange={(e)=>
                setContent(e.target.value)
                
            }       
            placeholder="Enter content"
               className="w-full min-h-[120px] resize-y mb-1 border-[1.5px] border-gray-300 dark:border-gray-600
                     px-3.5 py-2.5 text-sm font-body bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500  transition-colors"
        />
        <small className={`block text-right font-mono text-xs mb-3.5 ${counterColor}`}>
          {content.length}/{CONTENT_LIMIT}
        </small>
            
   <div className="flex gap-2.5">
    <button
            onClick={onClose}
            className="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-medium
                       rounded-md px-4.5 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            Cancel
          </button> 


            <button 
             onClick={saveNote} 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold
                       rounded-md py-2.5 transition-colors">
               {EditNote ? "Update Note" : "Save Note"}
            </button>
      
      </div>
      </div>
            </div>
     
    )
 }
export default NoteForm;