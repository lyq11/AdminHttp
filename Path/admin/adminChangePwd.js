const express = require("express")
const checkToken = require("../../middleware/verify_mid")
const router = express.Router()
const check = require("express-validator/check").check
const validationResult = require("express-validator/check").validationResult
const rpcIns = require("../../ins/UserManagmentIns").getInstance()
router.post("/admin/changPwd", [
    check("password")
        .notEmpty()
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
        rpcIns.changePassword(req.header("x-token"),req.body["password"],(result) => {
            if (result === 1) {
                res.json({status: 1, message: "change success"})
            } else {
                res.json({status: -1, message: "change fail"})
            }
        }, (error) => {
            res.json({status: -1, message: error})
        })
    }

})
module.exports = router
