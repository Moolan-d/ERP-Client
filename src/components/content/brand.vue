<template>
    <div class="wrap"   v-loading="datas==''?true:false">
         <div class="tabs">
            <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>基础配置</el-breadcrumb-item>
            <el-breadcrumb-item>品牌管理</el-breadcrumb-item>
            <el-breadcrumb-item>品牌列表</el-breadcrumb-item>

            </el-breadcrumb>
        </div>
        <el-table  v-loading="loading" :data="datas.brands.rows "   highlight-current-row
        @current-change="handleCurrentChange" v-if="datas!=''" border style="width: 100%" height="505" class="tables">
            <el-table-column fixed prop="id" label="品牌ID" width="150">
            </el-table-column>
            <el-table-column prop="name" label="品牌名称" >
            </el-table-column>
            <el-table-column  label="操作" fixed="right" width="100px">
                <template scope="scope">
                    <el-row type="flex">
                        <el-col :span="8" style="margin-left:-5px">
                            <a v-bind:href=" `#/home/center/updateBrand?id=${brandid}`">
                            <el-button  size="mini" @click="handleEdit(scope.$index, scope.row)">品牌详情<i class="el-icon-upload el-icon--right"></i></el-button>
                             </a>
                        </el-col>
<!--                         <el-col :span="8" >
                            <el-button size="mini" @click="addCategory(scope.$index, scope.row)">新增二级类目</el-button>
                        </el-col> -->
                    </el-row>
                </template>  
            </el-table-column>

        </el-table>

        <!-- <el-dialog title="更新品牌" v-model="dialogFormVisible">
            <el-form >
                <el-form-item label="品牌名" :label-width="formLabelWidth">
                    <el-input  v-model="updateForm.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="update(updateForm)">确 定</el-button>
            </div>
        </el-dialog> -->
    </div>
</template>


<script>
import { mapGetters } from 'vuex';
export default{
    data(){
      return {
        updateForm:{
          name:"",
          id:"",
         
        },
        brandid: "",
        loading:true,
        dialogFormVisible: false,
        updatebutton:false,
        formLabelWidth: '120px'
      } 
    },
    computed: mapGetters({
        datas: 'brands'
    }),
  
    created(){
      this.$store.dispatch('getBrands')
        if (this.datas) {
            this.loading=false
        }
    },
    methods: {
        formatter(row, column) {
            return row.address;
        },
        handleCurrentChange(val,updatebutton) {
            this.updatebutton=true
            this.currentRow = val
            this.updateForm.name=val.name
            this.updateForm.id=val.id
           
        },
        update(updateForm){
            this.dialogFormVisible = false

            this.$store.dispatch('updateBrand', {
                updateForm
            }).then(window.location.reload("#/home/center/brand"))
        },
        handleEdit(index,row){
            this.dialogFormVisible = true 
            this.$store.state.toUpdateBrand = row
            this.brandid = row.id
        },
        addCategory(){

        }

    }
};
</script>


<style>
    
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  transform: translateX(10px);
  opacity: 0;
}
</style>