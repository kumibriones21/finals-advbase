var express = require('express');
var router = express.Router();
const fireBaseDB = require('../config');
const { collection, doc, getDocs, addDoc, setDoc, deleteDoc, getDoc } = require('firebase/firestore');

const deptRef = collection(fireBaseDB, 'department');

// Get all departments
router.get('/', async function(req, res, next) {
  try {
    const data = await getDocs(deptRef);
    const list = data.docs.map((doc) => ({ dpt_id: doc.id, ...doc.data() }));
    res.send({ results: list });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Create a new department
router.post('/', async function(req, res, next) {
  try {
    const { dpt_id, name, courses, description } = req.body;
    const departmentData = {
      dpt_id,
      name,
      courses,
      description,
    };

    const docRef = doc(deptRef);
    await setDoc(docRef, departmentData);

    res.status(201).send({ message: "Department created successfully!", data: departmentData });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Insert document overriding id
router.post('/id/:id', async function(req, res, next) {
  try {
    const data = req.body;
    const id = req.params.id;
    const docRef = doc(deptRef, id);

    await setDoc(docRef, data);
    res.send({ dpt_id: id, data: data });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Update a department by id
router.put('/id/:id', async function(req, res, next) {
  try {
    const id = req.params.id;
    const data = req.body;
    const docRef = doc(deptRef, id);

    await setDoc(docRef, data, { merge: true });
    res.send({ response: "Department updated successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Delete a department by id
router.delete('/id/:id', async function(req, res, next) {
  try {
    const id = req.params.id;
    const docRef = doc(deptRef, id);

    await deleteDoc(docRef);
    res.send({ response: "Department deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get a department by id
router.get('/:id', async function(req, res, next) {
  try {
    const id = req.params.id;
    const docRef = doc(deptRef, id);
    const data = await getDoc(docRef);

    if (data.exists()) {
      res.send({ results: { dpt_id: data.id, ...data.data() } });
    } else {
      res.status(404).send({ error: "Department not found" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
