<template>
    <div class="wrap"  v-loading="datas==''?true:false">
        <div class="tabs">
            <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>基础配置</el-breadcrumb-item>
            <el-breadcrumb-item>分类管理</el-breadcrumb-item>
            <el-breadcrumb-item>分类列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table :data="datas.categories "  highlight-current-row
        @current-change="handleCurrentChange" v-loading="loading" v-if="datas!=''" border style="width: 100%" height="505">
            <el-table-column fixed prop="id" label="分类ID" width="150">
            </el-table-column>
            <el-table-column prop="name" label="分类标签" >
            </el-table-column>
            <el-table-column  label="操作" fixed="right" width="200px">
                <template scope="scope">
                    <el-row type="flex">
                        <el-col :span="8" style="margin-left:10px">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">更新<i class="el-icon-upload el-icon--right"></i></el-button>
                        </el-col>
                        <el-col :span="8" style="margin-left:20px">
                            <el-button size="mini" @click="addCategory(scope.$index, scope.row)">二级类目<i class="el-icon-plus el-icon--right"></i></el-button>
                        </el-col>
                    </el-row>
                </template>  
            </el-table-column>
        </el-table>


        <el-dialog title="更新分类" v-model="dialogFormVisible">
            <el-form >
                <el-form-item label="分类" :label-width="formLabelWidth">
                    <el-input  v-model="updateForm.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="update(updateForm)">确 定</el-button>
            </div>
        </el-dialog>

        <template>
            <el-dialog title="添加二级类目" v-model="addCategoryVisible">

                <el-form >
                <el-form-item label="二级类目" :label-width="formLabelWidth">
                     <el-tag  style="margin:0 10px" type="gray" v-for="item in subCategories">{{item.name}}</el-tag>

                    </el-form-item>
                    <el-form-item label="新建类目" :label-width="formLabelWidth">
                        <el-input  v-model="subCategoryForm.name" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="addCategoryVisible = false">取 消</el-button>
                <el-button type="primary" @click="createBranch(subCategoryForm)">确 定</el-button>
            </div>
            </el-dialog>
        </template>
    </div>	
</template>


<script>
import { mapGetters } from 'vuex';
export default{
    data(){
    return {
        updateForm:{
          name:"",
          id:""
        },
        dialogFormVisible: false,
        addCategoryVisible:false,
        loading:true,
        formLabelWidth: '80px',
        subCategoryForm:{
            name:"",
            id:null
        },
        subCategories:[]
      } 
    },

    computed: mapGetters({
        datas: 'categories',

    }),
  
   created(){
        this.$store.dispatch('getCategories')
         if (this.datas) {
            this.loading=false
            console.log(this.datas)
        }
    },
    methods: {
        formatter(row, column) {
            return row.address;
        },
        handleCurrentChange(val,updatebutton) {
            this.currentRow = val
            this.updateForm.name=val.name
            this.updateForm.id=val.id         
        },
        update(updateForm) {
            this.dialogFormVisible=false
            this.$store.dispatch('updateCatetory',{ updateForm })
        },
        handleEdit(){
            this.dialogFormVisible = true
        },
        addCategory(index, row){
            this.addCategoryVisible = true
            this.subCategoryForm.id = row.id
            let parentId = row.id
            this.$store.dispatch('getSubCategories',{parentId}).then(
                res=>{
                    this.subCategories = res.subCategories
                }
                )

        },
        createBranch(subCategoryForm){
            if (this.subCategoryForm.name!=="") {
                this.$store.dispatch('createSubCategory',{ subCategoryForm })
                .then(res=>{
                    this.addCategoryVisible = false
                    this.subCategoryForm.name = ""
                })
            }
            
        }
    }
};	
</script>
