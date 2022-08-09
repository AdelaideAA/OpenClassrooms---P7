<template>
  <router-view /><!--Permet d'exporter homeView-->
  <FooterComp />
</template>

<script>
  import FooterComp from './components/FooterComp.vue';
  import axios from 'axios';

  export default {
    components: {
      FooterComp,
    },
    created() {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      if (token) {
        axios
          .post('http://localhost:3000/api/auth//identify', {}, config)
          .then((res) => {
            console.log(res.data);
            this.$store.commit('setUser', res.data.message);
          })
      } else if (!token) {
        this.$router.push('/login');
      }
    },
  };
</script>

<style>
  #app {
    font-family: 'Lato', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    --primary-color: #fd2d01;
    --secondary-color: #ffd7d7;
    --tertiary-color: #4e5166;
  }

  nav {
    padding: 30px;
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
  }
  #logo {
    width: 400px;
  }
  nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
