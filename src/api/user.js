import { client } from "./index"
import md5 from 'md5'


function signin(email, password) {

    password = md5(password);

    let  mutationQuery = `
    {
        signin(email:"${email}", password:"${password}"){
            token,
            userId,
            displayName
        }
    }
    `
    return client.mutate(mutationQuery);

}

function getUser({id, fields}) {

    let query = `
    {
        user: user(id: ${id}) {
            ${fields}
        }   
    }
    `
    return client.query(query);

}

//获取钉钉用户
function getDsataffs(){
    let query = `
    {
        staff: getStaffs {
            name,
            userid
          }
    }`
    return client.query(query)
}

function updateUser(userForm){
    let query = `
    {
        user:updateUser(
        id:${userForm.id},
        email:"${userForm.email}",
        isSuper:${true},
        displayName:"${userForm.displayName}",
        dtUserId:"${userForm.dtUserId}"
        ){
            displayName,
            id,
            email,
            dtUserId
        }
     
    }
    `
    return client.mutate(query)
}

//用户注册
function createUser(userMessage) {
   let password = md5(userMessage.password);
   console.log(userMessage)
   let mutate=`{
        user:createUser(email:"${userMessage.email}",
        displayName:"${userMessage.displayName}",
        password:"${password}",
        isSuper:${userMessage.isSuper},
        dtUserId:"${userMessage.dtUserId}"
        )
       
        {
            id,
            email,
            displayName
        }
   }`
   return client.mutate(mutate)
}

//所有用户

function getUsers() {
    let query=`{
        users:users(limit:${15},order:"createdAt DESC",page:${1}){
            rows{
                id,
                displayName,
                email,
                dtUserId
            }
        }
    }`
    return client.query(query)
}

function getAuthorityList () {
    let query = `{
        modules:modules(limit:${100}) {
            rows {
                id,
                des,
                name,
                    actions{
                        name,
                        des,
                        id
                    }
            }
        }
    }`

    return client.query(query)
}

function createUserRole(userRoleForm) {
    
    let query = `{
        userRoles:createUserRole(
        name:"${userRoleForm.name}",
        users:"${userRoleForm.users}",
        actions:"${userRoleForm.actions}"
        ) {
            id,
            name,
        }
    }`
    return client.mutate(query)
}

function getUserRoles(){
    let query = `{
        userRoles:userRoles(limit:${1000}){
            rows{
                name,
                id,
                actions{
                    des,
                    id
                },
                users{
                    displayName,id
                }
            }
        }
    }`
    return client.query(query)
}

function updateUserRole(userRoleForm){
    console.log(userRoleForm)
    let query = `{
        userRoles:updateUserRole(
            name:"${userRoleForm.name}",
            users:"${userRoleForm.users}",
            actions:"${userRoleForm.actions}"
            id:${userRoleForm.id}
        ){
            id,
            name
        }
    }`
    return client.mutate(query)
}


export {
    signin,
    getUser,
    createUser,
    getUsers,
    getAuthorityList,
    createUserRole,
    getUserRoles,
    updateUserRole,
    getDsataffs,
    updateUser
}

