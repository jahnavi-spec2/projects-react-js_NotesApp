const noteSchema= new Schema({
    title:{
        type:String,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    ownedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
      isFavorite: {
      type: Boolean,
      default: false,
    },
},
{
    timestamps:true
});
export const Note=mongoose.model("Note",noteSchema)