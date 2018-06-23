const router = require('express').Router();
const Student = require('../db/models/student');


router.get('/', async (req, res, next) => {
  try {
    let allStudents = await Student.findAll()
    // res.send(allStudents)
    res.status(200).send(allStudents)
  } catch (err) {
    next(err);
    //this passes it to our error handling middleware in app.js
    //the error middleware is (err, req, res, next)
  }

})

router.get('/:id', async (req, res, next) => {
  try {
    let specificStudent = await Student.findById(req.params.id)
    if (!specificStudent) {
      res.sendStatus(404)
    }
    res.send(specificStudent)
  } catch (err) {
    next(err)
  }
})//get specific student

router.post('/', async (req, res, next) => {
  try {
    let newStudent = await Student.create(req.body)
    res.status(201)
    res.send(newStudent);
  } catch(err) {
    next(err)
  }
  //express will automatically
}) //create new student


router.put('/:id', async (req, res, next) => {
  const needsUpdate = await Student.findById(req.params.id)
  await needsUpdate.update(req.body)
  //you don't need to use the update syntax
  res.send(needsUpdate)
})//update specified student

router.delete('/:id', async (req, res, next) => {

  //class method to destroy
  await Student.destroy({
    where: {id: req.params.id}
  })
  res.sendStatus(204);

  //instance method to destroy
  let studentToRemove = await Student.findById(req.params.id)
  res.status(204)
  await studentToRemove.destroy()
  res.send(studentToRemove)
})//delete existing student

module.exports = router;
