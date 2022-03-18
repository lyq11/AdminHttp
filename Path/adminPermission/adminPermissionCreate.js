const express = require("express")
const router = express.Router()
const check = require("express-validator/check").check
const checktoken = require("../../middleware/verify_mid")
const validationResult = require("express-validator/check").validationResult
const rpcIns = require("../../ins/PermissionMIns").getInstance()
router.post("/admin/permission/add", [
    check("tag")
        .notEmpty()
        .withMessage("Password can not be empty"),
    check("name")
        .notEmpty()
        .withMessage("username can not be empty"),
    check("path")
        .notEmpty()
        .withMessage("username can not be empty"),
    check("summarize")
        .notEmpty()
        .withMessage("username can not be empty")
], function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.mapped() })
    }

    rpcIns.createPermission(req.body["tag"], req.body["name"],req.body["path"],req.body["summarize"],(result) => {
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
