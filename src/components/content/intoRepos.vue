<template>
    <div class="wrap" v-bind="load" v-loading="intoRepos==''?true:false">
        <el-row :span="24">
            <el-col :span="4">
                
                <div class="select">
                    <el-autocomplete
                          class="inline-input"
                          v-model="selectBrand"
                          :fetch-suggestions="querySearch"
                          placeholder="请输入品牌"
                          
                          @select="handleSelect"
                        >
                    </el-autocomplete>
                </div>
            </el-col>
            <el-col :span="20" style="padding:50px">
                <template>
                    <div class="tabs">
                        <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>库存列表</el-breadcrumb-item>
                        
                        </el-breadcrumb>
                    </div>
                    <div>
                        <el-table stripe  highlight-current-row :data="showIntoRepos"
                        border style="width: 100%" height="505" class="tables"  >
                            <el-table-column prop="repo.name" width="100px" label="所在仓库" ></el-table-column>
                            <el-table-column prop="sku.product.brand.name" width="150px" sortable label="品牌" ></el-table-column>
                            <el-table-column prop="sku.goodsNo" width="150px" label="货号" ></el-table-column>
                            <el-table-column prop="sku.product.name" width="150px" sortable label="商品" ></el-table-column>
                         

                            
                            <el-table-column label="规格" sortable  width="300">
                                <template scope="scope">
                                    <span v-for="prop in scope.row.sku.properties" style="margin-right: 5px;">
                                        <el-tag type="primary">{{ prop }}</el-tag>
                                    </span>
                                </template>
                            </el-table-column>

                            <el-table-column  prop="quantity" width="90px" sortable label="数量" ></el-table-column>
                            <el-table-column width="90px" prop="unitPrice"  sortable label="价格" ></el-table-column>
                            <el-table-column width="180px" prop="dealTime" sortable  label="入库时间" ></el-table-column>
                            <el-table-column prop="batch" width="180px" sortable label="生产批次" ></el-table-column>
                            

                             <el-table-column  label="操作" fixed="right" width="100px">
                                <template scope="scope">
                                <el-row type="flex" justify="space-between">
                                    <el-col :span="8" style="margin-left:-5px">
                                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">更新</el-button>
                                    </el-col>
                                <el-col :span="8">
                                
                                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                    </el-col>
                                </el-row>
                                </template>
                               
                            </el-table-column> 
                        </el-table>                        
                    </div>


                    <template scope>
                        <div class="block">
                        
                            <el-pagination
                              @size-change="handleSizeChange"
                              @current-change="handleCurrentChange"
                              :current-page.sync="currentPage"
                              :page-size="10"
                              layout="total, prev, pager, next, jumper"
                              :total="count">
                            </el-pagination>
                        </div>
                    </template>
                   
                    <el-dialog title="更新品牌" v-model="dialogFormVisible">
                        
                        <el-form label-position="left" >

                            <el-form-item label="所在仓库"　required>

                                <el-select v-model="updateForm.repo" placeholder="请选择">
                                    <el-option
                                        v-for="item in repos"
                                        :label="item.label"
                                        :value="item.value"
                                        :key="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="数　　量" required>

                                <el-input style="width:400px" v-model="updateForm.quantity" auto-complete="off">
                                </el-input>   
                            </el-form-item>

                            <el-form-item label="价　　格" required>

                                <el-input style="width:400px" v-model="updateForm.unitPrice" auto-complete="off"></el-input>

                            </el-form-item>
                           
                            <el-form-item label="生产批次" required>
                                <el-date-picker  v-model="updateForm.batch"  type="datetime" placeholder="生产批次">
                                </el-date-picker>
                            </el-form-item>

                            <el-form-item label="入库时间" required>
                                <el-date-picker v-model="updateForm.dealTime"  type="datetime"
                                placeholder="入库时间">
                                 </el-date-picker>
                            </el-form-item>
                        </el-form>

                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="onSubmit">确 定</el-button>
                        </div>
                    </el-dialog>            
                </template>                
            </el-col>
        </el-row>


    </div>
</template>


