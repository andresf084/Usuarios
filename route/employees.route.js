const express = require('express'),
router =  express.Router(),
useremployee = require('../controllers/employees.controllers')

router.post('/', useremployee.create)
router.get('/', useremployee.list)
router.delete('/:_id', useremployee.delete)
router.put('/', useremployee.update)
router.put('/active', useremployee.active)
router.post('/search', useremployee.search)

module.exports = router