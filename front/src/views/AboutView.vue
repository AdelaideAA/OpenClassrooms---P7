<template>
  <div class="about">
    <h1>This is an about pages</h1>
  </div>
  <div class="login">
    <form
      @submit.prevent="login"
      method="post"
      aria-label="Formulaire d'inscription"
      class="form-login"
    >
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        placeholder="email@email.fr"
        v-model="user.email"
        class="input-login"
      />
      <label for="password">Mot de passe</label>
      <input
        type="password"
        id="password"
        placeholder="Mot de passe"
        v-model="user.password"
        class="input-login"
      />
      <button class="connexion" type="submit">Se connecter</button>
      <div>Pas encore inscrit ?</div>
      <router-link to="/SignUp">S'inscrire </router-link>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'about',
    data() {
      return {
        user: {
          email: '',
          password: '',
        },
      };
    },
    methods: {
      login() {
        const data = {
          email: this.user.email,
          password: this.user.password,
        };
        console.log(data);
      },
    },
  };
</script>

<style>
  .login {
    border-radius: 10px;
    border: 1px solid;
    background: #4e5166;
    color: white;
  }

  .form-login {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .input-login {
    border-radius: 5px;
    border-color: white;
  }
</style>
