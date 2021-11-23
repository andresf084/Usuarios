const mongoose = require('mongoose')

var EmployeesSchema = new mongoose.Schema
    ({
        name: { type: String, lowercase: true },
        document: { type: Number, required: true, index: true },
        phone: { type: String },
        email: { type: String },
        salary: { type: Number },
        gender: { type: String },
        birthDate: { type: Date },
        status: { type: Boolean, default: true },
        created_at: { type: Date, default: Date.now() }
    })

module.exports = mongoose.model('usuarios_employees', EmployeesSchema)