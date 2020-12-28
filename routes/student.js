var express = require('express');
var router = express.Router();
var student = require('../controller/student');

router.post('/signup', student.signup);
router.put('/update', student.update);
router.post('/updatePassword', student.updatePassword);
router.post('/updateName', student.updateName);
router.post('/login', student.login);
router.post('/deleteStudent', student.deleteStudent);
router.post('/deactivateStudent', student.deactivateStudent);
router.post('/getStudent', student.getStudent);
router.post('/findEmailMatch', student.findEmailMatch);
router.post('/findMatch', student.findMatch);

module.exports = router;