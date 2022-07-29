<!--revoir les aria-->
<template>
  <div class="signup">
    <form
    @submit.prevent="signup"
      method="post"
      aria-label="Formulaire d'inscription"
      class="form-login"
    >
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        placeholder="email@email.fr"
        v-model="email"
        class="input-login"
      />
      <label for="password">Mot de passe</label>
      <input
        type="password"
        id="password"
        placeholder="Mot de passe"
        v-model="password"
        class="input-login"
      />
      <label for="password">Confirmer le mot de passe</label>
      <input
        type="password"
        id="confirm-password"
        placeholder="Veuillez confirmer le mot de passe"
        v-model="confirmPassword"
        class="input-login"
      />
      <button class="connexion" type="submit" v-on:click="alert('Inscription ok')">S'inscrire</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'SignUp',
    data: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    methods: {
      signup() {
        console.log('stop form')
      }
    }
  };
  //créer un model
  //ajoute regexp
  //méthode post
</script>

<style>
  .signup {
    border-radius: 10px;
    border: 1px solid;
    background: #4e5166;
    color: white;
    padding: 20px;
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

  .connexion {
    cursor: pointer;
  }
</style>
