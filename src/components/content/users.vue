<template>
    <div class="main">
        <el-table class="wrap" :data="datas.users.rows" v-if="datas!=''" border :default-sort="{prop: 'date', order: 'descending'}" style="width: 99%">
            <el-table-column prop="id" label="ID"  sortable width="120"></el-table-column>
            <el-table-column prop="email" label="邮箱"  width="240"></el-table-column>

            <el-table-column prop="displayName" label="描述"></el-table-column>
            <el-table-column  label="绑定钉钉"  width="120">
                <template scope="scope">
                    <div style="margin-left:20px" v-if="scope.row.dtUserId">
                    <el-checkbox  v-model="select" disabled></el-checkbox>
                        
                    </div>
                </template>

            </el-table-column>
            <el-table-column  label="操作" fixed="right" width="100px">
                <template scope="scope">
                <el-row type="flex" justify="space-between">
                    <el-col :span="8" style="margin-left:-5px">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">更新</el-button>
                    </el-col>
                </el-row>
                </template>
               
            </el-table-column>
        </el-table>
    
        <el-dialog title="更新用户信息" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="昵称" :label-width="formLabelWidth">
                  <el-input v-model="form.displayName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                  <el-input v-model="form.email" auto-complete="off"></el-input>
                </el-form-item>
               
                <el-form-item label="绑定钉钉" :label-width="formLabelWidth">
                  <el-select v-model="form.dtUserId" placeholder="请选择钉钉用户">
                    <el-option :key="item.userid" v-for="item in staffs" :label="item.name" :value="item.userid"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updatateUser">确 定</el-button>
              </div>
        </el-dialog>

    </div>
       
</template>

<script>

  import {
      mapGetters
  } from 'vuex';
export default {
    data() {
            return {
                dialogFormVisible: false,
                form: {
                    displayName: '',
                    email: '',
                    dtUserId: '',

                },
                select: true,
                formLabelWidth: '70px',
                staffs: [],
                editUser: null,
                editIndex: null,
            }
        },

        computed: mapGetters({
            datas: 'users'
        }),

        mounted() {
            this.$store.dispatch('getUsers');
            this.$store.dispatch('getDsataffs').then(res => {
                this.staffs = res.staff
            })
        },
        methods: {
            formatter(row, column) {
                return row.address;
            },
            handleEdit(index, row) {
                this.dialogFormVisible = true
                this.form.displayName = row.displayName
                this.form.email = row.email
                this.form.dtUserId = row.dtUserId
                this.form.id = row.id
                this.editIndex = index;
                this.editUser = row
            },
            updatateUser() {
                this.dialogFormVisible = false
                let userForm = this.form
                this.$store.dispatch('updateUser', {
                        userForm
                    })
                    .then(res => {
                        this.$message({
                            message: "用户更新成功",
                            type: "success"
                        })
                        this.$set(this.datas.users.rows, this.editIndex, res.user);

                    })
            }
        }

};
</script>

<style lang="">
.wrap{
  border-radius: 5px
}
.modelauto{
  width: 1000px;
  margin-top: 100px
}
</style>