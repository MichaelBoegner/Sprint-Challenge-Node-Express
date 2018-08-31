const express = require('express');
const actionModel = require('../helpers/actionModel');
const router = express.Router(); 

function actionCheck(req, res, next){
    let [body] = [req.body]

    if(body.text) {
        next(); 
    } else {
        res.status(400).json({error: "'text' is a required property with a value as string and no size limit."})
        }

    if(body.notes) {
        next(); 
    } else {
        res.status(400).json({error: "'notes' is a required property with a value as string and no size limit."})
        }

    if(!body.id){
        next(); 
    } else {
        res.status(400).json({error: "No Id is required."})
        } 

    if(body.project_id){
        next(); 
    } else {
        res.status(400).json({error: "'project_id' is a required property and must be the id of an existing user."})
        } 

    if(body.description.length > 128) {
        next(); 
    } else {
        res.status(400).json({error: "Property 'description' cannot be more than 128 characters long."})
        }
}


router.get('/:id', (req, res) => {
    let [id] = [req.params.id]

    actionModel.get(id)
        .then(actions => { 
            res.status(200).json(actions); 
        })
        .catch(err => {
            res.status(500).json({error: "The actions information could not be retrieved."})
        })
})


router.post('/', actionCheck, (req, res) => {
    let body = req.body

    actionModel.insert(body)
        .then(actions => { 
            res.status(201).json(actions.id); 
        })
        .catch(err => {
            res.status(500).json({error: "The action could not be created."})
        })
})


router.put('/:id', actionCheck, (req, res) => {
    let [id, body] = [id, req.body]
 
    actionModel.update(id, body)
        .then(actions => { 
            res.status(200).json(actions); 
        })
        .catch(err => {
            res.status(500).json({error: "The action could not be updated."})
        })
})

router.delete('/:id', (req, res) => {
    let [id] = [req.params.id]

    actionModel.remove(id)
        .then(actions => { 
            res.status(200).json(actions); 
        })
        .catch(err => {
            res.status(500).json({error: "The action could not be deleted."})
        })
})

module.exports = router; 