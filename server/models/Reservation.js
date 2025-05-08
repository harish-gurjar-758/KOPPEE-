import mongoose from "mongoose";
const reservationSchema = new mongoose.Schema({
    name: {
        type: String,
        requested: true,
    },
    email: {
        type: String,
        requested: true,
    },
    phone: {
        type: Number,
        requested: true,
    },
    person: {
        type: Number,
        requested: true,
    },
    date: {
        type: Date,
        requested: true,
    },
    time: {
        type: String,
        requested: true,
    },
    message: {
        type: String,
    },
    tableNumber: {
        type: Number,
        default: null,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'waiting'],
        default: 'pending'
    }
});

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;