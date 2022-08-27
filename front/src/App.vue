<template>
  <div class="container-flex">
    <HeaderComp />
    <router-view />
    <FooterComp />
  </div>
</template>

<script>
  import HeaderComp from '@/components/HeaderComp.vue'
  import FooterComp from './components/FooterComp.vue'
  import axios from 'axios'

  export default {
    components: {
      FooterComp,
      HeaderComp,
    },
    created() {
      const token = localStorage.getItem('token')
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      if (token) {
        axios
          .post('http://localhost:3000/api/auth//identify', {}, config)
          .then((res) => {
            console.log(res.data)
            this.$store.commit('setUser', res.data)
            this.$router.push('/actu')
          })
      } else if (!token) {
        this.$router.push('/')
      }
    },
  };
</script>

<style>
#app {
  font-family: "Lato", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  --primary-color: #fd2d01;
  --secondary-color: #ffd7d7;
  --tertiary-color: #4e5166;
  color: var(--tertiary-color);
}

.card {
  border-color: transparent;
  border-radius: 8px;
}

.btn-primary {
  background-color: var(--tertiary-color) !important;
  border-color: var(--tertiary-color) !important;
}
</style>

