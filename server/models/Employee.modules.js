import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const employeeSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    unique: true,
  },
  employeePost: {
    type: String,
    required: true,
  },
  employeePhoto: {
    type: String,
    default: null,
  },
  employeePhone: {
    type: Number,
    required: true,
  },
  employeeEmail: {
    type: String,
    required: true,
  },
  password: {
    type: String, 
    required: true,
  },
  shopBranchId: {
    type: String,
  },
  blockedUntil: {
    type: Date,
    default: null,
  },
});

// Pre-save hook to generate employeeId if not present
employeeSchema.pre("save", function (next) {
  if (!this.employeeId) {
    this.employeeId = "EMP-" + uuidv4();
  }
  next();
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
