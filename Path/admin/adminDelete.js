const express = require("express")
const router = express.Router()
const check = require("express-validator/check").check
const validationResult = require("express-validator/check").validationResult
const rpcIns = require("../../ins/UserManagmentIns").getInstance()
const checktoken = require("../../middleware/verify_mid")
router.post("/admin/del", [
    check("ID")
        .notEmpty()
        .isNumeric()
        .withMessage("ID can not be empty"),
    checktoken
], function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({errors: errors.mapped()})
    }
    console.log(req.header("x-token"))
    if (req.header("x-token") === undefined || req.header("x-token") === "") {
        res.json({status: -1, message: "Query fail"})
    } else {
        rpcIns.admindel(req.body["ID"],  (result) => {
            if (result === 1) {
                res.json({status: 1, message: "del success"})
            } else {
                res.json({status: -1, message: "del fail"})
            }
        }, (error) => {
            res.json({status: -1, message: error})
        })
    }
})
module.exports = router
