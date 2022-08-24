<template>
<!---- fil d'actualité ---->
  <main class="main">
    <div class="row overflow-hidden flex-row-reverse conteiner-main">
      <section class="col-lg-3 mx-4 conteiner-profil">
        <ProfileComp />
      </section>
      <section class="col-lg-8">
         <h1 v-if="firstPost" class="first-post">
          Soyez le premier à partager quelque chose!
        </h1>
        <NewPostComp @postCree="this.firstPost = false" />
        <post-comp
          class="card"
          v-for="post in $store.state.posts"
          :key="post._id"
          :post="post"
        >
        </post-comp>
      </section>
    </div>
  </main>
</template>
 
<script>
  import NewPostComp from '@/components/NewPostComp.vue'
  import PostComp from '@/components/PostComp.vue'
  import ProfileComp from '@/components/ProfileComp.vue'
  import axios from 'axios'

  export default {
    name: 'Actu',
    data() {
      return {
        firstPost:false,
      } 
    },
   
    components: {
      NewPostComp,
      PostComp,
      ProfileComp,
    },
    async created() {
     if (this.$store.state.user) {
      this.$store.dispatch("getAllPosts")
      if (!this.$store.posts || this.$store.posts.length === 0) {
          this.firstPost = true
        }
     }
    },
  };
</script>
 
<style scoped>
.main {
  background-color: var(--secondary-color);
}
  .conteiner-main{
    padding: 1.5rem;
     max-width: 1300px;
    margin: auto;
  }
.first-post{
    margin-top:25px;
    margin-bottom: 25px;
  }


@media (max-width: 992px) {
  
  .conteiner-main{
    padding: 8px;
  }
  .conteiner-profil{
    margin: 0px!important;
  }
}


</style>
