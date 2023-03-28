<template>
  <div style="text-align: center;height: 80vh;display: flex;align-items: center;justify-content: center;">
    <form @submit.prevent="createPost" style="width: 100%;">
      <div style="margin-bottom: 10px;">
        <label for="title" >Title</label>
        <input style="margin-left: 15px; width: 30%;" type="text" id="title" v-model="title" required>
      </div>
      <div style="display: flex;align-items: center;justify-content: center; margin-bottom: 10px;">
        <label style="margin-right: 5px;" for="content">Content</label>
        <textarea style="margin-right: 8px; width: 30%;" id="content" v-model="content" required></textarea>
      </div>
      <div style="text-align: center;">
        <button style="width: 10%; height:30px" type="submit" :disabled="!isAuthenticated">Create Post</button>
        <p v-if="!isAuthenticated" style="margin-right: 5px; color: red;">User Not Authenticated</p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      content: ''
    };
  },
  computed: {
    isAuthenticated() {
      const item = localStorage.getItem('authenticatedUser');
      if(item){
        return true
      }else{
        return false
      }

      
    }
  },
  methods: {
    createPost() {
      let post = {
        title: this.title,
        content: this.content,
        user: JSON.parse(localStorage.getItem('authenticatedUser')),
        comments:[],
        commentsIntake:"",
        id:0
      };
      this.$store.dispatch('createPost', post);
      let posts=[]
      if(localStorage.getItem('posts')){
        posts = JSON.parse(localStorage.getItem('posts'))
        post.id=posts[posts.length - 1].id+1
      }else{
        post.id = 1
      }
      posts.push(post)
      localStorage.setItem("posts", JSON.stringify(posts));

      this.title = '';
      this.content = '';
      this.$router.push('/posts')
    }
  }
};
</script>
