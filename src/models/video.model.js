import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema=new Schema({
    videFile:{
        type:String, //cloudinary url
        required:true
    },
    thumbnail:{
        type:String, //cloudinary url
        required:true
    },
    title:{
        type:String, 
        required:true
    },
    tescription:{
        type:String, 
        required:true
    },
    duration:{
        type:Number,  //cloudinary url
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

},{
    timestamps:true
})

videoSchema.plugin(mongooseAggregatePaginate) //aggregation pipeline

//mongodb allows us to store media files dirrctly but it will put lot of 
//load on server hence we use third part app 

export const Video=mongoose.model("Video",videoSchema)