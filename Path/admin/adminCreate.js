const express = require("express")
const router = express.Router()
const check = require("express-validator/check").check
const checktoken = require("../../middleware/verify_mid")
const validationResult = require("express-validator/check").validationResult
const rpcIns = require("../../ins/UserManagmentIns").getInstance()
router.post("/admin/add", [
    check("password")
        .notEmpty()
        .withMessage("Password can not be empty"),
    check("username")
        .notEmpty()
        .withMessage("username can not be empty"),
    check("name")
        .notEmpty()
        .withMessage("name can not be empty"),
    check("number")
        .notEmpty()
        .isNumeric()
        .withMessage("username can not be empty"),
    check("email")
        .isEmail()
        .notEmpty()
        .withMessage("username can not be empty"),
    check("sex")
        .notEmpty()
        .withMessage("username can not be empty"),
    checktoken
], function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.mapped() })
    }
    // id, username, name, password, number, email, sex, enable, role, createTime, UpdateTime
    rpcIns.adminAdd(req.body["username"], req.body["name"], req.body["password"], req.body["number"]
        , req.body["email"], req.body["sex"], (result) => {
             console.log(result)
            if (result === 1) {
                res.json({ status: 1, message: "add success" })
            } else {
                res.json({ status: -1, message: "add fail" })
            }
        }, (error) => {
            res.json({ status: -1, message: error })
        })
})
module.exports = router
