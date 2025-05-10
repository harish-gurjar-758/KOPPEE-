import Employee from "../models/Employee.modules.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret'; // fallback for dev
// ✅ Add new Employee with secure password handling
export const addEmployee = async (req, res) => {
    try {
        const {
            employeeName,
            employeeId,
            employeePost,
            employeePhoto,
            employeePhone,
            employeeEmail,
            password,
            shopBranchId,
            blockedUntil
        } = req.body;

        // Basic validation (optional but recommended)
        if (!employeeEmail || !password || !employeeName) {
            return res.status(400).json({ message: "Required fields are missing" });
        }

        // Check if email is already registered
        const existingEmployee = await Employee.findOne({ employeeEmail });
        if (existingEmployee) {
            return res.status(409).json({ message: "Employee with this email already exists" });
        }

        // ✅ Securely hash the password using bcrypt
        const saltRounds = 12; // More secure than 10 (slightly slower)
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newEmployee = new Employee({
            employeeName,
            employeeId,
            employeePost,
            employeePhoto,
            employeePhone,
            employeeEmail,
            password: hashedPassword,
            shopBranchId,
            blockedUntil
        });

        await newEmployee.save();

        // Never return the password in any response
        const { password: _, ...employeeData } = newEmployee._doc;

        res.status(201).json({
            message: "Successfully added new Employee!",
            employee: employeeData
        });
    } catch (error) {
        res.status(500).json({
            message: "Error adding new employee",
            error: error.message
        });
    }
};

// ✅ Login an Employee
export const loginEmployee = async (req, res) => {
    const { employeeEmail, password } = req.body;

    try {
        const employee = await Employee.findOne({ employeeEmail });

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        if (employee.blockedUntil && new Date() < new Date(employee.blockedUntil)) {
            return res.status(403).json({ message: "Employee is temporarily blocked" });
        }

        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: employee._id, employeePost: employee.employeePost },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            employee: {
                id: employee._id,
                name: employee.employeeName,
                email: employee.employeeEmail,
                post: employee.employeePost,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ✅ Delete an Employee
export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Employee.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ✅ Block an Employee for specified days
export const blockEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { days } = req.body;

        if (!days || isNaN(days)) {
            return res.status(400).json({ message: "Invalid number of days" });
        }

        const blockUntil = new Date();
        blockUntil.setDate(blockUntil.getDate() + parseInt(days));

        const updated = await Employee.findByIdAndUpdate(
            id,
            { blockedUntil: blockUntil },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({
            message: `Employee blocked until ${blockUntil.toISOString()}`,
            blockedUntil: updated.blockedUntil
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
