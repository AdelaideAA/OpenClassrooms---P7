<template>
  <router-view /><!--Permet d'exporter homeView-->
  <nav>
    <div>
      <!--Supprimer les liens home about et actu-->
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/actu">Fil d'actualités</router-link>
    </div>
  </nav>
  <FooterComp />
</template>

<script>
import FooterComp from "./components/FooterComp.vue";

export default {
  components: {
    FooterComp,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
