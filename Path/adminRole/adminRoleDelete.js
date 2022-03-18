const express = require("express")
const router = express.Router()
const check = require("express-validator/check").check
const checkToken = require("../../middleware/verify_mid")
const validationResult = require("express-validator/check").validationResult
const rpcIns = require("../../ins/PermissionMIns").getInstance()
router.post("/admin/role/del", [
    check("role_id")
        .notEmpty()
        .isNumeric()
        .withMessage("Permission_id can not be empty"),
    checkToken
], function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.mapped() })
    }

    rpcIns.deleteRole(req.body["role_id"],(result) => {
        console.log(result)
        if (result === 1) {
            res.json({ status: 1, message: "del success" })
        } else {
            res.json({ status: -1, message: "del fail" })
        }
    }, (error) => {
        res.json({ status: -1, message: error })
    })
})

module.exports = router
