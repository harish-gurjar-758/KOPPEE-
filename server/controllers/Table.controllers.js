import Table from '../models/Table.models.js';

export const addTable = async (req, res) => {
  try {
    const { tableNumber, seats, isAvailable } = req.body;

    if (!tableNumber || !seats) {
      return res.status(400).json({ message: 'Table number and seats are required.' });
    }

    const existingTable = await Table.findOne({ tableNumber });
    if (existingTable) {
      return res.status(409).json({ message: 'Table with this number already exists.' });
    }

    const newTable = new Table({
      tableNumber,
      seats,
      isAvailable: isAvailable ?? true
    });

    await newTable.save();

    res.status(201).json({ message: 'Table added successfully', table: newTable });
  } catch (error) {
    console.error('Error adding table:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
