import mongoose from "mongoose";
const reservationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    person: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
    tableNumber: {
        type: Number,
        default: null,
        required: false,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'waiting'],
        default: 'pending'
    }
});

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;