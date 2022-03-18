const Tars = require("@tars/rpc").client
const RPC = require("../proxy/UserManagmentProxy").civetAdminCenter
class UserMgmtIns {
    proxy = null

    constructor() {
        // Tars.setProperty("locator", "tars.tarsregistry.QueryObj@tcp -h 172.25.0.3 -t 60000 -p 17890")
        this.proxy = Tars.stringToProxy(RPC.UserManagmentProxy,"civetAdminCenter.AdminUserManagment.UserManagmentObj")
    }
    static getInstance(){
        if(!UserMgmtIns.instance){
            UserMgmtIns.instance = new UserMgmtIns()
        }
        return UserMgmtIns.instance
    }
    // eslint-disable-next-line max-params
    changePassword(token,password,success, fail){
        let strings = token.split(".")
        let b = new Buffer((strings[1].replace(/-/g, "+").replace(/_/g, "/")), "base64").toString()
        const userinfo = JSON.parse(decodeURIComponent(encodeURIComponent(b)))

        let newReq = new RPC.AdminBasicInfo()
        newReq.readFromObject({
            id:userinfo["userid"],
            password: password,
            UpdateTime: new Date().getTime(),
        })
        this.proxy.adminEditPassWord(newReq).then((data) => {
            console.log("接口返回字段：", data.response.arguments.result)
            console.log("baohande", data.response.arguments)
            console.log("调用耗时", data.response.costtime)
            success(data.response.arguments.result)
        }).catch((e) => {
            console.log("框架错误码：", e.response.error.code)
            console.log("框架错误信息：", e.response.error.message)
            console.log("调用耗时", e.response.costtime)
            fail(e.response.error.message)
        })
    }
    // eslint-disable-next-line max-params
    adminAdd(username, name, password, number, email, sex, success, fail) {
        let newReq = new RPC.AdminBasicInfo()
        newReq.readFromObject({
            username: username,
            name: name,
            password: password,
            number: number,
            email: email,
            sex: sex,
            enable: "0",
            role: "0",
            createTime: new Date().getTime(),
        })
        console.log(newReq)
        this.proxy.adminAdd(newReq).then((data) => {
            console.log("接口返回字段：", data.response.arguments.result)
            console.log("baohande", data.response.arguments)
            console.log("接口返回字段：", data.response.arguments.token)
            console.log("调用耗时", data.response.costtime)
            console.log("STRING:", data.response.arguments.token)
            success(data.response.arguments.result)
        }).catch((e) => {
            console.log("框架错误码：", e.response.error.code)
            console.log("框架错误信息：", e.response.error.message)
            console.log("调用耗时", e.response.costtime)
            fail(e.response.error.message)
        })
    }
    admindel(id, success, fail) {
          this.proxy.adminDelete(id).then((data) => {
            console.log("接口返回字段：", data.response.arguments.result)
            console.log("baohande", data.response.arguments)
            console.log("接口返回字段：", data.response.arguments.token)
            console.log("调用耗时", data.response.costtime)
            console.log("STRING:", data.response.arguments.token)
            success(data.response.arguments.result)
        }).catch((e) => {
            console.log("框架错误码：", e.response.error.code)
            console.log("框架错误信息：", e.response.error.message)
            console.log("调用耗时", e.response.costtime)
            fail(e.response.error.message)
        })
    }
    // eslint-disable-next-line max-params
    queryAll(n,p,success,fail){
        this.proxy.adminQueryAll(n,p).then((data)=>{
            console.log("接口返回值：", data.response.return)
            console.log("接口返回字段：", data.response.arguments.AdminMemberList)
            console.log("baohande",data.response.arguments)
            console.log("调用耗时", data.response.costtime)
            success(data.response.arguments.result,data.response.arguments.AdminMemberList.value,data.response.arguments.count)
        }).catch((e)=>{
            console.log("框架错误码：", e.response.error.code)
            console.log("框架错误信息：", e.response.error.message)
            console.log("调用耗时", e.response.costtime)
            fail(e.response.error.message)
        })
    }
    // eslint-disable-next-line max-params
    user_edit(token,BasicInfo,success,fail){
        // let strings = token.split(".")
        // let b = new Buffer((strings[1].replace(/-/g, "+").replace(/_/g, "/")), "base64").toString()
        // const userinfo = JSON.parse(decodeURIComponent(encodeURIComponent(b)))
        // console.log(BasicInfo)

        let req = new RPC.AdminBasicInfo()
        req.readFromObject(BasicInfo)
        console.log(req)
        this.proxy.adminUpdateByString(req,"id",BasicInfo.id).then((data)=>{
            console.log("接口返回值：", data.response.return)
            console.log("baohande",data.response.arguments)
            console.log("调用耗时", data.response.costtime)
            success(data.response.arguments.result)
        }).catch((e)=>{
            console.log("框架错误码：", e.response.error.code)
            console.log("框架错误信息：", e.response.error.message)
            console.log("调用耗时", e.response.costtime)
            fail(e.response.error.message)
        })
    }


}
exports =module.exports = UserMgmtIns
