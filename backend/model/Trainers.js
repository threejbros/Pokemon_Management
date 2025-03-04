import mongoose from "mongoose";

const TrainersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Trainer Name Required"],
            unique: true
        }
    }
);

export default mongoose.model("Trainer", TrainersSchema);