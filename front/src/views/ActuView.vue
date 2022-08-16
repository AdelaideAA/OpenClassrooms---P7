<template>
  <main class="main">
    <div class="img-cont mb-5">
      <img alt="Groupomania" src="../assets/icon-left-font.png" />
    </div>
    <div class="row overflow-hidden flex-row-reverse">
      <div class="col-lg-3 mx-4">
        <ProfileComp />
        <NewPostComp />
      </div>
      <div class="col-lg-8">
        <post-comp
          class="card"
          v-for="post in $store.state.posts"
          :key="post._id"
          :id="post._id"
          :contenu="post.post"
          :image="post.imageUrl"
          :userName="post.userName"
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
      const response = await axios.get('publication', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      this.user = response.data
      this.$store.commit("setPosts", response.data, this.id)
    },
  };
</script>
 
<style scoped>

.main {
  background-color: var(--secondary-color);
}

.img-cont {
  max-height: 135px;
  background-color: white;
  align-items: center;
  justify-content: center;
}
.img-cont img {
  padding: 0;
  max-width: 800px;
  display: block;
}


@media (max-width: 992px) { 
  .img-cont{
    display: none;
  }
 }

</style>
