<template>
    <div class="login" :style="winSize">
        <el-row>
            <el-col :span='24'>
                <div class="content">
                <span><h2>ERP管理系统</h2></span>
                 <el-tabs v-model="activeName" style="margin:0 auto;width:370px;height:300px" class="demo-ruleForm card-box loginform">

                    <el-tab-pane label="账号登录" name="first" >
                        <el-form label-position="left" label-width="0px" 
                                        :style=" formOffset"
                                        :rules="rule_data"
                                         ref='data'
                                        :model="data">
                                        <h3 class="title"></h3>
                                        <el-form-item
                                            prop='email'>
                                            <el-input type="text" auto-complete="off" placeholder="Email" 
                                              v-model="data.email"
                                               ></el-input>
                                        </el-form-item>
                                        <el-form-item
                                            prop='password'>
                                            <el-input type="password" auto-complete="off" placeholder="密码" 
                                                v-model="data.password"></el-input>
                                        </el-form-item>

                                        <el-form-item style="width:100%;">
                                            <el-button type="primary" class="setButton" @click='login'>登录</el-button>
                                        </el-form-item>
                                    </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="扫码登录" name="second">
                        
                        <a  @click="dingdingLog" class="btn btn-primary dingding" data-gta="{action: 'choose third party', category: dingding, segment: 'third party account'}">
                                <span class="icon1">
                                       <svg class="icon">
                                        <use xlink:href="#icon-dingding">ad</use>
                                    </svg> 
                                </span>
                               
                               
                                <span class="text">钉钉</span>
                              </a>
                    </el-tab-pane>
    
                    </el-tabs>
                
                </div>
            </el-col>
        </el-row>   
    </div>
</template>
 
<script>

export default {
    name: 'login',
    data(){
        return {
            activeName: 'first',
            winSize: {

                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: ' column',
                justifyContent: 'center'
            },

            formOffset: {
                margin: '0 auto'
            },

            data: {
                email: '',
                password: ''
            },
            rule_data: {
                username: [{
                    required: true,
                    message: '用户名不能为空！',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '密码不能为空！',
                    trigger: 'blur'
                }]
            }
        };
    },
    methods: {
        conslo(){
            console.log(this.data.email);
        },
        login(){
            console.log(this.data)
            console.log(this.password)
            this.$store.dispatch('userSignin', {
                email: this.data.email,
                password: this.data.password
            }).then( user => {
                location.href = "#/home/"
            });

        },
        dingdingLog(){
            location.href="https://oapi.dingtalk.com/connect/qrconnect?appid=dingoabj8ac9vfe1ucqg1b&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=http%3a%2f%2flocalhost%3a8080%2f%23%2fdToAuth"
        },
        components: {
           'remote-js': {
            render(createElement) {
              return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
            },
            props: {
              src: { type: String, required: true },
            },
            },
        },

    }
};
</script>


<style scoped lang='less'>
    .login{
       background: rgba(56,157,170,.82);

        .card-box {
            box-shadow: 0 0px 8px 0 #ccc, 0 1px 0px 0 #ccc;
            -webkit-border-radius: 5px;
            border-radius: 5px;
            -moz-border-radius: 5px;
            background-clip: padding-box;
            margin-bottom: 20px;
            background-color: #F9FAFC;
            
        }

        .title {
            margin: 0px auto 20px auto;
            text-align: center;
            color: #505458;
        }

         .loginform {
            width: 350px;
            padding: 25px 35px 15px 35px;
        } 
    }
    .setButton{
        width: 100%;
        height: 32px;
        border-radius: 5px;
        box-shadow: none;
        outline: none;
        border:none;
        background-color: #00d1b2;
        color: #fff;
        cursor: pointer;
    }
    span{
        width: 100%;
        display: inline-block;
        text-align: center;
    }
    .dingding:hover {
    background-color: #38adff;
}
.icon1{
    transition: all 218ms;
    font-size: 24px;
    color: #38adff;

    left: 45%;
    margin-top: 20%

}
.dingding:hover .icon1{
      margin-top: 35%;
      color: #fff
}
.btn {
    border-radius: 3px;
    border: 1px solid;
    color: #38adff;
    width: 96px;
    height: 96px;
    font-size: 14px;
    margin-right: 20px;
    margin-bottom: 45px;
    display: inline-block;
}
.content > span{
    display: inline-block;
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
}
h2{
    font-family: "LiSong Pro Light";
    font-weight: 400;
    color: #ddd
}
</style>

