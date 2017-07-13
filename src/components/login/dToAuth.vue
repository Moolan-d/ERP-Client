<template>
    <div class="redirect">
        <h2>您已登录</h2>
    </div>
</template>

<script>
    export default {

        created(){
            this.redirect()
        },
        methods:{
            redirect(){
                setTimeout(function toHome() {
                    location.href="#/home"
                },1000)
            }
        }
    }
</script>

<style scoped>
    
</style>