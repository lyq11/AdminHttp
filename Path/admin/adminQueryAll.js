const express = require("express")
const checkToken = require("../../middleware/verify_mid")
const router = express.Router()
const rpcIns = require("../../ins/UserManagmentIns").getInstance()
const check = require("express-validator/check").check
const validationResult = require("express-validator/check").validationResult
router.post("/admin/query", [checkToken,
    check("number")
    .notEmpty()
    .isNumeric()
    .withMessage("number can not be empty"),
    check("pages")
        .notEmpty()
        .isNumeric()
        .withMessage("pages can not be empty")],function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({errors: errors.mapped()})
    }
      if (req.header("x-token") === undefined || req.header("x-token") === "") {
        res.json({status: -1, message: "Query fail"})
    } else {

        rpcIns.queryAll(req.body["pages"], req.body["number"],(result, list,count) => {
            if (result === 1) {
                res.json({status: 1, message: list , count:count})
            } else {
                res.json({status: -1, message: list,count:count})
            }
        }, (error) => {
            res.json({status: -1, message: error})
        })
    }

})
module.exports = router
