<template>
  <router-link to="/"><Header /></router-link>
  <div class="signup">
    <form
      @submit.prevent="signup"
      method="post"
      aria-label="Formulaire d'inscription"
      class="form-login"
    >
      <div class="form-group">
        <label>First name</label>
        <input
          type="text"
          class="form-control"
          placeholder="First Name"
          v-model="user.firstName"
        />
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input
          type="text"
          class="form-control"
          placeholder="Last Name"
          v-model="user.lastName"
        />
      </div>
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
      <div class="form-group">
        <label for="password">Confirmer le mot de passe</label>
        <input
          type="password"
          id="confirm-password"
          placeholder="Veuillez confirmer le mot de passe"
          v-model="user.passwordConfirm"
          class="form-control"
        />
      </div>
      <button class="btn btn-block" type="submit">S'inscrire</button>
    </form>
  </div>
  <p>Déjà un compte?</p>
  <router-link to="/login">Se connecter </router-link>
</template>

<script>
  import Header from '@/components/Header.vue';
  import axios from 'axios';

  export default {
    name: 'Signup',
    data() {
      return {
        user: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          passwordConfirm: '',
        },
      };
    },
    components: {
      Header,
    },
    methods: {
      async signup() {
        const response = await axios.post('auth/signup', {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          password: this.user.password,
          passwordConfirm: this.user.passwordConfirm,
        });
        console.log(response), this.$router.push('/login');
      },
    },
  };
</script>

<style>
  .signup {
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

  .input-login {
    border-radius: 5px;
    border-color: white;
  }
</style>
