<template>
    <div class="wrap" v-if="datas!=''">
        <div class="tabs">
            <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品入仓</el-breadcrumb-item>
            <el-breadcrumb-item>创建商品</el-breadcrumb-item></el-breadcrumb>
        </div>
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="" class="demo-ruleForm">
            <el-form-item label="创建商品" prop="prdname" label-width="100px" :rules="[
        { required: true, message: '商品名称不能为空'},
        
        ]">
                <el-input v-model="ruleForm2.prdname" class="inpwrap"></el-input>
            </el-form-item>

            <div class="brandwrap" >
            <el-form-item label="选择品牌" label-width="100px" prop="brd" >
                <el-select v-model="ruleForm2.brd" filterable placeholder="选择品牌" >
                    <el-option :key="item.id" v-for="item in datas.brands.rows" :label="item.name" :value="item.id"></el-option>
                </el-select>
                </el-form-item>
            </div>

          <!--   <div class="catorywrap" v-if="datas2!=''">
                <el-form-item label="选择分类" label-width="100px" prop="cat"  :rules="[
                { required: true, message: '分类名称不能为空'},
                
                ]">
                    <el-select v-model="ruleForm2.cat" filterable placeholder="选择分类">
                        <el-option :key="item.id" v-for="item in datas2.categories.rows" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    </el-form-item>
            </div> -->
            <template>
             <el-form-item label="选择分类" label-width="100px">
                
<!--                 <el-cascader :options="categoryOptions.options2" @active-item-change="handleItemChange" :props="categoryOptions.props" v-model="categoryOptions.select" @change="handleChange"></el-cascader> -->
            
                <el-select v-model="options.parentId" filterable placeholder="一级类目"  @change="searchChild">
                        <el-option :key="item.id" v-for="item in datas2.categories" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <el-select v-model="ruleForm2.cat" filterable placeholder="二级类目">
                        <el-option :key="item.id" v-for="item in options.children" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            </template>

            <el-form-item class="buton">
                <el-button type="primary" @click="createPrd('ruleForm2',ruleForm2)">提交
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {

    data() {
        var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('商品名称不能为空'));
            }
            setTimeout(() => {
        
                callback();
          
            }, 10);
        };

        return {
            ruleForm2: {
                prdname: '',
                brd: '',
                cat: ''
            },    
            options:{
                parentId:null,
                childrenId:null,
                children:[]
            }, 
            rules2: {
                brand: [{
                    validator: checkAge,
                    trigger: 'blur'
                }]
            },
            // categoryOptions:{
            //     options2: [],
            //     props: {
            //         value: 'optinIndex',
            //         children: 'children'
            //     },
            //     select:[]
            // }
        }
    },
    computed: mapGetters({
        datas: 'brands',
        datas2:'categories'

    }),
    
    created(){
        this.$store.dispatch('getBrands'),
        this.$store.dispatch('getCategories')
        
        // .then(res=>{
        //     this.categoryOptions.options2 = this.formatOptions(res.categories)
        //     // this.categoryOptions.options2.forEach(it => it.children=[])
        //     // console.log(this.categoryOptions.options2)
        // })
    },

    methods: {
        createPrd(formName,ruleForm2) {
            this.$refs[formName].validate((valid) => {
                var that =this
                if (valid) {
                    let productForm = ruleForm2;

                    this.$store.dispatch('createProduct',{productForm}).then(()=>{
                         
                             that.$message({
                                    message: "商品创建成功",
                                    type: "success"
                                }) 
                    })
                    .then(window.location.href=("#/home/product/products"))
                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        searchChild(){
            if (this.options.parentId) {
            let parentId =  this.options.parentId
            this.$store.dispatch('getSubCategories',{ parentId }).then(
                    res=>{
                       
                        this.options.children
                            = 
                        res.subCategories
                        console.log(this.options.children)
                    }
                )
            }
        },
        formatOptions(initiaObj){
            let temp =[]
            for (let i = 0 ;i <initiaObj.length;i++){
                temp[i]={}
                temp[i].label=initiaObj[i].name
                temp[i].optinIndex = `${i}`
                temp[i].id = initiaObj[i].id
         }
            return temp
        },

        selectBrand(index, datas) {
            let target = datas.brands.rows[index];
            this.ruleForm2.brd = target.id;
            let temp = this.ruleForm2.brd;

        },
        // selectCat(index,datas2){
        //     let target = datas2.categories.rows[index];
        //     this.ruleForm2.cat = target.id;
        //     let temp = this.ruleForm2.cat;
        // },
        handleCurrentChange(val) {
            this.currentRow = val;
            this.store.dispatch('');
        },
    //     handleItemChange(val) {

    //         if (!this.categoryOptions.options2[val].children.length && val.length!==0){

    //             let parentId = this.categoryOptions.options2[val].id
    //                 this.$store.dispatch('getSubCategories',{ parentId }).then(
    //                 res=>{
                       
    //                     this.categoryOptions.options2[val].children 
    //                         = 
    //                     this.formatOptions(res.subCategories)

    //                 }
    //             )


    //      }
   
    // },
        // handleChange(value){
        //     let index1 = value[0]
        //     let index2 = value[1]
        //     var select = []

        //     let parentId = this.categoryOptions.options2[value1].id
        //     select[0] = parentId


        // }
}
};
</script>


<style scoped>

.wrap{
    width: 80%;
}

.select{
  font-size: 14px;
  color: #48576a;
  padding: 11px 12px 11px 0;
}
.buton{
  float: right;
 
}

.brandwrap{
    margin-bottom: 20px;

}

.demo-ruleForm{
    width: 85%
}

</style>