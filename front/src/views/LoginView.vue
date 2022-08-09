<template>
  <router-link to="/"><Header /></router-link>

  <div class="login">
    <form
      @submit.prevent="login"
      method="post"
      aria-label="Formulaire d'inscription"
      class="form-login"
    >
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="email@email.fr"
          v-model="user.email"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          placeholder="Mot de passe"
          v-model="user.password"
          class="form-control"
        />
      </div>
      <button class="btn-login" type="submit">Se connecter</button>
    </form>
  </div>
  <div class="bloc-switch-connexion">
    <router-link to="/signup" class="switch-connexion"
      >Pas encore inscrit ? <br />
      S'inscrire
    </router-link>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import axios from 'axios';

  export default {
    name: 'Login',
    data() {
      return {
        user: {
          email: '',
          password: '',
        },
      };
    },
    components: {
      Header,
    },
    methods: {
      async login() {
        const response = await axios.post('auth/login', this.user);

        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        this.$router.push('/actu');
        this.$store.commit('setUser', response.data);
      },
    },
  };
</script>

<style></style>
