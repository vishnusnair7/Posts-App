<template>
  <div style="height: 100vh; display: flex; justify-content: center;align-items: center; background-color: rgb(153 27 27);color: white;">
    <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
        <div>
            <p style="margin-right: 10px; color: white;font-size: 20px;">Email Address or User ID</p>
            <input style="margin-top: 10px; height: 30px; width: 100%;"  type="text" v-model="emailOrUserId" />
            <p v-if="error" style="color: yellow;">emal or username dosenot exist</p>
        </div> 
        <button style="margin-top: 10px; height: 30px; width: 70px;" @click="login">Log In</button>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';

export default {
data() {
    return {
    emailOrUserId: "",
    error:false,
    };
},
methods: {
    async login() {
    if (!this.emailOrUserId) {
        
        return;
    }

    let user;
    const userArray = await axios.get('https://jsonplaceholder.typicode.com/users')
    userArray.data.map((val)=>{
        if (val.email===this.emailOrUserId || val.username===this.emailOrUserId ){
            user= val
        }
    })
    if (user) {
        this.$store.dispatch("login", user);
        localStorage.setItem("authenticatedUser", JSON.stringify(user));
        this.$router.push('/posts')
    } else {
        this.error=true
    }
    },
},
};
</script>
  