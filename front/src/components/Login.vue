<template>

  <div class="signup">
    <form method="post" aria-label="Formulaire d'inscription" class="form-login">
      <label for="email">Email</label>
      <input type="email" id="email" placeholder="email@email.fr" v-model="email" class="input-login"/>
      <label for="password">Mot de passe</label>
      <input type="password" id="password" placeholder="Mot de passe" v-model="password" class="input-login"/>
      <button class="connexion" type="submit">Se connecter</button>
    </form>
  </div>

</template>


<script>

export default {
    name: 'login',
    data: {
        email: '',
        password: ''
    },
}

</script>

<style>
.signup {

    border-radius: 10px;
    border: 1px solid;
    background: #4E5166;
    color: white;  
}

.form-login{
    display: flex;
    flex-direction: column;
    align-items: center;  
}

.input-login {
  border-radius: 5px;
  border-color: white;
}
</style>
