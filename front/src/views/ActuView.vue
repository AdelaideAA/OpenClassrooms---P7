<template>
<!---- fil d'actualité ---->
  <main class="main">
    <div class="row overflow-hidden flex-row-reverse conteiner-main">
      <section class="col-lg-3 mx-4 conteiner-profil">
        <ProfileComp />
      </section>
      <section class="col-lg-8">
         <h1 class="first-post">{{firstPost}}</h1>
        <NewPostComp @postCree="this.firstPost= false" />
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
      /*Afficher l'ensemble des post */
      if (this.$store.state.user) {
        const response = await axios.get('publication', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        this.user = response.data 
        this.$store.commit("setPosts", response.data)
         if(response.data.length === 0){
          this.firstPost=true
        }else{
          this.firstPost=false
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
