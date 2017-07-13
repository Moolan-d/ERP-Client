<template>
    <div class="skuwrap">

        <!-- <el-button class="back" size="mini"><a href="#/home/product/products">返回</a></el-button> -->

        <div class="tabs">
            <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品入仓</el-breadcrumb-item>
            <el-breadcrumb-item>添加SKU</el-breadcrumb-item></el-breadcrumb>
        </div>



        <el-form 
        :model="skuForm" 
        ref="skuForm" 
        label-width="100px" 
        class="demo-dynamic">

            <el-form-item 
            prop="prdMessage.prdname" 
            label="商　　　品">
                <el-input  :disabled="true" v-model="skuForm.prdMessage.prdname"></el-input>
            </el-form-item>


<!-- 属性 -->            
            <el-form-item 
            label="属　　　性"
         
           >
                <el-form :inline="true" >
                    <el-form-item label="" :key="item" v-for="item in skuForm.domains.properties">
                        <el-input style="width: 100%" v-model="item.key"    class="prdSkuform"    :prop="item.key "  placeholder="属性" :required="true"></el-input>
                      
                    </el-form-item>
                    <el-form-item>
                        <el-button  size="mini" @click="addDomain">+</el-button>
                    </el-form-item>
                </el-form>    
        
                
           
         

           

            </el-form-item>
            <el-form-item label="单　　　位">
                <el-input  v-model="skuForm.domains.unit"    class="prdSkuform"    :prop="skuForm.domains.unit"  placeholder="单位"></el-input>
            </el-form-item>

            <template>
            <el-form :model="additional" label-width="100px">
                <el-form-item label="保　质　期"  >
                    <el-input v-model="additional.shelfLife"></el-input>
                </el-form-item>
                <el-form-item label="备货　时长"  >
                    <el-input v-model="additional.stockTime"></el-input>
                </el-form-item>            
                <el-form-item label="运输　时长"  >
                    <el-input v-model="additional.transportTime"></el-input>
                </el-form-item>            
                  
                <el-form-item label="包装　翻译"  >
                    <el-input v-model="additional.PackTranslate"></el-input>
                </el-form-item>                
            </el-form>

                <template>
                    
                    <el-row  :span="20" class="settings" >
                       
                        <el-col :span="3"><span class="title_des">产品　图片</span></el-col>
                           <el-col :span="16"> 
                               <el-upload  :multiple="true" action="http://localhost:8000/graphql?query=mutation%7B%0A%20%20upload%7B%0A%20%20%20%20fieldname%2C%0A%20%20%20%20object%0A%20%20%7D%0A%7D%0A" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"  :file-list="skuImg.fileList" :on-change="prdImg">
                                  <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog v-model="skuImg.imgdialogVisible" size="tiny">
                                  <img width="100%" :src="skuImg.dialogImageUrl" alt>
                                </el-dialog>
                         </el-col> 
                   </el-row>

                </template>
      
            </template>
            <el-button type="primary" :disabled='false'
             @click="

              createSku('skuForm',skuForm)" class="submit">保存</el-button>

<!--    <el-button type="primary" :disabled='false'
             @click="additionalMsg" class="submit">保存</el-button> -->

        </el-form>
       
    </div>
</template>


<script>
import { mapGetters } from 'vuex';
export default{
     data() {
        return {
            skuForm: {
                domains: {
                    properties: [{key:""}],
                    price:0,
                    unit:''
                    
                },
                prdMessage:{
                    prdname:"",
                    prdID:''
                }
                
            },
            additional:{
                shelfLife:"",
                stockTime:"",
                transportTime:"",
                PackTranslate:""

            },
            skuImg:{
                dialogImageUrl:"",
                fileList:[],
                imgdialogVisible: false,
                imgUrl:[]

            }
        }
    },


    created() {
        var id=this.$store.state.sku.prdMessage.id
        var name=this.$store.state.sku.prdMessage.name
        this.skuForm.prdMessage.prdname=name
        this.skuForm.prdMessage.prdID=id

    },
    mounted(){
       

    },
    methods: {
       

        createSku(formName,skuForm) {
            let additional = this.additionalMsg()
            additional = JSON.stringify(additional)
            additional = additional.replace(/"/g,"\\\"")

            this.$refs[formName].validate((valid) => {
                let that=this
                if (valid) {
                    skuForm.domains["product"]=this.skuForm.prdMessage.prdID

                    let propArr=skuForm.domains.properties
                    var properStr=''
                    var temp =[]
                    propArr.forEach(function(it,index){
                       if (it["key"]) {
                        temp.push(it["key"])
                        properStr = temp.join(',')
                       }
                        
                        
                    })
                    skuForm.domains['properStr']=properStr
                    let skuforms=skuForm.domains
                    skuforms.additional = additional
                    //TODO
                    if (skuforms.properties==="") {
                        this.$message.error('不能为空')
                    } 
                    else {
                        this.$store.dispatch('createSku', { skuforms })
                        .then(
                            window.location.href="#/home/product/products"
                            )
                     
                    }
                } 
                else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        addDomain() {
            this.skuForm.domains.properties.push({
            key: ''
        });
      },
        handlePictureCardPreview(){

          },
        handleRemove(){

          },
        prdImg(file){
            let name = "prdImg"
            let imgData = file.response
            if (imgData) {
            imgData.fileName = name 
            this.skuImg.imgUrl.push(imgData)
        } 
          },
        additionalMsg(){
            let additionalMsg = []
            let textMsg = this.objToArr(this.additional)
            let imgUrl = this.formatObj(this.skuImg.imgUrl)
            additionalMsg = additionalMsg.concat(textMsg, imgUrl)
            return additionalMsg
          },
        objToArr(obj){
            let textarr = []
            for (var i in obj){
                let o ={}
                //去除字符串的空格
                obj[i] = obj[i].replace(/\s+/g,"");
                o[`${i}`]= obj[i]
                o['type']= "text"
                textarr.push(o)
            }
            return textarr
        },
        formatObj(arr){
            arr.forEach(it=>{
               it.object= it.data.upload[0]
            
            })
            let imgArr= []
            for (var i = 0;i<arr.length;i++){
                imgArr[i] = {}
                imgArr[i].object = arr[i].object
                imgArr[i].fileName = arr[i].fileName
                imgArr[i].type = "img"
            }
            return imgArr
        },        


}}
function ObjtoString(obj) {
            let propArr=[]
            for ( var i in obj){
            propArr.push(obj[i])

            }
            return propArr.join(',')
    }

 

</script>

<style scoped>
  .back{
position: fixed;
top: 70px;
float: left;
}   
  .skuwrap{
  
    height: 100vh;
    width: 80%;
    overflow:hidden;
    margin-bottom: 100px
  }
  .prdSkuform{
    float: left;
    width: 100%;
    margin: 5px 0
  }
  .submit{
    float: right;
  }
  .demo-dynamic{

  }
  .el-form-item__content{
    width: 100%
  }
  .title_des{
    display: inline-block;
    text-align: center;
    width: 100%
  }
</style>