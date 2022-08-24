<template>
<!---- S'inscrire ---->
  <div class="login">
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
          aria-label="Prénom"
          v-model="user.firstName"
        />
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input
          type="text"
          class="form-control"
          placeholder="Last Name"
          aria-label="Nom de famille"
          v-model="user.lastName"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="email@email.fr"
          aria-label="email"
          v-model="user.email"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          aria-label="mot de passe"
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
          aria-label="confirmation du mot de passe"
          placeholder="Veuillez confirmer le mot de passe"
          v-model="user.passwordConfirm"
          class="form-control"
        />
      </div>
      <p>{{ errMsg }}</p>
      <button role="button" class="btn-login" type="submit">S'inscrire</button>
    </form>
  </div>
  <div class="bloc-switch-connexion">
    <router-link to="/login" class="switch-connexion">
      Déjà un compte?<br />
      Se connecter
    </router-link>
  </div>
</template>

<script>
 
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
        errMsg: null,
      };
    },
    components: {
      
    },
    methods: {
      async signup() {
        /* vérifie si tous les champs sont bien remplis */
        if (
          !this.user.firstName ||
          !this.user.lastName ||
          !this.user.email ||
          !this.user.password ||
          !this.user.passwordConfirm
        ) {
          this.errMsg = 'Err! Remplissez tous les champs du formulaire';
          return;
        }
        /* regex */
        let regExpName = new RegExp(
          /^[A-Za-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ\s'-]+$/
        );
        let regExpEmail = new RegExp(
          /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/
        );
        let regExpPassword= new RegExp(/^(?=.{8,100}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/); ///((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,32})/^(?=.{8,100}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$__/^[a-zA-Z0-9]{8,100}$
        /* véfifications */
        if (!regExpName.test(this.user.firstName || this.user.lastName)) {
          this.errMsg = 'Format nom et/ou prénom incorrect';
          return;
        }
        if (!regExpEmail.test(this.user.email)) {
          this.errMsg =
            "L'email inscrit n'a pas le bon format (exemple@mail.com)";
          return;
        }
        if (!regExpPassword.test(this.user.password)) {
          this.errMsg =
            'Le mot de passe doit contenir entre 8 et 100 caractères + 1 maj + 1 chiffre';
          return;
        }
        if (this.user.password !== this.user.passwordConfirm) {
          this.errMsg =
            'Les mots de passe ne sont pas identiques';
          return;
        }
        /*Se connecter*/ 
        const response = await axios.post('auth/signup', this.user)
        .then((response) => {
          this.$router.push('/login');
        }) 
        .catch((error) => {
          console.log(error);
          this.errMsg="Nous n'avons pas accès au serveur pour le moment, merci de réssayer plus tard."
        })
        
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

  .input-login {
    border-radius: 5px;
    border-color: white;
  }
  .btn-login {
    width: 65%;
    transition: all 300ms ease-in-out;
    color: white;
    background-color: var(--tertiary-color);
    border: none;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .btn-login:hover {
    transform: scale(1.15);
  }

  .bloc-switch-connexion {
    margin-top: 30px;
    margin-bottom: 40px;
  }
  .switch-connexion {
    color: var(--tertiary-color);
  }
  .switch-connexion:hover {
    color: var(--tertiary-color);
  }
  
</style>
