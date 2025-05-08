import Reservation from "../models/Reservation.js";
import Table from "../models/Table.models.js";
import { sendEmail, sendSMS } from "../utils/notify.utils.js";

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
            message,
        } = req.body;

        // Find available table
        const availableTable = await Table.findOne({ isAvailable: true, seats: { $gte: person } });
        let status = "waiting";
        let tablenumber = null;

        if (availableTable) {
            availableTable.isAvailable = false;
            await availableTable.save();
            status = "confirmed";
            tablenumber = availableTable.tablenumber;
        }

        const newReservation = new Reservation({
            name,
            email,
            phone,
            person,
            date,
            time,
            message,
            status,
            tablenumber
        });
        await newReservation.save();

        // Notify user
        await sendEmail(email, `Reservation ${status}`, `Your table is ${status}. Table: ${tablenumber || 'TBD'}`);
        await sendSMS(phone, `Your reservation is ${status}.${tableNumber ? ` Table: ${tableNumber}` : ''}`);
        res.status(201).json({ message: "Reservation succefully", reservation: newReservation });
    } catch (error) {
        res.status(500).json({ message: "Error in Reservation", error: error.message });
    }
};

// Get all Reservation table
export const getAllReservations = async (req, res) => {
    try {
        const reservation = await Reservation.find();
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Error fetching All Reservations Tables", error: error.message });
    }
}

// Update an Reservation Table by ID
export const editReservations = async (req, res) => {
    try {
        const id = req.params;

        const editReservations = await Reservation.findByIdAndUpdate(id);
        if (!editReservations) {
            return res.status(404).json({ message: "Reserved Table not found" });
        }
        res.status(200).json({ message: "Reserve Table Updated Succefully!", reservationTable: editReservations });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Reservation Table", error: error.message });
    }
}

// Delete an Reservation Table by ID
export const deleteReservations = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteReservations = await Reservation.findByIdAndDelete(id);

        if (!deleteReservations) {
            return res.status(404).json({ message: "Reserved Table not found" });
        }

        // Free the table
        if (deleteReservations.tableNumber) {
            await Table.updateOne(
                { tableNumber: deleteReservations.tableNumber },
                { isAvailable: true }
            );
        }

        res.status(200).json({
            message: "Reserve Table Deleted successfully!",
            reservationTable: deleteReservations
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting Reservation Table",
            error: error.message
        });
    }
};
