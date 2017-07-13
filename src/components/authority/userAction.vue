<template>
<div>
    <el-button type="primary" :loading="active" @click="createUserRole" style="float:right">保存</el-button>
    <el-tag type="primary" style="margin-bottom:10px">权限组名称</el-tag>
    <div class="userGroup">
        <el-form :inline="true" :model="userGroup" class="demo-dynamic">
  
            <el-form-item >
                <el-input v-model="userGroup.name"></el-input>
            </el-form-item>


        </el-form>
    </div>

    <el-tag type="primary" style="margin-bottom:10px">选择用户</el-tag>
    <Transfer
        :data="users"
        :target-keys="targetKeys1"
        @on-change="handleChange1"></Transfer>
    <el-tag type="primary" style="margin:10px 0">分配权限</el-tag>

    <div class="checkList">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <ul>
                <li class="list"  v-for="model in modules">
                <el-row :span="24">
                    <el-col :span="2">
                        <el-tag >{{model.des}}</el-tag>  

                    </el-col>
                    <el-col  :span="22">
                        <el-checkbox-group  v-model="checkList">

                        <el-checkbox style="margin:3px" v-for="action in model.actions" :label="action.id"  :key="action.id">{{action.des}}</el-checkbox>

                    </el-checkbox-group>
                    </el-col>
                    
                </el-row>
                
                </li>
            </ul>


    </div>

</div>
                     
</template>
<script>
  import { mapGetters } from 'vuex';
    export default {

        data () {
            return {
                targetKeys1: this.getTargetKeys(),
                users:[],
                checkList: [],
                modules:"",
                checkAll:false,
                isIndeterminate:true,
                allcheckList:[],
                userChecked:"",
                userGroup:{
                   name:""
                },
                active:false
                    
            }
        },
        
        created(){
        this.getMockData()
        this.$store.dispatch('getAuthorityList')
            .then(res => {
                
                this.modules = res.modules.rows
                let temp =  this.modules
                  temp =  temp.map(it=>it.actions)
                  for (var i=0;i<temp.length;i++){
                    temp[i]=temp[i].map(it=>it.id)

                    this.allcheckList=this.allcheckList.concat(temp[i])
                  }
            })
        
      },
        methods: {
           getMockData () {
                let mockData = [];
                let temp =[]
                this.$store.dispatch("getUsers").then(res => {
                temp=res.users.rows
                for (var i = 0; i < temp.length; i++) {
                    let key = temp[i].id
                    mockData.push({
                        key: temp[i].id,
                        label:temp[i].displayName,
                        description: '内容' + i + '的描述信息',
                    });

                }
                this.users = mockData
                
            })
                
            },
            getTargetKeys () {
                // return this.getMockData()
                //         .filter(() => Math.random() * 2 > 1)
                //         .map(item => item.key);
            },
            render1 (item) {
                return item.label;
            },
            handleChange1 (newTargetKeys, direction, moveKeys) {
                // console.log(newTargetKeys);
                // console.log(direction);
                // console.log(moveKeys);

                this.targetKeys1 = newTargetKeys;
            },

            handleCheckAllChange(event,val) {
                this.checkList = event.target.checked ? this.allcheckList : [];
                this.isIndeterminate = false;
            },
            createUserRole(){
                let that = this
                let groupName = this.userGroup.name
                let users = this.targetKeys1.join(',')
                let actions = this.checkList.join(',')
                let userRoleForm = {
                    name: groupName,
                    users: users,
                    actions: actions
                }
                this.$store.dispatch('createUserRole',{userRoleForm})
                .then(res=>{
                    that.$message({
                            message: "保存成功",
                            type: "success"
                        })
                }).then(
                    location.href="#/home/workplat/actionList"
                )
            }

        }
    }
</script>


<style scoped>
    .list{
        list-style: none;
        margin: 15px 0;
    }
    ul {
        margin:0;
        padding: 0
    }
</style>
