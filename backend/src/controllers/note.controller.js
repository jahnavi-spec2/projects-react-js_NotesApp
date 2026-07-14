import { Apierror } from "../utils/Apierror.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Note} from "../models/note.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const createNote=asyncHandler(async(req,res)=>{
    const {title,description}=req.body;
   
    
    
    if(!title || !description){
        throw new Apierror(400,"Field is required")
    }
const note=await Note.create({
title,
description,
ownedBy: req.user._id
})

return  res.status(201).json(new ApiResponse(201,note,"Notes added successfully"))
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
    const {title,description,isFavorite}= req.body
const {noteId}= req.params
  const note= await Note.findOne({
      _id:noteId,
       ownedBy: req.user._id,
    });
if(!note) throw new Apierror(404,"Note not found")
 if (title !== undefined) note.title = title;
    if (description !== undefined) note.description = description;
    if (isFavorite !== undefined) note.isFavorite = isFavorite;

    await note.save();

 return res
        .status(200)
        .json(new ApiResponse(200, note, "Note updated successfully"));


})
const getNote=asyncHandler(async(req,res)=>{


const notes= await Note.find({ownedBy: req.user._id}).sort({createdAt: -1});


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
const searchNote=asyncHandler(async(req,res)=>{
    const { query } = req.query;
 const searchQuery = query?.trim();

if (!searchQuery) {
    throw new Apierror(400, " Search query is required");
}

const notes= await Note.find({
 ownedBy: req.user._id,
         $or: [
            { title: { $regex: searchQuery, $options: "i" } },
            { description: { $regex: searchQuery, $options: "i" } }
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
    createNote, getNote, getNoteById, updateNote, deleteNote, toggleFavourite,  searchNote,
};