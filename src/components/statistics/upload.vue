<template>

    <div class="branwrap">
        <div class="tabs">
            <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>基础配置</el-breadcrumb-item>
            <el-breadcrumb-item>品牌管理</el-breadcrumb-item>
            <el-breadcrumb-item>创建品牌</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-tag style="margin-bottom:20px">品牌名</el-tag>
        <el-form class="settings" :model="ruleForm2" :rules="rules2" ref="ruleForm2" >
            <el-row>
               <el-form-item label="品牌名称" prop="brand" :label-width="labewidth" >
                    <el-input v-model="ruleForm2.brand" style="width:70%"></el-input>
                </el-form-item>
            </el-row> 
        </el-form>
          
        <el-form :model="upload.form" ref="upload.form" :rules="rules2">
            <el-tag style="margin-bottom:20px">配置项</el-tag> 
            <el-form-item class="settings" :label-width="labewidth" label="品牌口号" prop="slogan" >
                <el-input v-model="upload.form.slogan" style="width:70%"></el-input>
            </el-form-item>  
            <el-form-item  class="settings" :label-width="labewidth" label="官方网站" prop="website" >
                <el-input v-model="upload.form.website" style="width:70%"></el-input>
            </el-form-item>

            <el-form-item class="settings" :label-width="labewidth" label="目标客户" prop="targetA" >
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="upload.form.targetA" style="width:70%">
                </el-input>

            </el-form-item>
            <el-form-item class="settings" :label-width="labewidth" label="市场定位" prop="position" >
                <el-input type="textarea"  :rows="2" placeholder="请输入内容" v-model="upload.form.position" style="width:70%"></el-input>
            </el-form-item>
            <el-form-item class="settings" :label-width="labewidth" label="产品特征" prop="characteristic" >
                <el-input   type="textarea"  :rows="2" placeholder="请输入内容" v-model="upload.form.characteristic" style="width:70%"></el-input>
            </el-form-item>
            <el-form-item class="settings":label-width="labewidth" label="竞争对手" prop="competitor" >
                <el-input type="textarea"  :rows="2" placeholder="请输入内容" v-model="upload.form.competitor" style="width:70%"></el-input>
            </el-form-item>

        </el-form>
        <template>
          
               <el-row  :span="20" class="settings" >
                   
                   <el-col :span="3">授权书</el-col>
                       <el-col :span="16"> 
                           <el-upload action="http://localhost:8000/graphql?query=mutation%7B%0A%20%20upload%7B%0A%20%20%20%20fieldname%2C%0A%20%20%20%20object%0A%20%20%7D%0A%7D%0A" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"  :file-list="upload.imgList.attorney" :on-change="attorney">
                              <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog v-model="upload.imgdialogVisible" size="tiny">
                              <img width="100%" :src="upload.dialogImageUrl" alt>
                            </el-dialog>
                     </el-col> 
               </el-row>

               <el-row :span="20" class="settings" >
                   
                   <el-col :span="3">LOGO</el-col>
                       <el-col :span="16"> 
                           <el-upload action="http://localhost:8000/graphql?query=mutation%7B%0A%20%20upload%7B%0A%20%20%20%20fieldname%2C%0A%20%20%20%20object%0A%20%20%7D%0A%7D%0A" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"  :file-list="upload.imgList.logo" :on-change="logo">
                              <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog v-model="upload.imgdialogVisible" size="tiny">
                              <img width="100%" :src="upload.dialogImageUrl" alt>
                            </el-dialog>
                     </el-col> 
               </el-row>


               <el-row :span="20" class="settings">
                   
                   <el-col :span="3">品牌故事</el-col>
                       <el-col :span="16"> 
                           <el-upload action="http://localhost:8000/graphql?query=mutation%7B%0A%20%20upload%7B%0A%20%20%20%20fieldname%2C%0A%20%20%20%20object%0A%20%20%7D%0A%7D%0A" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"  :file-list="upload.imgList.brandStory" :on-change="brandStory">
                              <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog v-model="upload.imgdialogVisible" size="tiny">
                              <img width="100%" :src="upload.dialogImageUrl" alt>
                            </el-dialog>
                     </el-col> 
               </el-row>

               <el-row :span="20" class="settings">
                   
                   <el-col :span="3">品牌荣誉</el-col>
                       <el-col :span="20"> 
                           <el-upload :multiple="true" action="http://localhost:8000/graphql?query=mutation%7B%0A%20%20upload%7B%0A%20%20%20%20fieldname%2C%0A%20%20%20%20object%0A%20%20%7D%0A%7D%0A" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"  :file-list="upload.imgList.brandHonor" :on-change="brandHonor">
                              <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog v-model="upload.imgdialogVisible" size="tiny">
                              <img width="100%" :src="upload.dialogImageUrl" alt>
                            </el-dialog>
                     </el-col> 
               </el-row>

               <el-row :span="20" class="settings">
                   
                   <el-col :span="3">海外销售图片</el-col>
                       <el-col :span="20"> 
                           <el-upload action="http://localhost:8000/graphql?query=mutation%7B%0A%20%20upload%7B%0A%20%20%20%20fieldname%2C%0A%20%20%20%20object%0A%20%20%7D%0A%7D%0A" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"  :file-list="upload.imgList.abroad" :on-change="abroad">
                              <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog v-model="upload.imgdialogVisible" size="tiny">
                              <img width="100%" :src="upload.dialogImageUrl" alt>
                            </el-dialog>
                     </el-col> 
               </el-row>
          </template> 
    
        <div class="submit">
                <el-button type="primary" @click="createBrand('ruleForm2',ruleForm2)">更新</el-button>
        </div>
    </div>
        
