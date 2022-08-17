<template>
  
</template>

<script>
  export default {
    name: 'LikeComp',
    data() {
      return {
        likes: 0,
        dislikes: 0,
        
    };
    },
  

    
    methods: {
      likeIt(id) {
      this.likes++;
      //console.log(postId);
      //console.log(this.$store.state.posts);
      //console.log(this.$store.state.posts.id);
      //console.log(this.posts.id);
      console.log(this.id);
      console.log(id);
      //console.log(this.post);
      

    },
    dislikeIt() {
      this.dislikes++;
    },
  },  
  };
</script>

<style></style>
