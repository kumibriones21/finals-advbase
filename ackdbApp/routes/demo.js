var express = require('express');
var router = express.Router();
const fireBaseDB = require('../config');
const fireStore = require('firebase/firestore');
const { doc, Firestore } = require('firebase/firestore');
const empRef = fireStore.collection(fireBaseDB,'employee');

router.get('/', async function(req, res, next) {
  const data = await fireStore.getDocs(empRef)
  const list = data.docs.map((doc) => ({id: doc.id,...doc.data()}));
  res.send({results: list});
});

router.post('/', async function(req, res, next) {
  const data = req.body;
  await fireStore.addDoc(empRef, data);

  res.send({message: "Success!", data: data});
});

//insert document overriding id
router.post('/id', async function(req, res, next) {
  const data = req.body;
  const params = req.params;
  var docRef = fireStore.doc(db, 'employee', params.id);

  await fireStore.setDoc(docRef, data);
  res.send({id: param.id, data:data});
});

router.put('/id', async function(req,res,next) {
  const params = req.params;
  const data = req.body;

  // /collection/docId
  var docRef = fireStore.doc(db, 'employee', param.id)
  fireStore.setDoc(docRef, data, {merge: true})
  res.send({response: "Update"});
});

router.delete('/id', async function(req,res,next) {
  const params = req.params;

  // /collection/docId
  var docRef = fireStore.doc(db, 'employee', param.id)
  fireStore.deleteDoc(docRef);
  res.send({response: "Delete"});
});

router.get('/:id', async function(req,res,next) {
  const params = req.params;
  const docRef = fireStore.doc(db, 'employee', params.id);
  const data = await fireStore.getDoc(docRef);
  const list = data.docs.map((doc) => ({id: doc.id,...doc.data()}));
  fireStore.deleteDoc(docRef);
  res.send({results: list});
});

router.get('/:id', async function(req,res,next) {
  const params = req.params;
  const docRef = fireStore.doc(db, 'employee', params.id);
  const data = await fireStore.getDoc(docRef);
  const doc = data.data()
  res.send({results: doc});
});

module.exports = router;