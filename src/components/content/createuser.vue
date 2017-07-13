 <template>
    <div class="userwrap">
       
    <div>
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">

            <el-form-item label="昵称" prop="displayName">
                <el-input type="displayName" v-model="ruleForm2.displayName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input type="email" v-model="ruleForm2.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
                </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
            </el-form-item>
           
            
             <el-form-item label="权限">
                <el-radio class="radio" v-model="ruleForm2.isSuper" label="true">管理员</el-radio>
                <el-radio class="radio" v-model="ruleForm2.isSuper" label="false">普通</el-radio>
            </el-form-item>
            <el-form-item label="绑定钉钉" prop="dtUserId">
              <el-select v-model="ruleForm2.dtUserId" placeholder="请选择钉钉用户">
                <el-option :key="item.userid" v-for="item in staffs" :label="item.name" :value="item.userid"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
            <div class="selectWrap">
                <el-button type="primary" @click="submitForm('ruleForm2',ruleForm2)">注册</el-button>
            </div>

            </el-form-item>
      </el-form>

    </div>
   

  </div>
</template>

<script>

import {
	mapActions
} from 'vuex';
export default {
    data() {
        var checkEmail = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('邮箱不能为空'));
            }
            setTimeout(() => {
                var reEmail = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
                if (!reEmail.test(value)) {
                    callback(new Error('请输入正确的邮箱'));
                } else {

                    callback();
                }
            }, 100);
        };

        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm2.checkPass !== '') {
                    this.$refs.ruleForm2.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if ((value.toString()).length < 8) {
                callback(new Error('密码长度不能小于8位'));
            } else if (value !== this.ruleForm2.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        var displayName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入昵称'));
            } else {
                callback();
            }
        };
        var dtUserId = (rule,value,callback) => {
            if (value === '') {
                callback(new Error('请绑定钉钉'))
            } else {
                callback()
            }
        }
       
        return {
            ruleForm2: {
                email: '',
                password: '',
                checkPass: '',
                displayName: '',
                isSuper:'true',
                dtUserId:''

            },
            rules2: {
                password: [{
                    validator: validatePass,
                    trigger: 'blur',
                    required: true,
                }],
                displayName: [{
                    validator: displayName,
                    trigger: 'blur',
                    required: true,
                }],
                checkPass: [{
                    validator: validatePass2,
                    trigger: 'blur',
                    required: true,
                }],
                email: [{
                    validator: checkEmail,
                    trigger: 'blur',
                    required: true,
                }],
                dtUserId: [{
                    validator: dtUserId,
                    trigger: 'blur',
                    required: true,
                }],
            },
            staffs:[]
        };
    },
    created(){
        this.$store.dispatch('getDsataffs').then(res=>{
            this.staffs=res.staff
          })
    },
    methods: {
        submitForm(formName, ruleForm2) {
            let that = this 
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let userMessage = ruleForm2;
                    console.log(userMessage)
                    this.$store.dispatch('createUser', {
                        userMessage
                    }).then(res => {
                         that.$message({
                            message: "用户创建成功成功",
                            type: "success"
                        })
                        location.href = "#/home/workplat/allusers"
                    })
                } else {
                    alert('不能为空');
                    return false;
                }
            });

        }
			
    }
};
</script>


<style >
.demo-ruleForm{
	width: 60%;
	margin: 20px 
}
.tabs{
	color:#333;
	position: fixed;
	right: 75px;
	clear: both;
    top:65px;
    z-index:-1;
	margin-top:5px;
}
.selectWrap{
    float: right; 
}
</style>