</template>

<script>
import { mapGetters } from 'vuex';

export default {

    data() {
        var checkName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('品牌名称不能为空'));
            }
            setTimeout(() => {
                    callback()
                },
                10
            )
        };
        var checkWebsite = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('官网地址不能为空'));
            }
            setTimeout(() => {
                    callback()
                },
                10
            )
        };
        var checkSlogan = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('Slogan不能为空'));
            }
            setTimeout(() => {
                    callback()
                },
                10
            )
        };
        var checkTA = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('目标客户不能为空'));
            }
            setTimeout(() => {
                    callback()
                },
                10
            )
        };
        var checkPosition = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('市场定位不能为空'));
            }
            setTimeout(() => {
                    callback()
                },
                10
            )
        };
        var checkTz = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('产品特征不能为空'));
            }
            setTimeout(() => {
                    callback()
                },
                10
            )
        };
        return {

            ruleForm2: {
                brand: '',
                id:'',
            },
            dialogVisible: false,
            fullscreenLoading: false,
            labewidth: "80px",
            rules2: {
                brand: [{
                    required: true,
                    validator: checkName,
                    trigger: 'blur'
                }],
                website: [{
                    required: true,
                    validator: checkWebsite,
                    trigger: 'blur'
                }],
                slogan: [{
                    required: true,
                    validator: checkSlogan,
                    trigger: 'blur'
                }],
                targetA: [{
                    required: true,
                    validator: checkTA,
                    trigger: 'blur'
                }],
                position: [{
                    required: true,
                    validator: checkPosition,
                    trigger: 'blur'
                }],
                characteristic: [{
                    required: true,
                    validator: checkTz,
                    trigger: 'blur'
                }]

            },
            additional:[],
            upload: {
                fileList: [],
                dialogImageUrl: '',
                imgdialogVisible: false,
                imgUrl: [],
                form: {
                    website: '',
                    slogan: '',
                    position: '',
                    targetA: '',
                    characteristic: '',
                    competitor: '',

                },
                onlineImg:[],
                imgList:{

                    logo:[],
                    attorney:[],
                    brandStory:[],
                    brandHonor:[],
                    abroad:[]
                }
            },

        };
    },
    created(){
       this.load()
        
    },    

    methods: {

        load(){
          
            if(this.$store.state.toUpdateBrand){
                let data = this.$store.state.toUpdateBrand
                this.ruleForm2.brand = data.name
                this.ruleForm2.id = data.id   
                let additional = JSON.parse(data.additional) 
                this.additional = data.additional
                this.imgLogic(additional)
                this.textLogic(additional)
                
            }else{
                let url = window.location.hash
                let brandId = url.match(/\?id=(\d+)/)[1]
                this.$store.dispatch('getBrand',{brandId}).then(res=>{
                    let data = res.brand
                    this.ruleForm2.brand = data.name
                    this.ruleForm2.id = data.id   
                    let additional = JSON.parse(data.additional) 
                    this.additional = data.additional
                    this.imgLogic(additional)
                    this.textLogic(additional)
                })
                
            }
            
        },

        createBrand(formName, ruleForm2) {
                let textArr = this.objToArr(this.upload.form)
                let imgArr = this.formatObj(this.upload.imgUrl)
                this.additional = JSON.parse(this.additional) 
                let onlineImg =  this.additional.filter(it => it.type == "img")
              
                imgArr = imgArr.concat(onlineImg)
                let additional = []
                additional = additional.concat(textArr, imgArr)
                console.log(additional)

                additional = JSON.stringify(additional)
                additional = additional.replace(/"/g, "\\\"")
                this.$refs[formName].validate((valid) => {
                    let that = this
                    if (valid) {
                        let newbrand = ruleForm2;

                        newbrand.additional = additional
                        console.log(newbrand)
                        this.$store.dispatch('updateBrand', {
                            newbrand
                        }).then(res => {
                            console.log(res)
                                that.$message({
                                    message: "订单创建成功",
                                    type: "success"
                                })
                            }

                        ).then(location.href = "#/home/center/brand")
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleCurrentChange(val) {
                this.currentRow = val;
                this.store.dispatch('');
            },
            openFullScreen() {

                this.fullscreenLoading = true;
                setTimeout(() => {
                    this.fullscreenLoading = false;
                }, 3000);
            },
            //上传 组件
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },

            handlePictureCardPreview(file) {
                this.upload.dialogImageUrl = file.url;
                this.upload.imgdialogVisible = true;
            },
            //授权书
            attorney(file) {

                let name = "attorney"
                this.pushTheFiles(file, name)
            },
            //logo
            logo(file) {

                let name = "logo"
                this.pushTheFiles(file, name)
            },

            brandStory(file) {

                let name = "story"
                this.pushTheFiles(file, name)
            },
            brandHonor(file) {

                let name = "honor"
                this.pushTheFiles(file, name)
            },
            abroad(file) {
                let name = "abroadSail"
                this.pushTheFiles(file, name)
            },

            //放入file集合中
            pushTheFiles(file, filename) {
                let imgData = file.response
                if (imgData) {
                    imgData.fileName = filename
                    this.upload.imgUrl.push(imgData)
                }
            },
            objToArr(obj) {
                let textarr = []
                for (var i in obj) {
                    let o = {}
                    obj[i] = obj[i].replace(/\s+/g,"");
                    o[`${i}`] = obj[i]
                    o['type'] = "text"
                    textarr.push(o)
                }
                return textarr
            },
            formatObj(arr) {
                arr.forEach(it => {
                    it.object = it.data.upload[0]

                })
                let imgArr = []
                for (var i = 0; i < arr.length; i++) {
                    imgArr[i] = {}
                    imgArr[i].object = arr[i].object
                    imgArr[i].fileName = arr[i].fileName
                    imgArr[i].type = "img"
                }
                return imgArr
            },

            submit() {

                let textArr = this.objToArr(this.upload.form)
                let imgArr = this.formatObj(this.upload.imgUrl)
                let additional = []
                additional = additional.concat(textArr, imgArr)
                
            },
            textLogic(data){
                let textForm =  data.filter(it=>it.type=="text")
        
                let keys =  textForm.map(it =>
                        Object.keys(it)[0]
                        )
                let values =  textForm.map(it =>
                        Object.values(it)[0]
                        )
                for (var i = 0;i<keys.length;i++)  {
                    this.upload.form[`${keys[i]}`]=values[i]
                }   
            },
            
            imgLogic(data){
                let imgGroup =  data.filter(it => it.type == "img")
                //将线上图片存入本地
                this.upload.onlineImg = imgGroup
                // console.log( this.upload.onlineImg)
                //处理线上图片用于展示
                for (let i = 0; i < imgGroup.length; i++) {
                    if (imgGroup[i].fileName === "attorney") {
                        this.upload.imgList.attorney.push(imgGroup[i])
                    } else if (imgGroup[i].fileName === "logo") {
                        this.upload.imgList.logo.push(imgGroup[i])
                    } else if (imgGroup[i].fileName === "story") {
                        this.upload.imgList.brandStory.push(imgGroup[i])
                    } else if (imgGroup[i].fileName === "honor") {
                        this.upload.imgList.brandHonor.push(imgGroup[i])
                    } else {
                        this.upload.imgList.abroad.push(imgGroup[i])
                    }
                }
                let imgList = this.upload.imgList
                for (var i in imgList){
                  
                    let uriObjects= imgList[i].map(it=>it.object)
                    this.upload.imgList[i] = uriObjects
                    

                    for (let i= 0;i < uriObjects.length; i++){
                        let uriObject = uriObjects[i]
                        this.$store.dispatch('urlAuthorization',{uriObject}).then(res=>{
                            uriObject.url=res.urlAuthorization.uri
                            
                        })
                    }                    
                    
                }



            }
    }
};
</script>


<style scoped>
.branwrap{
     position: relative;
     width: 100%;
     margin-bottom: 100px
    }
.submit{
 float: right;
   margin-right: 100px;
    margin-bottom: 200px
}
.tias{
    position: absolute;
    right: 0;
    top: 100px
}
.settings{

    margin-bottom:20px;
     border-bottom:1px dotted #ccc;
     width: 95%;
     padding: 10px;
}
</style>