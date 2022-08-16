<template>
<div class="img-cont">
      <img alt="Groupomania" src="../assets/icon-left-font.png" />
    </div>
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
    <p>{{ errMsg }}</p>
  </div>
  <div class="bloc-switch-connexion">
    <router-link to="/signup" class="switch-connexion"
      >Pas encore inscrit ? <br />
      S'inscrire
    </router-link>
  </div>
</template>

<script>
  
  import axios from 'axios';

  export default {
    name: 'Login',
    data() {
      return {
        user: {
          email: '',
          password: '',
        },
        errMsg: '',
      };
    },
    components: {
     
    },
    methods: {
      async login() {
        const user = {
          ...this.user,
        };
        await axios
          .post('auth/login', this.user)
          .then((response) => {
            if (response.status == 200) {
              localStorage.setItem('token', response.data.token);
              this.$router.push('/actu');
              this.$store.commit('setUser', response.data);
            }
            // } else {
            //   this.errMsg = 'Email ou mot de passe incorrect';
            // }
          })
          .catch((error) => {
            this.errMsg = error.response.data.message
              ? error.response.data.message
              : error;
          });
      },
    },
  };
</script>

<style></style>
