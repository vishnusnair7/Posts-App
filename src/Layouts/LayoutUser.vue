<template>
  <div>
    <div class="navStyle" style="	background-color: rgb(153 27 27);color: white;">
        <span class="custom-text">My Posts</span>
        <nav>
          <a class="custom-text-btn " @click="$router.push('/posts')" style="margin-right: 10px; cursor: pointer;">Home</a>
          <a class="custom-text-btn" @click="$router.push('/createpost')" style="cursor: pointer;">Create Post</a>
          <a class="custom-text-btn" style="cursor: pointer;" @click="logout">Logout</a>
        </nav>
    </div>
    <main>
     <router-view></router-view>  
    </main> 
   </div>
</template>

<script>
export default {
name: 'MainLayout',
methods:{
  logout() {
      this.$store.commit('setAuthenticatedUser', null);  
      localStorage.removeItem('authenticatedUser');
      this.$router.push('/')
    }
}
};
</script>
<style>
.navStyle{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:10px;
    font-size: large;
}
.custom-text{
  font-size: 40px;
}
.custom-text-btn{
  font-size: 25px;
  margin-inline: 10px;
  border: 1px solid white;
  border-radius: 10px;
  padding: 5px;
  padding-inline: 10px;
}

</style>