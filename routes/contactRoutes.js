const express = require("express")
const router = express.Router()
const Contact = require("../models/contactModel")

router.get("/Hello", (req, res) => {
    res.send("Hello routing")
})

router.post("/user", async (req, res) => {
    try {
        const newContact = new Contact(req.body)
        if (!req.body.email) {
            res.status(400).send({ message: "email is required" })
        }
        if (!req.body.name) {
            res.status(400).send({ message: "name is required" })
            return
        }
        const response = await newContact.save()
        res.status(200).send({ response: response, message: "user saved" })
    } catch (error) {
        res.status(500).send({ message: "can not save the user" })
        console.log(error)
    }
})

router.get("/", async (req, res) => {
    try {
        const result = await Contact.find()
        res.status(200).send({ response: result, message: "getting contacts" })
    } catch (error) {
        res.send({ message: "can not fet contact" })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const result = await Contact.findOne({ _id: req.params.id })
        if (result) {
            res.status(200).send({ response: result, message: "getting contact by id" })
        } else { res.status(400).send({ message: "no contact with such id" }) }
    } catch (error) {
        res.send({ message: "can not get contact by id" })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const result = await Contact.deleteOne({ _id: req.params.id })
        res.status(200).send({ response: result, message: "deleting contact by id" })

    } catch (error) {
        res.send({ message: "can not get contact by id" })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const result = await Contact.updateOne({_id: req.params.id}, {$set: {...req.body}})
        if (result){
            const newResult = await Contact.findOne({_id: req.params.id})
            res.status(200).send({response: newResult, message: "contact updated"})
        } else {
            res.status(400).send({message: "no user with such id"})
        }
    } catch (error) {
      res.status(500).send({message: "cannot update contact"})  
    }
})


module.exports = router