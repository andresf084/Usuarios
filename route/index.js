const { Router } = require("express"),
router = Router();

router.use("/employees", require("../route/employees.route"));

module.exports = router;