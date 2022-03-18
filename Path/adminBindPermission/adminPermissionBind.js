const express = require("express")
const router = express.Router()
const check = require("express-validator/check").check
const checkToken = require("../../middleware/verify_mid")
const validationResult = require("express-validator/check").validationResult
const rpcIns = require("../../ins/PermissionMIns").getInstance()
router.post("/admin/permission/bind", [
    check("role_id")
        .notEmpty()
        .isNumeric()
        .withMessage("role_id can not be empty"),
    check("Permission_id")
        .notEmpty()
        .isNumeric()
        .withMessage("Permission_id can not be empty"),
    checkToken
], function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.mapped() })
    }

    rpcIns.bindRoleAndRights(req.body["role_id"], req.body["Permission_id"],(result) => {
        console.log(result)
        if (result === 1) {
            res.json({ status: 1, message: "bind success" })
        } else {
            res.json({ status: -1, message: "bind fail" })
        }
    }, (error) => {
        res.json({ status: -1, message: error })
    })
})

module.exports = router
