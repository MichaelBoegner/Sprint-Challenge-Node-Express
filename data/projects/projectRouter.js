const express = require('express');
const projectModel = require('../helpers/projectModel');
const router = express.Router(); 




function projectCheck(req, res, next){
    let [body] = [req.body]

    if(body.name.length > 128) {
        next(); 
    } else {
        res.status(400).json({error: "Property 'name' cannot be more than 128 characters long."})
        }

    if(!body.id){
        next(); 
    } else {
        res.status(400).json({error: "No Project Id is required."})
        } 

    if(body.description){
        next(); 
    } else {
        res.status(400).json({error: "Please include necessary property of 'description'. No length limit."})
        }     
}


router.get('/:id', (req, res) => {
    let [id] = [req.params.id]

    projectModel.get(id)
        .then(projects => { 
            res.status(200).json(projects); 
        })
        .catch(err => {
            res.status(500).json({error: "The projects information could not be retrieved."})
        })
})

router.get('/actions/:id', (req, res) => {
    let [id] = [req.params.id]

    projectModel.getProjectActions(id)
        .then(projects => {
            res.status(200).json(projects); 
        })
        .catch(err => {
            res.status(500).json({error: "The project's posts could not be retrieved."})
        })
})

router.post('/', projectCheck, (req, res) => {
    let [body] = [req.body]
    
    projectModel.insert(body)
        .then(projects => { 
            res.status(200).json(projects); 
        })
        .catch(err => {
            res.status(500).json({error: "The project could not be created."})
        })
})

router.put('/:id', projectCheck, (req, res) => {
    let [id, body] = [id, req.body]

    projectModel.update(id, body)
        .then(projects => { 
            res.status(200).json(projects); 
        })
        .catch(err => {
            res.status(500).json({error: "The project could not be updated."})
        })
})

router.delete('/:id', (req, res) => {
    let [id] = [req.params.id]

    projectModel.remove(id)
        .then(projects => { 
            res.status(200).json(projects); 
        })
        .catch(err => {
            res.status(500).json({error: "The project could not be deleted."})
        })
})

module.exports = router; 

