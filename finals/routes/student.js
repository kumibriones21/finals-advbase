var express = require('express');
var router = express.Router();
const fireBaseDB = require('../config');
const { collection, doc, getDocs, addDoc, setDoc, deleteDoc, getDoc } = require('firebase/firestore');

const empRef = collection(fireBaseDB, 'student');

// Get all students
router.get('/', async function(req, res, next) {
  try {
    const data = await getDocs(empRef);
    const list = data.docs.map((doc) => {
      const student = doc.data();
      return {
        std_id: student.std_id,
        name: `${student.first_name} ${student.middle_name ? student.middle_name + ' ' : ''}${student.last_name}`,
        course: `${student.department} - ${student.course}`,
        year: student.year_level
      }
    });
    res.send({ results: list });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Create a new student
router.post('/', async function(req, res, next) {
  try {
    const { std_id, first_name, last_name, middle_name, department, course, year_level } = req.body;
    const studentData = {
      std_id,
      first_name,
      last_name,
      middle_name: middle_name || "",
      department,
      course,
      year_level
    };

    const docRef = doc(empRef);
    await setDoc(docRef, studentData);
    console.log("Student saved successfully");

    const response = {
      std_id: studentData.std_id,
      name: `${studentData.first_name} ${studentData.middle_name ? studentData.middle_name + ' ' : ''}${studentData.last_name}`,
      course: `${studentData.department} - ${studentData.course}`,
      year: `${studentData.year_level} Year`
    };

    res.status(201).send({ message: 'Student saved', student: response });
  } catch (err) {
    console.log('Error saving student: ' + err);
    res.status(500).send({ error: "Error saving student" });
  }
});

// Insert document overriding id
router.post('/id/:id', async function(req, res, next) {
  try {
    const data = req.body;
    const id = req.params.id;
    const docRef = doc(empRef, id);

    await setDoc(docRef, data);
    res.send({ std_id: id, data: data });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Update a student by id
router.put('/id/:id', async function(req, res, next) {
  try {
    const id = req.params.id;
    const data = req.body;
    const docRef = doc(empRef, id);

    await setDoc(docRef, data, { merge: true });
    res.send({ response: "Update successful" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Delete a student by id
router.delete('/id/:id', async function(req, res, next) {
  try {
    const id = req.params.id;
    const docRef = doc(empRef, id);

    await deleteDoc(docRef);
    res.send({ response: "Delete successful" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get a student by id
router.get('/:id', async function(req, res, next) {
  try {
    const id = req.params.id;
    const docRef = doc(empRef, id);
    const data = await getDoc(docRef);

    if (data.exists()) {
      res.send({ results: { std_id: data.id, ...data.data() } });
    } else {
      res.status(404).send({ error: "Student not found" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
