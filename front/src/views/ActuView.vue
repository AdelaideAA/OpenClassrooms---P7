<template>
  <Header />
  <div>
    <!-- <h2 v-if="user">Bonjour, {{ user.firstName }} {{ user.lastName }}</h2>
    <h2 v-if="!user">You are not loggin</h2> -->
  </div>
  <NewPostComp />
  <PostComp />
</template>

<script>
  import Header from '@/components/Header.vue';
  import axios from 'axios';
  import NewPostComp from '@/components/NewPostComp.vue';
  import PostComp from '@/components/PostComp.vue';

  export default {
    name: 'actu',
    data() {
      return {
        user: null,
      };
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
    components: {
      Header,
      NewPostComp,
      PostComp,
    },
  };
</script>

<style></style>
