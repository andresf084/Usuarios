const ctrlEmployees = {},
Employees = require('../models/employees')

ctrlEmployees.create = async (req, res) => {
    const newEmployee = new Employees({
        name: req.body.name,
        document: req.body.document,
        phone: req.body.phone,
        email: req.body.email,
        salary: req.body.salary,
        gender: req.body.gender,
        birthDate: req.body.birthDate,
        status: req.body.status,
    });

    await newEmployee.save();
    res.json({ msg: "employee created successfully", status: true });
}

ctrlEmployees.list = async (req, res) => {
    const employees = await Employees.find({});
    res.json(employees);
};

ctrlEmployees.update = async (req, res) => {
    const { _id, name, document, phone, email, salary, gender, birthDate, status,} = req.body;
    const filter = {_id: _id}
    const update = {name: name, document: document, phone: phone, email: email, salary: salary, gender: gender, birthDate: birthDate}
    console.log()
    await Employees.findOneAndUpdate(filter, update);
    res.json({ status: true });
};

ctrlEmployees.delete = async (req, res) => {
    const { _id } = req.params;
    await Employees.deleteOne({ _id: _id });
    res.json({ status: true });
};

ctrlEmployees.search = async (req, res ) => {
    console.log(req.body)
    const employees = await Employees.find( { name : { $regex: ".*" + req.body.name + ".*" } })
    res.json(employees)
}

ctrlEmployees.active = async (req, res) => {
    const { _id, status } = req.body;
    const filterActive = {_id: _id};
    const updateActive = {status: status}
    await Employees.findOneAndUpdate(filterActive, updateActive);
    res.json({ status: true });
};

module.exports = ctrlEmployees