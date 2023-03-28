<template>
  <div>
    <div v-if="userPosts.length===0 && userAuthenticated">
      <h1 style="text-align: center;">No Posts Yet</h1>
    </div>
    <div v-if="userPosts.length===0 && !userAuthenticated">
      <h1 style="text-align: center;">User Not Authenticated</h1>
    </div>
    <div class="border" v-for="post,index in userPosts" :key="index">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
      <div class="comments" >
        Comments:
        <div style="margin-left: 30px;" class="comment" v-for="comment,index in post.comments" :key="index">
          <div class="comment-text">{{ comment }}</div>
        </div>
      </div>
      <div style="margin-left: 40px;">
        <input v-model="post.commentsIntake" class="custom-input"/>
        <button @click="addComment(post)" class="custom-button">Comment</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "IndexPage",
  data() {
    return {
      top_metrics: {},
      postsData:[],
      comment:"",
      userId:"",
      userPosts:[],
      userAuthenticated:false,
    };
  },
  methods: {
    addComment(post){
      this.postsData[post.id-1].comments.push(post.commentsIntake)  
      post.commentsIntake=""    

      localStorage.setItem("posts", JSON.stringify(this.postsData));
      let userId=JSON.parse(localStorage.getItem('authenticatedUser')).id
      this.filterPostsData(userId)
    },
    filterPostsData(id){
      if(this.postsData){
        
        var newArray = this.postsData.filter(function (el) {
        return el.user.id === id 
        });
        this.userPosts = newArray
      }else{
        this.userPosts =[]
      }
    }
  },
  
  created() {
   this.postsData = JSON.parse(localStorage.getItem('posts'));
   if(localStorage.getItem('authenticatedUser')){
     this.userId =  JSON.parse(localStorage.getItem('authenticatedUser')).id;
     this.userAuthenticated = true
   }
   this.filterPostsData(this.userId)
   
    
    
  },
};
</script>
<style>
  .border {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    margin:20px
  }

  h2 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 24px;
    color: #333;
  }

  p {
    margin: 0;
    font-size: 16px;
    color: #555;
    line-height: 1.5;
  }

  .comments {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }

  .comment {
    margin-top: 10px;
    font-size: 14px;
    color: #666;
  }

  .comment-text {
    color: #999;
    margin-left: 10px;
  }
  .custom-input{
    border: 2px solid #999;
    border-radius: 5px;
    height:20px;
    width:30%;
  }
  .custom-button{
    margin-left: 10px;
    border: 2px solid #999;
    border-radius: 5px;
    height:27px;
  }
</style>