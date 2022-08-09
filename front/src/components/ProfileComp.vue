<template>
  <div class="profil-conteiner">
    <h3>Mon Profil</h3>
    <div class="picture-user-conteiner">
      <img
        class="picture-user-profile"
        src="../assets/business-women-avatars-smiling-f.jpg"
        alt="image de profil"
      />
      <!-- v-if="infoUser.photo !== null" -->
      <!--:src="{{ this.$store.state.user.picture }}"" -->
      <!--v-else <font-awesome-icon icon="fa-solid fa-user" alt="Image de profil par défaut"/>-->
    </div>

    <p>{{ this.$store.state.user.lastName }}</p>
    <p>{{ this.$store.state.user.firstName }}</p>
    <p>Ajoutez une description</p>
    <button class="connexion-btn btn-logout" @click="handleClick">
      Déconnexion
    </button>
    <button class="delete" @click="deleteAccount">Supprimer mon compte</button>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'ProfileComp',
    methods: {
      handleClick() {
        localStorage.removeItem('token');
        this.$router.push('/');
      },
      deleteAccount() {
        const token = localStorage.getItem('token');
        const id = this.$store.state.user._id;
        if (confirm("Attention cette action supprimera votre compte")) {
        axios
          .delete('auth/' + id, {
            headers: {
              'content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response) {
              localStorage.clear();
              this.$router.push('/');
            }
          })
          .catch((error) => {
            console.log(error);
          });
        }
      },
    },
  };
</script>

<style>
  .profil-conteiner {
    background: var(--secondary-color);
  }
  .btn-logout {
    width: 75%;
  }
</style>
