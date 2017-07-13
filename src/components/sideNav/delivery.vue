<template>
    <div class="wrap">
        <div class="left">
            <el-menu 
                default-active="1" 
                @open="handleOpen" 
                @close="handleClose"
               >                
                <el-menu-item index="1" :key="repo.name" v-for="repo in repos">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-cangku1"></use>
                    </svg>
                    <router-link style="color:#48576a" :to="{ path: '/home/delivery/booking', query: { repo: repo.id }}">
                        {{repo.name}}
                    </router-link>
                </el-menu-item>
            </el-menu>
       
    </div>
            <div class="right-side">
                <transition name="component-fade" mode="out-in">
                    <router-view></router-view>
                 </transition>
            </div>
            
        </div>
            
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            repos: []
        }
    },
    mounted() {
        let user = JSON.parse(localStorage.user);
        let that = this;
        this.$store.dispatch("getUser", {
            id: user.userId,
            fields: `
                repos {
                    id,
                    name
                }
            `
        }).then(res=> {
            that.repos = res.user.repos;
        });
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
};
</script>

<style scoped>
html,body{
    width: 100%;
    height: 100%
}
a{
color:#bfcbd9;
 text-decoration: none;
}

.left{
 width: 18%;
 position: fixed;
 top: 60px;
 bottom: 0;
background-color: #eef1f6;
}
.right-side{
  padding: 50px;
  position: relative;
  margin-left: 18%;
  height: 100%
}

.wrap{
overflow-y: auto;
 width: 100%;
 height: 100%;
 position:relative;
}
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-active {
  opacity: 0;
}
</style>
