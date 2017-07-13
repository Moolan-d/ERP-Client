;
import * as types from '../mutation-types.js';
import * as req from '../../api/user'

const state = {
    users: [],
    error: null,
    signinUser: null
};

const getters = {
    users: state => state.users
};

const actions = {
    createUser( { commit },{ userMessage } ){

        return new Promise((resolve,reject)=> {
            req.createUser(userMessage)
                .then(userMessage=> {
                    resolve(userMessage)
                    
                })
                .catch(error=>{
                    console.log(error)
                    commit(types.USER_CREATE,{ error })
                })

        })

    },

    getUser({ commit }, argv) {
        
        return new Promise((resolve, reject) => {

            req.getUser(argv)
                .then(res => {
                    resolve(res);
                }).catch(error => {
                    commit(types.USER_INFO, { error });
                });

        });
    },

    getUsers({ commit }) {
        return new Promise((resolve, reject) => {
            req.getUsers()
                .then(users => {
                    resolve(users)
                    commit(types.USERS_LIST, {
                        users
                    })
                })
        })
    },

    userSignin({ commit }, { email, password }) {

        let that = this;
        return new Promise((resolve) => {
            req.signin(email, password).then(res => {
                resolve(res.signin);
                commit(types.USER_SIGNIN, {
                    user: res.signin
                });
            }).catch(error => {
                commit(types.USER_SIGNIN, {
                    error
                })
            });
        })

    },
    getAuthorityList({commit}) {
        return new Promise((resolve, reject) => {

            req.getAuthorityList()
                .then(res => {
                    resolve(res);
                }).catch(error => {
                    console.log(error)
                    commit(types.AUTHORITY_LIST, { error });
                });

        })
    },
    createUserRole({commit}, {userRoleForm}){
        return new Promise((resolve,reject) => {
            req.createUserRole(userRoleForm)
                .then(res=>{
                    resolve(res);

                }).catch(error=>{
                    commit(types.USERROLE_CREATE,{error})
                })
        })
    },
    getUserRoles(){
        return new Promise((resolve,reject) => {
            req.getUserRoles()
                .then(res=>{
                    resolve(res)
                }).catch(error=>{
                    commit(types.USERROLE_LIST,{error})
                })
        })
    },
    updateUserRole({commit}, {userRoleForm}){
        return new Promise((resolve,reject) => {
            req.updateUserRole(userRoleForm)
                .then(res=>{
                    resolve(res);

                }).catch(error=>{
                    commit(types.USERROLE_UPDATE,{error})
                })
        })
    },
    getDsataffs({commit}) {
        return new Promise((resolve,reject) => {
            req.getDsataffs()
                .then(res=>{
                    resolve(res)
                }).catch(error=>{
                    commit(types.DSTAFFS_LIST,{error})
                })
        })
    },
    updateUser({commit},{userForm}) {
        return new Promise((resolve,reject) => {
            req.updateUser(userForm)
                .then(res => {
                    resolve(res)
                }).catch(error => {
                    commit(types.USER_UPDATE,{error})
                })
        })
    }

};

const mutations = {
    [types.USER_INFO](state, { user, error }) {
        if (error) {
            state.error = error;
        }
    },
    [types.USER_CREATE](state,{ userMessage,error }){
        if (error) {
            state.error = error;
            return;
        }
    },
    [types.USERS_LIST](state,{ users }){
        state.users = users;
    },
    [types.USER_SIGNIN](state, { user, error }){
        if (error) {
            state.error = error;
            return;
        }
        state.signinUser = user;
        //如果登录完成，则将用户放入LocalStore
        localStorage.user = JSON.stringify(user);
    },
    [types.AUTHORITY_LIST](state ,{models , error}) {
        if (error) {
            state.error = error;
            return;
        }
    },
    [types.USERROLE_CREATE](state,{error}){
       if (error) {
            state.error = error;
            return;
        } 
    },
    [types.USERROLE_LIST](state,{error}){
        if (error) {
            state.error = error;
            return;
        } 
    },
    [types.USERROLE_UPDATE](state,{error}){
        if (error) {
            state.error = error
        }
    },
    [types.DSTAFFS_LIST](state,{error}){
        if (error) {
            state.error = error
        }
    },
    [types.USER_UPDATE](state,{error}){
        if (error) {
            state.error = error
        }
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};