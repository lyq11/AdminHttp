const express = require("express")
const bodyParser = require("body-parser")
const adminLogin = require("./Path/admin/adminLogin")
const adminUpdate = require("./Path/admin/adminUpdate")
const adminQueryAll = require("./Path/admin/adminQueryAll")
const adminDel = require("./Path/admin/adminDelete")
const adminAdd = require("./Path/admin/adminCreate")
const adminChangePwd = require("./Path/admin/adminChangePwd")


const adminRoleAdd = require("./Path/adminRole/adminRoleCreate")
const adminRoleDel = require("./Path/adminRole/adminRoleDelete")
const adminRoleQuery = require("./Path/adminRole/adminRoleQuery")
const adminPermissionAdd = require("./Path/adminPermission/adminPermissionCreate")
const adminPermissionDel = require("./Path/adminPermission/adminPermissionDelete")
const adminPermissionQuery = require("./Path/adminPermission/adminPermissionQuery")
const adminPermissionBind = require("./Path/adminBindPermission/adminPermissionBind")
const adminPermissionUnbind = require("./Path/adminBindPermission/adminPermissionUnbind")
const adminPermissionQueryBind = require("./Path/adminBindPermission/adminPermissionQuery")
const checkToken = require("./middleware/verify_mid")
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get("/hello", checkToken,(req, res) => {
  res.send("hello tars")
})


app.use(adminUpdate).use(adminQueryAll).use(adminDel).use(adminAdd).use(adminChangePwd)
app.use(adminRoleAdd).use(adminRoleDel).use(adminRoleQuery)
app.use(adminPermissionAdd).use(adminPermissionDel).use(adminPermissionQuery)
app.use(adminPermissionBind).use(adminPermissionUnbind).use(adminPermissionQueryBind)
app.use("/admin",adminLogin)

app.use(function (req, res, next) {
  res.status(404).send("404 Not Found")
})

const hostname = process.env.IP || "0.0.0.0"
const port = process.env.PORT || 3003

app.listen(port, hostname,()=>{
    console.log(`server listening at ${hostname}:${port}`)
})
