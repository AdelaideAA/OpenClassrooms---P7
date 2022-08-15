<template>
  <div class="card container">
    <!-- Pour afficher une image par défaut passe par back ou front -->
    <!-- <div class="picture-user-container mx-auto my-4"  v-if="picture != '' ">
      <img
        class="picture-user-profile shadow"
        src="../assets/avatar.png"
        alt="image de profil"
      />
    </div> -->
    <div class="picture-user-container mx-auto my-4"  v-if="picture != '' ">
      
      <img
        class="picture-user-profile shadow"
        :src="$store.state.user.picture"
        alt="image de profil"
      />
    </div>
    <h2>Mon compte</h2>
    <span
      ><strong>
        {{ $store.state.user.firstName }}
        {{ $store.state.user.lastName }}</strong
      ></span
    >
    <p v-if="$store.state.user.description">
      {{ $store.state.user.description }}
    </p>
    <button
      type="button"
      class="btn btn-primary my-2 px-5"
      @click="showModal = true"
    >
      Editer le profil
      <i class="fa-solid fa-pen-to-square ms-4"></i>
    </button>
    <transition name="modalFade">
      <modal-comp
        v-if="showModal"
        title="Personnalisez votre profil"
        @fermeLModal="showModal = false"
      >
        <h2>Ajoutez une description et une photo de profil</h2>
        <form @submit.prevent="save" style="text-align: left">
          <div class="mb-3">
            <div class="form-floating">
              <textarea
                class="form-control text-left"
                placeholder="description"
                id="floatingTextarea"
                v-model="user.description"
              ></textarea>
              <label for="floatingTextarea">Description</label>
            </div>
          </div>
          <div class="mb-5">
            <label for="formFile" class="form-label"
              >Change ta photo de profil ici</label
            >
            <input
              class="form-control"
              type="file"
              aria-label="Upload"
              @change="uploadProfilFile"
              id="formFile"
            />
          </div>
          <div class="d-flex justify-content-between">
            <button class="btn btn-danger" @click.prevent="deleteAccount">
              <i class="far fa-trash-alt delete me-2"></i> Supprimer mon compte
            </button>

            <button @click="save" type="submit" class="btn btn-primary">
              Submit
            </button>
          </div>

          <p>{{ errMsg }}</p>
        </form>
        <div>
          <!--  
          <div class="p-group">
            <img id="preview" :src="user.file" alt="" class="profile" />
          </div>
          -->
        </div>
      </modal-comp>
    </transition>
    <button class="btn btn-outline-secondary my-2" @click="handleClick">
      Déconnexion <i class="fa-solid fa-right-from-bracket ms-4"></i>
    </button>
  </div>
</template>

<script>
  import axios from 'axios'
  import ModalComp from './ModalComp.vue'
  export default {
    components: { ModalComp },
    name: 'ProfileComp',
    data() {
      return {
        user: {
          picture: '',
          description: ''
        },
        showModal: false,
        errMsg: '',
      }
    },
    created() {
      this.user.description = this.$store.state.user.description
    },
    methods: {
      /*choisir et prévisualiser une image de profil fonctionne mais est vraiment utile? Si je garde -> Css à faire*/
      uploadProfilFile(event) {
        this.user.picture = event.target.files[0]
        console.log(this.user.picture)
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
        localStorage.removeItem('token')
        this.$store.commit('setUser', null)
        this.$router.push('/')
      },
      /* Supprimer son compte */
      deleteAccount() {
        const token = localStorage.getItem('token')
        const id = this.$store.state.user._id
        if (confirm('Attention cette action supprimera votre compte')) {
          axios
            .delete('auth/' + id, {
              headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            })
            .then(localStorage.clear()) // <- on vide le localStorage(userId et token)
          this.$router.push({ path: '/' }).catch((error) => {
            error
          })
        }
      },
      /*Mettre à jour son profil */
      save() {
        let formData = new FormData()
        // on ne passe pas le file dans le body. Il arrive dans le req.file !!
        formData.append('file', this.user.picture) // verifier dans le back-end !! (multer && variables) 
        formData.append('description', this.user.description)


        const token = localStorage.getItem('token')
        const id = this.$store.state.user._id

        axios
          .put('auth/' + id, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            console.log(response.data)
            this.$store.commit("updateUser", response.data)
            this.showModal = false
          })
          .catch((error) => {
            this.errMsg = error.response.data.message
              ? error.response.data.message
              : error
          })
      },
    },
  };
</script>

<style scoped>
.picture-user-container {
  width: 78px;
}
.picture-user-profile {
  border-radius: 50%;
  padding: 0;
  height: 78px;
}
h2 {
  font-size: 1.2em;
  font-weight: 600;
}

.modalFade-enter-from {
  opacity: 0;
}
.modalFade-enter-to {
  opacity: 1;
}
.modalFade-enter-active,
.modalFade-leave-active {
  transition: all 300ms ease;
}
.modalFade-leave-from {
  opacity: 1;
}

.modalFade-leave-to {
  opacity: 0;
}
</style>
