<template>
  <div class="card-profil container">
    <h3>Mon Profil</h3>

    <div class="picture-user-conteiner">
      <img class="picture-user-profile" :src="picture" alt="image de profil" />

      <label for="profil-file">Modifiez votre image de profil</label>
      <!-- <div class="profil-file-container">
        <img id="preview" :src="user.file" alt="" class="profile" />
      </div> -->
      <div class="input-group">
        <input
          ref="file"
          type="file"
          class="form-control"
          id="inputGroupFile04"
          aria-describedby="inputGroupFileAddon04"
          aria-label="Upload"
          @change="uploadProfilFile"
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          id="inputGroupFileAddon04"
        >
          Button
        </button>
      </div>
    </div>
    <div class="about_user-container">
      <p>{{ this.$store.state.user.lastName }}</p>
      <p>{{ this.$store.state.user.firstName }}</p>
      <p>
        <textarea
          class="input"
          v-model="user.description"
          :placeholder="user.description"
        />
      </p>
    </div>
    <p>{{ errMsg }}</p>
    <button class="connexion-btn btn-logout" @click="save">Enregistrer</button>

    <button class="connexion-btn btn-logout" @click="handleClick">
      Déconnexion
    </button>
    <button class="btn connexion-btn btn-logout" @click.prevent="deleteAccount">
      <i class="far fa-trash-alt delete"></i> Supprimer mon compte
    </button>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'ProfileComp',
    data() {
      return {
        user: {
          picture: '',
          description: '',
          //file:'',
        },
        
        errMsg:'',
      };
    },
    props: ['picture'],
    methods: {
      /*choisir et prévisualiser une image de profil*/
      uploadProfilFile(event) {
        this.file = this.$refs.file.files[0];
        console.log(event);
        // let input = event.target;
        // if (input.files) {
        //   let reader = new FileReader();
        //   reader.onload = (e) => {
        //     document.getElementById('preview').src = e.target.result;
        //   };
        //   reader.readAsDataURL(input.files[0]);
        // }
      },
      /* Se déconnecter */
      handleClick() {
        localStorage.removeItem('token');
        this.$store.commit('setUser', null);
        this.$router.push('/');
      },
      /* Supprimer son compte */
      deleteAccount() {
        const token = localStorage.getItem('token');
        const id = this.$store.state.user._id;
        if (confirm('Attention cette action supprimera votre compte')) {
          axios
            .delete('auth/' + id, {
              headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            })
            .then(localStorage.clear()); // <- on vide le localStorage(userId et token)
          this.$router.push({ path: '/' }).catch((error) => {
            error;
          });
        }
      },
      /*Mettre à jour son profil */
      save() {
        // let formdata = new FormData();
        // formdata.append('file', this.user.picture);
        // formdata.append('description', this.user.description);

        const token = localStorage.getItem('token');
        const id = this.$store.state.user._id;
        const user = {
          ...this.user,
        };
        console.log(this.user)
        console.log(user);
        axios
            .post('auth/' + id, this.user, {
              headers: {
                Authorization: `Bearer ${token}`,
                 'Content-Type': 'multipart/form-data',
              },
            })
            .then((response) => {
              this.$store.commit('setUser', response.data);
            console.log('response', response);
            })
            .catch ((error) => {
            this.errMsg = error.response.data.message
              ? error.response.data.message
              : error;
          });
      },
    },
  };
</script>

<style>
  .card-profil {
    background: var(--secondary-color);
  }
  
  .profil-file-container {
    width: 50px;
    height: 50px;
  }
  .btn-logout {
    width: 75%;
  }
</style>
