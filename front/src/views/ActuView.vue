<template>
  <Header />
  <div>
    <h2>
      Bonjour {{ this.$store.state.user.firstName }}
      {{ this.$store.state.user.lastName }}
    </h2>

    <!-- <h2 v-if="user">Bonjour, {{ user.firstName }} {{ user.lastName }}</h2>
    <h2 v-if="!user">You are not loggin</h2> -->
  </div>
  <main class="main">
    <section class="section-profil"><ProfileComp /></section>
    <section class="section-post"><NewPostComp /> <PostComp /></section>
  </main>
</template>

<script>
  import Header from '@/components/Header.vue';
  import NewPostComp from '@/components/NewPostComp.vue';
  import PostComp from '@/components/PostComp.vue';
  import ProfileComp from '@/components/ProfileComp.vue';
  import axios from 'axios';

  export default {
    name: 'Actu',

    components: {
      Header,
      NewPostComp,
      PostComp,
      ProfileComp,
    },
    async created() {
      const response = await axios.get('publication', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      this.user = response.data;
      console.log('log de this.user', this.user);
      console.log('log de response', response);
    },
  };
</script>

<style>
  .main {
    display: flex;
    justify-content: space-between;
  }
  .section-profil {
    width: 30%;
  }
  .section-post {
    width: 68%;
  }
</style>
