const express = require("express")
const checkToken = require("../../middleware/verify_mid")
const router = express.Router()
const check = require("express-validator/check").check
const validationResult = require("express-validator/check").validationResult
const rpcIns = require("../../ins/UserManagmentIns").getInstance()
router.post("/admin/edit", [
    check("userID")
        .notEmpty()
        .isNumeric()
        .withMessage("Password can not be empty"),checkToken
], function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({errors: errors.mapped()})
    }
    console.log(req.header("x-token"))
    if (req.header("x-token") === undefined || req.header("x-token") === "") {
        res.json({status: -1, message: "Query fail"})
    } else {
        let data = {}
        if ("userID" in req.body){
            data.id  = req.body["userID"]
        }
        if ("name" in req.body){
            data.name = req.body["name"]
        }
        if ("number" in req.body){
            data.number =req.body["number"]
        }
        if ("email" in req.body){
            data. email =req.body["email"]
        }
        if ("sex" in req.body){
            data.sex = req.body["sex"]
        }
        if ("enable" in req.body){
            data.enable = req.body["enable"]
        }
        if ("role" in req.body){
            data.role = req.body["role"]
        }
        rpcIns.user_edit(req.header("x-token"),data,(result) => {
            if (result === 1) {
                res.json({status: 1, message: "edit success"})
            } else {
                res.json({status: -1, message: "edit fail"})
            }
        }, (error) => {
            res.json({status: -1, message: error})
        })
    }

})
module.exports = router
