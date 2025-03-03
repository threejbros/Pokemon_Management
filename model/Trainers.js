import mongoose from "mongoose";
// import mongooseSequence from "mongoose-sequence";

// const AutoIncrement = mongooseSequence(mongoose);

const TrainersSchema = new mongoose.Schema(
    {
        // _id: Number,
        name: {
            type: String,
            required: [true, "Trainer Name Required"],
            unique: true
        }
    }, 
    // {
    //     _id: false
    // }
);

// TrainersSchema.plugin(AutoIncrement, { inc_field: "_id"});

export default mongoose.model("Trainer", TrainersSchema);