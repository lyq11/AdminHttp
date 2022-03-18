const express = require("express")
const router = express.Router()
const check = require("express-validator/check").check
const checkToken = require("../../middleware/verify_mid")
const validationResult = require("express-validator/check").validationResult
const rpcIns = require("../../ins/PermissionMIns").getInstance()

function getBind(req) {
    return new Promise((resolve, reject) => {
        rpcIns.queryBindRoleAndRight(req.body["number"], req.body["pages"], (result, data, count) => {
            console.log(result)
            if (result === 1) {
                resolve({status: 1, message: data, count: count})
                console.log(data)
            } else {
                reject(new Error("Query fail"))
            }
        }, (error) => {
            reject(new Error("Query fail"))
        })
    })
}
function getFromrole(arr,id){
    for(let item of arr){
        if (item["id"] === id){
            return item["name"]
        }
    }
}
function getRole(req) {
    return new Promise((resolve, reject) => {
        rpcIns.queryRole(-1, -1, (result, data, count) => {
            console.log(result)
            if (result === 1) {
                req["message"].map((bindInfo)=>{
                    bindInfo["roleName"] = getFromrole(data,bindInfo["role_id"])
                    return bindInfo
                })
                console.log(data)
                console.log(req)
                resolve(req)
            } else {
                reject(new Error("Query fail"))
            }
        }, (error) => {
            reject(new Error("Query fail"))
        })
    })
}
function sendback(data,res){
    res.json(data)
}
function getPermission(req) {
    return new Promise((resolve, reject) => {
        console.log(req)
        rpcIns.queryPermission(-1, -1, (result, data, count) => {
            console.log(result)
            if (result === 1) {
                console.log(data)
                req["message"].map((bind)=>{
                    bind["PermissionName"] = getFromrole(data,bind["Permission_id"])
                    return bind
                })
                console.log(req)
                resolve(req)
            } else {
                reject(new Error("Query fail"))
            }
        }, (error) => {
            reject(new Error("Query fail"))
        })
    })
}

router.post("/admin/permission/queryBind", [
    check("number")
        .notEmpty()
        .isNumeric()
        .withMessage("number can not be empty"),
    check("pages")
        .notEmpty()
        .isNumeric()
        .withMessage("pages can not be empty"),

], function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({errors: errors.mapped()})
    }
    getBind(req).then(BindData=>{
        return getPermission(BindData)
    }).then(BindData=>{
        return getRole(BindData)
    }).then(BindData=>{
        sendback(BindData,res)
    }).catch()
})

module.exports = router
