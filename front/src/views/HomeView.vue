<template>
  <div class="bloc-color"></div>
  <div class="img-cont">
      <img alt="Groupomania" src="../assets/icon-left-font.png" />
    </div>
 
  <main class="home">
    <h1><HelloWorld msg="Bienvenue sur votre nouveau réseau social d'entreprise!" /></h1>
    <!--Mettre deux routeur link au click vers les composants pour se loguer ou s'inscrire-->
    <div class="connexion">
      <router-link to="/signup"
        ><button type="button" class="connexion-btn">
          S'inscrire
        </button></router-link
      >
      <!--Ajouter les aria nécessaires aux boutons-->
      <router-link to="/login"
        ><button type="button" class="connexion-btn">
          Connexion
        </button></router-link
      >
    </div>
  </main>
</template>

<script>
  // @ is an alias to /src

 
  import HelloWorld from '@/components/HelloWorld.vue';

  export default {
    name: 'HomeView',

    components: {
      
      HelloWorld,
    },
  };
</script>

<style scoped>
  .bloc-color {
    height: 35px;
    width: 100%;
    background-color: var(--secondary-color);
  }
  .connexion {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 200px
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
