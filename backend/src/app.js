import express from "express";
import cors from "cors";
// import notesRoutes from "./routes/notes.js";
import authRouter from "./routes/auth.routes.js";
import noteRouter from "./routes/note.routes.js";


const app=express();
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/notes", noteRouter);




app.use(express.json({limit:" 16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser())

app.use(cors({
    origin:process.env.CORS_ORIGIN?.split(",")|| "http://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"],
}))
// app.use("/api/notes", notesRoutes);

export default app;