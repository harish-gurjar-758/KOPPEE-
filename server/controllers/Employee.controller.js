import Employee from "../models/Employee.modules.js";

//  Add new Employee in System
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

        const newEmployee = new Employee({
            employeeName,
            employeeId,
            employeePost,
            employeePhoto,
            employeePhone,
            employeeEmail,
            password,
            shopBranchId,
            blockedUntil
        });
        await newEmployee.save();
        res.staus(201).json({ message: "Succefully add new Employee!", employee: newEmployee });
    } catch (error) {
        res.status(500).json({ message: "Error in Add new Employee", error: error.message });
    }
}

// Login a Employe in AdminNlock
export const loginEmployee = async (req, res) => {
    // Inside loginEmployee controller
    // if (employee.blockedUntil && new Date() < new Date(employee.blockedUntil)) {
    //     return res.status(403).json({ message: "Employee is temporarily blocked" });
    // }
}

// Router for delete a Employee
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

// Router for Block an employee for a specified number of days
export const blockEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { days } = req.body; // e.g., { "days": 3 }

        const blockUntil = new Date();
        blockUntil.setDate(blockUntil.getDate() + days);

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
