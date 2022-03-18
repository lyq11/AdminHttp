const Tars = require("@tars/rpc").client
const RPC = require("../proxy/PermissionMProxy").civetAdminCenter
class UserMgmtIns {
    proxy = null
    constructor() {
        // Tars.setProperty("locator", "tars.tarsregistry.QueryObj@tcp -h 172.25.0.3 -t 60000 -p 17890")
        this.proxy = Tars.stringToProxy(RPC.PermissionMProxy,"civetAdminCenter.AdminPermissionMan.PermissionMObj")
    }
    static getInstance(){
        if(!UserMgmtIns.instance){
            UserMgmtIns.instance = new UserMgmtIns()
        }
        return UserMgmtIns.instance
    }
    // eslint-disable-next-line max-params
    createRole(roleName,name,success,fail){
        let newRole = new RPC.AdminRole()
        newRole.readFromObject({
            roleName:roleName,
            name:name,
            createTime:String(parseInt(+new Date()/1000, 10))
        }
        )
        console.log(newRole)
        this.proxy.createRole(newRole).then((data) => {
            console.log("接口返回字段：", data.response.arguments.c)
            console.log("baohande", data.response.arguments)
            console.log("调用耗时", data.response.costtime)
            success(data.response.arguments.c)
        }).catch((e) => {
            console.log("框架错误码：", e.response.error.code)
            console.log("框架错误信息：", e.response.error.message)
            console.log("调用耗时", e.response.costtime)
            fail(e.response.error.message)
        })

    }
    deleteRole(id,success,fail){
        this.proxy.deleteRole(id).then((data) => {
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
    queryRole(offset,limit,success,fail){
        this.proxy.queryRole(offset,limit).then((data) => {
            console.log("接口返回字段：", data.response.arguments.result)
            console.log("baohande", data.response.arguments)
            console.log("接口返回字段：", data.response.arguments.role)
            console.log("调用耗时", data.response.costtime)
            console.log("STRING:", data.response.arguments.role)
            success(data.response.arguments.result,data.response.arguments.role.value,data.response.arguments.count)
        }).catch((e) => {
            console.log("框架错误码：", e.response.error.code)
            console.log("框架错误信息：", e.response.error.message)
            console.log("调用耗时", e.response.costtime)
            fail(e.response.error.message)
        })
    }
    // eslint-disable-next-line max-params
    queryPermission(offset,limit,success,fail){
        this.proxy.queryPermission(offset,limit).then((data) => {
            console.log("接口返回字段：", data.response.arguments.result)
             console.log("接口返回字段：", data.response.arguments.Rights)
            console.log("调用耗时", data.response.costtime)
              success(data.response.arguments.result,data.response.arguments.Rights.value,data.response.arguments.count)
        }).catch((e) => {
            console.log("框架错误码：", e.response.error.code)
            console.log("框架错误信息：", e.response.error.message)
            console.log("调用耗时", e.response.costtime)
            fail(e.response.error.message)
        })
    }
    deletePermission(id,success,fail){
        this.proxy.deletePermission(id).then((data) => {
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
    createPermission(tag,name,path,summarize,success,fail){
        let newRole = new RPC.Permission()
        newRole.readFromObject({
                tag:tag,
                name:name,
                summarize:summarize,
                path:path
            }
        )

        this.proxy.createPermission(newRole).then((data) => {
            console.log("baohande", data.response.arguments)
            console.log("调用耗时", data.response.costtime)
            console.log("STRING:", data.response.arguments.c)
            success(data.response.arguments.c)
        }).catch((e) => {
            console.log("框架错误码：", e.response.error.code)
            console.log("框架错误信息：", e.response.error.message)
            console.log("调用耗时", e.response.costtime)
            fail(e.response.error.message)
        })
    }
    bindRoleAndRights(role_id,Permission_id,success,fail){
        let newBind = new RPC.AdminRoleHasPermission()
        newBind.readFromObject({
            role_id : role_id,
            Permission_id : Permission_id,
            uni_id : role_id+"&"+Permission_id,
            create_time:parseInt(+new Date()/1000, 10)
            }
        )
        console.log(newBind)
        this.proxy.bindRoleAndRights(newBind).then((data) => {
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
    unBindRoleAndRight(role_id,success,fail){
        this.proxy.unBindRoleAndRights(role_id).then((data) => {
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
    queryBindRoleAndRight(offset,limit,success,fail){
        this.proxy.queryRolePermission(offset,limit).then((data) => {
            console.log("接口返回字段：", data.response.arguments.result)
            console.log("baohande", data.response.arguments)
            console.log("调用耗时", data.response.costtime)
            success(data.response.arguments.result,data.response.arguments.binds.value,data.response.arguments.count)
        }).catch((e) => {
            console.log("框架错误码：", e.response.error.code)
            console.log("框架错误信息：", e.response.error.message)
            console.log("调用耗时", e.response.costtime)
            fail(e.response.error.message)
        })
    }
}
exports =module.exports = UserMgmtIns
