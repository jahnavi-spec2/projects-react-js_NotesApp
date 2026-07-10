import { Apierror } from "../utils/Apierror.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Note} from "../models/note.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const createNote=asyncHandler(async(req,res)=>{
    const {title,description}=req.body;
    const {user_id}= req.params;
    
    
    if(!title || !description){
        throw new Apierror(400,"Field is required")
    }
const note=await Note.create({
title,
description,
ownedBy: req.user._id
})

 res.status(201).json(new ApiResponse(201,note,"Notes added successfully"))
})

const deleteNote=asyncHandler(async(req,res)=>{
    const {noteId}=req.params

        const note= await Note.findOne({
            _id:noteId,
       ownedBy: req.user._id
    })
if(!note) throw new Apierror(404,"Note not found")
await Note.findByIdAndDelete(note._id)


return res.status(200).json(new ApiResponse(200, {},"Note deleted successfully"))
})

const updateNote=asyncHandler(async(req,res)=>{
    const {newTitle,newDesc,isFavorite}= req.body
const {noteId}= req.params
  const note= await Note.findOne({
      _id:noteId,
       ownedBy: req.user._id,
    });
if(!note) throw new Apierror(400,"Note not found")
const updatedNote=await Note.findByIdAndUpdate(note._id,
    {
        title:newTitle
    },
    {description: newDesc},
   { isFavorite:Boolean(isFavorite)},
    {new:true}
)
 return res
        .status(200)
        .json(new ApiResponse(200, updatedNote, "Note updated successfully"));


})
const getNote=asyncHandler(async(req,res)=>{


const notes= await Note.findOne({ownedBy: req.user._id}).sort({createdAt: -1});
if(!notes)  {
    throw new Apierror(404,"Notes not found")
}

return res
  .status(200)
  .json(new ApiResponse(200, notes," Notes fetched successfully"));
})
const getNoteById=asyncHandler(async(req,res)=>{
const {noteId}= req.params;

const note= await Note.findOne({
    _id: noteId,
    ownedBy: req.user._id,
});

if(!note)
     throw new Apierror(404,"Note not found");

    return res
        .status(200)
        .json(new ApiResponse(200, note, "Note fetched successfully"));
});


// search the logged in user notes by either title or description...
const SearchNote=asyncHandler(async(req,res)=>{
  const {query}= req.query;
if(!query || !query.trim()){
    throw new Apierror(400, " Search query is required");
}

const notes= await Note.find({
 ownedBy: req.user._id,
         $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } }
        ]
})
 return res
        .status(200)
        .json(new ApiResponse(200, notes, "Notes fetched successfully"));
  
})

const toggleFavourite = asyncHandler(async (req, res) => {
    const { noteId } = req.params;
 
    const note = await Note.findOne({
        _id: noteId,
        ownedBy: req.user._id,
    });
 
    if (!note) throw new Apierror(404, "Note not found");
 
    note.isFavorite = !note.isFavorite;
    await note.save();
 
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                note,
                note.isFavorite ? "Note marked as favourite" : "Note removed from favourites"
            )
        );
});

export {
    createNote, getNote, getNoteById, updateNote, deleteNote, toggleFavourite,  SearchNote,
};