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
      <button class="btn btn-block" type="submit">Se connecter</button>
      
    </form>
  </div>
      <router-link to="/signup">Pas encore inscrit ? <br> S'inscrire </router-link>
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
        }
       
      };
    },
    components: {
      Header,
    },
    methods: {
      async login() {
        const response = await axios.post('auth/login',  {
          email: this.user.email,
          password: this.user.password,
        });
        //console.log(response);
        localStorage.setItem('token', response.data.token);
        this.$router.push('/actu');
        
      },
    },
  };
</script>

<style>
  .login {
    border-radius: 15px;
    background: #4e5166;
    color: white;
    padding: 20px;
    width: 375px;
    margin: auto;
  }

  .form-login {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

</style>
