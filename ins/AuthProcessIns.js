const Tars = require("@tars/rpc").client
const TarsRPC = require("../proxy/AuthProcessProxy").civetAdminCenter
class AuthProcessIns {
    proxy = null
    constructor() {
        // Tars.setProperty("locator", "tars.tarsregistry.QueryObj@tcp -h 172.25.0.3 -t 60000 -p 17890")
        this.proxy = Tars.stringToProxy(TarsRPC.AuthProcessProxy,"civetAdminCenter.AdminUserAuthProcess.AuthProcessObj")
    }
    static getInstance(){
        if(!AuthProcessIns.instance){
            AuthProcessIns.instance = new AuthProcessIns()
        }
        return AuthProcessIns.instance
    }

    login(username,password,success,fail){
        let newReq = new TarsRPC.AdminAuthDataInfo()
        newReq.readFromObject({
            username:username,
            password:password,
            companyID:-99,
            logintype:"web"
        })
        this.proxy.login(newReq).then((data)=>{
            console.log("接口返回值：", data.response.return)
            console.log("接口返回字段：", data.response.arguments.result)
            console.log("baohande",data.response.arguments)
            console.log("接口返回字段：", data.response.arguments.token)
            console.log("调用耗时", data.response.costtime)
            console.log("STRING:", data.response.arguments.token)
            success(data.response.arguments.result,data.response.arguments.token)
        }).catch((e)=>{
            console.log("框架错误码：", e.response.error.code)
            console.log("框架错误信息：", e.response.error.message)
            console.log("调用耗时", e.response.costtime)
            fail(e.response.error.message)
        })
    }
}
exports =module.exports = AuthProcessIns
