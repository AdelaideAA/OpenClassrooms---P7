<template>
  <Header />
  <main class="home">
    <HelloWorld msg="Bienvenue sur notre réseau social d'entreprise" />
    <!--Mettre deux routeur link au click vers les composants pour se loguer ou s'inscrire-->
    <div class="connexion">
      <button
        type="button"
        class="connexion-btn"
        @click="showComponentToLogin = 'showLogin'"
      >
        Connexion
      </button>
      <!--Ajouter les aria nécessaires aux boutons-->
      <button
        type="button"
        class="connexion-btn"
        @click="showComponentToSignUp = 'showSignUp'"
      >
        S'inscrire
      </button>
    </div>
  <modal-comp></modal-comp>
    <!--Mettre des router link vers les components?? Utiliser V:show?? -->
  </main>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Header from "@/components/Header.vue"
import Login from "@/components/Login.vue";
import SignUp from "@/components/SignUp.vue";
import ModalComp from '../components/ModalComp.vue';

export default {
  name: "HomeView",
  data() {
    return {
      showLogin: true,
      showSignUp: false,
    };
  },
  components: {
    HelloWorld,
    Login,
    SignUp,
    Header,
    ModalComp
  },
  methods: {
    showComponentToLogin() {
      if (this.showLogin === true) {
        this.showLogin = false;
        this.showSignUp = true;
      } else {
        this.showLogin = true;
        this.showSignUp = false;
      }
    },
    showComponentToSignUp() {
      if (this.showSignUp === false) {
        this.showSignUp = true;
        this.showLogin = false;
      } else {
        this.showSignUp = false;
        this.showLogin = true;
      }
    },
  },
};
</script>

<style>
.connexion {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.connexion-btn {
  width: 250px;
  padding: 7px;
  margin: 5px;
  background: #4e5166;
  color: white;
  border-radius: 7px;
  border: 1px solid #4e5166;
  font-size: 18px;
}
</style>
