<template>
    <ul>
        <el-table  v-loading="loading" :data="datas "   highlight-current-row
         v-if="datas!=''" border style="width: 100%" height="505" class="tables">
            <el-table-column fixed prop="name" label="权限组" width="150">
            </el-table-column>
            <el-table-column  label="人员名单">
            <template scope="scope">
                <el-tag  :key="user" style="margin:0 5px" v-for="user in scope.row.users">{{user.displayName}}</el-tag>
            </template>
            </el-table-column>
             <el-table-column  label="操作" fixed="right" width="100px">
                <template scope="scope">
                <el-row type="flex" justify="space-between">
                    <el-col :span="8" style="margin-left:-5px">
                        <a href="#/home/workplat/update"><el-button size="mini" @click="handleEdit(scope.$index, scope.row)">更新</el-button></a>
                    </el-col>

                </el-row>
                </template>
               
            </el-table-column>
        </el-table>


    </ul>
</template>

<script>
    export default{
        data(){
            return {
                loading:false,
                datas:[]
            }
        },

        created(){
            this.$store.dispatch('getUserRoles')
                .then(res=>{

                    let temp = res.userRoles.rows
                    this.datas= temp
                    temp.forEach(it=>{
                       // it.users= it.users.map(user=>user.displayName)
                        // it.users=it.users.map(user=>user.displayName).join(',')

                          // console.log(it.users)
                  
                    })

                })
        },
        methods:{
            handleEdit(index,row){
                this.$store.state.userRole=row
            },

        }
    }
</script>

<style>
    
</style>