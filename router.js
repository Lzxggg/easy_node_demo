


var express = require('express')

var Students = require('./students')

var fs = require('fs')

var router = express.Router()

router.get('/',function (req, res) {

   Students.show(function (err , students ) {
       if (err) {
           return res.status(500).send('Server error.')
       }
       res.render('index.html',{students:students})
   })



})

router.post('/students/new',function (req, res) {

    Students.add(req.body , function (err , callback) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/')
    })

})
router.get('/students/new',function (req, res) {

    res.render('new.html')

})

router.get('/students/edit',function (req, res) {
    
    Students.editShow(parseInt(req.query.id),function (err , student) {
        if (err){
            return res.status(500).send('Server error.')
        }
        res.render('edit.html',{student: student})
    })


})

router.post('/students/edit',function (req, res) {

    Students.edit(req.body,function (err , callback) {
        if (err){
            return res.status(500).send('Server error.')
        }

    })
    res.redirect('/')

})
router.get('/students/delete',function (req, res) {

    Students.delete(parseInt(req.query.id),function (err , callback) {
        if (err){
            return res.status(500).send('Server error.')
        }

    })
    res.redirect('/')

})

module.exports = router
