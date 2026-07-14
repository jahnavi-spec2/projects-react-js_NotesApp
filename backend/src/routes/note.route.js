import {Router } from "express";
import {createNote,getNote,getNoteById,updateNote,deleteNote,toggleFavourite, searchNote} from "../controllers/note.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js";


const router= Router();
router.use(verifyJWT);

router.route("/").post(createNote).get(getNote);

router.route("/search").get(searchNote);

router.route("/:noteId").get(getNoteById).put(updateNote).delete(deleteNote)

router.post("/fav/:noteId",toggleFavourite)
export default router;