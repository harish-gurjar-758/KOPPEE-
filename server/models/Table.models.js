import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
    tableNumber: { type: Number, required: true, unique: true },
    seats: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true }
});

const Table = mongoose.model("Table", tableSchema);
export default Table;