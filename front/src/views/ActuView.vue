<template>
<!---- fil d'actualité ---->
  <main class="main">
    <div class="img-cont mb-5">
      <img alt="Groupomania" src="../assets/icon-left-font.png" />
    </div>
    <div class="row overflow-hidden flex-row-reverse conteiner-main">
      <div class="col-lg-3 mx-4 conteiner-profil">
        <ProfileComp />
      </div>
      <div class="col-lg-8">
        <NewPostComp />
        <post-comp
          class="card"
          v-for="post in $store.state.posts"
          :key="post._id"
          :post="post"
        >
        </post-comp>
      </div>
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
      }
    },
  };
</script>
 
<style scoped>
.main {
  background-color: var(--secondary-color);
}
.img-cont {
  max-height: 250px;
  width: 100%;
  background-color: white;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.img-cont img {
  object-fit: none;
  padding-right: 20px;
}

@media (max-width: 992px) {
  .img-cont {
    display: none;
  }
  .conteiner-main{
    padding: 8px;
  }
  .conteiner-profil{
    margin: 0px!important;
  }
}


</style>