<script>
import { mapGetters } from 'vuex';
export default{
    data(){
      return {
        intoRepos:[],
        dialogFormVisible: false,
        updatebutton:false,
        currentPage:1,
        count:null,
        pages:null,
        brands:'',
        updateForm:{
            quantity:'',
            unitPrice:'',
            repo:'',
            sku:'',
            batch:'',
            dealTime:'',
            id:'',

        },
        select:'',
        selectBrand:'',
        repos:[],
        editRepo: null,
        editIndex: null,
        showIntoRepos:[],
      } 
    },
    created(){
        let that = this;
        let page=this.currentPage
            this.$store.dispatch('getBrands')
            this.$store.dispatch("filterIntoRepos", {
                data:page,
                fields: `
                    page,
                    limit,
                    count,
                    pages,
                    rows {
                        quantity,
                        unitPrice,
                        dealTime,
                        id,
                        batch,
                        repo {
                            id,
                            name
                        },
                        sku{
                            product{
                                name,
                                brand{
                                    name
                                }
                            },
                            goodsNo,
                            properties,
                            id
                        }
                    }`,
               filters: {   
                    deletedAt: {
                        $eq: null
                    }
               }
            }).then(res => {
                that.count = res.intoRepos.count
                that.pages = res.intoRepos.pages
                let temp = res.intoRepos.rows
                temp.forEach(function(it, index) {
                    //截取年月日
                   let temp = it.sku.properties
                    temp = temp.split(',')
                    it.sku.properties =temp
                    it.batch = it.batch.substring(0, 11)
                   
                })
                that.intoRepos = temp;
                //初始显示全部入库信息
                this.showIntoRepos = this.intoRepos
            });
    },
    computed: {
        ...mapGetters({
        datas: 'products',
        datas2:'brands'

        }),
        load(){
        let temp  =this.datas2.brands
        this.brands = temp

        return this.brands
        },
    },
    mounted(){
        var that = this;
        this.$store.dispatch("filterRepos", {
            fields: "rows {id, name}"
        }).then(res => {
            let repos = that.repos

            for (let repo of res.repos.rows) {
                repos.push({
                    label: repo.name,
                    value: repo.id
                })
            }
        })
    },
    watch:{
        // ifShow(){
        // if (this.showIntoRepos.length==0) {
        //     return this.intoRepos
        // }else{
        //     return this.showIntoRepos
        // }
        // },
        select: function(){
             if (this.select == '') {

                this.showIntoRepos = this.intoRepos
             } else {
                this.showIntoRepos = this.intoRepos.filter(it=>{

                       return it.sku.product.brand.name == this.select
                    })
             }
          
        },
    },
    methods: {
        formatter(row, column) {
            return row.address;
        },
       
        handleEdit(index,row){
            this.dialogFormVisible=true
            this.currentRow = row
            let updateForm=this.updateForm
            updateForm.quantity=row.quantity
            updateForm.unitPrice=row.unitPrice
            updateForm.repo=row.repo.id
            updateForm.sku=row.sku.id
            updateForm.id=row.id
            updateForm.batch=row.batch
            updateForm.dealTime=row.dealTime
        },
        

        handleDelete(index,row){
            var that = this

            let willDel={}
            willDel.id=row.id
            willDel.index=index
           
            this.$confirm('确认删除?')
            .then(_ => {
                that.$store.dispatch('deleteIntoRepo',{
                data:willDel,
                fields:`
                    id,
                    dealTime
                `
            }).then((res)=>{that.intoRepos.splice(index,1)})

            })
            .catch(_ => {});

        },

        onSubmit(){

            let updateForm= this.updateForm;
            let that = this;
            this.$store.dispatch('updateIntoRepo',{
                data: updateForm,
                fields: `
                    id,
                    sku{
                        id
                    },
                    batch,
                    dealTime,
                    repo{
                        id,
                        name
                    },
                    quantity,
                    unitPrice,
                `
            }).then((res)=>{
                that.dialogFormVisible = false;
                that.$message({
                    message: "入库更新成功",
                    type: "success"
                });

                // that.$set(that.repoList, that.editIndex, res.repo);
            }).then(window.location.reload("#/home/product/inrepos"));
          },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        }, 
             //搜索提示
        querySearch(queryString, cbs) {
            var brandsGroup = this.brands.rows

            brandsGroup.forEach(function(it,index,array){
                it['value']=it.name
            })
            var results = queryString ? brandsGroup.filter(this.createFilter(queryString)) : brandsGroup;
             // 调用 callback 返回建议列表的数据
            cbs(results);
        },
        createFilter(queryString) {
            return (res) => {
            return (res.value.indexOf(queryString.toLowerCase()) === 0);
            };
        },
        handleSelect(select) {
            this.select = select.value
        }, 
        handleCurrentChange(val) {
            let that = this;
            let page=val

            this.$store.dispatch("filterIntoRepos", {
                data:page,
                fields: `
                    page,
                    limit,
                    count,
                    pages,
                    rows {
                        quantity,
                        unitPrice,
                        dealTime,
                        id,
                        batch,
                        repo {
                            id,
                            name
                        },
                        sku{
                            product{
                                name,
                                brand{
                                    name,
                                }
                            },
                            properties,
                            goodsNo,
                            id
                        }
                    }`,
               filters: {   
                    deletedAt: {
                        $eq: null
                    },
                
                
               }
            }).then(res => {
                that.count = res.intoRepos.count
                that.pages = res.intoRepos.pages
            
                let temp = res.intoRepos.rows
                temp.forEach(function(it, index) {
                    //截取年月日
                   let temp = it.sku.properties
                    temp = temp.split(',')
                  
                    
                    it.sku.properties =temp
                    it.batch = it.batch.substring(0, 11)
                   
                })
                that.intoRepos = temp;
                that.showIntoRepos = that.intoRepos
            });

        },
        //显示选中品牌
        showSelect(){

             if (this.select === '') {
                this.showIntoRepos = this.intoRepos
             } else {
                this.showIntoRepos = this.intoRepos.filter(it=>{

                       return it.sku.product.brand.name == this.select
                    })
                    console.log(this.showIntoRepos)
             }
          
        },
    }
};



</script>


<style scoped>
.wrap{
overflow: auto;
}
.block{
    float: right;
    margin-top: 20px
}
.content{
  overflow: hidden;
}
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
.select{
  width: 100%;
height: 100vh;
padding: 0 10px;
background-color: #eef1f6;
}
.inline-input{
    width: 100%;
    margin-top: 50px
}
</style>