import Reservation from "../models/Reservation.js";

// Create Test Project
export const createReservation = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            person,
            date,
            time,
            message
        } = req.body

        const newReservation = new Reservation({
            name,
            email,
            phone,
            person,
            date,
            time,
            message,
        });
        await newReservation.save();
        res.status(201).json({ message: "Reservation succefully", reservation: newReservation });
    } catch (error) {
        res.status(500).json({ message: "Error in Reservation", error: error.message });
    }
};

// Get all Reservation table
export const getAllReservations = async(req, res)=>{
    try {
        const reservation = await Reservation.find();
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({message:"Error fetching All Reservations Tables", error:error.message});
    }
}

// Delete an Reservation Table by ID
export const deleteReservations = async(req, res)=>{
    try {
        const {id} = req.params;

        const deleteReservations = await Reservation.findByIdAndDelete(id);
        if(!deleteReservations){
            return res.status(404).json({message:"Reserved Table not found"});
        }
        res.status(200).json({message:"Reserve Table Deleted succefully!", reservationTable:deleteReservations});
    } catch (error) {
        res.status(500).json({message:"Error deleting Reservation Table", error:error.message})
    }
}