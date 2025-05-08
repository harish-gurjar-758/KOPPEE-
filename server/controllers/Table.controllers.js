import Table from "../models/Table.models.js";


export const createTable = async (req, res) => {
    try {
        const {
            tableNumber,
            status,
            isAvailable,
        } = req.body;

        const newTable = new Table({
            tableNumber,
            status,
            isAvailable,
        });

        await newTable.save();
        res.status(201).json({ message: 'Create a Table succefully', table: newTable });
    } catch (error) {
        res.status(500).json({ message: "Error in Creating a Table", error: error.message });
    }
};