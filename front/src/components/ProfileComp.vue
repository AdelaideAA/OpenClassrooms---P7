<template>
  <!---- Card profil ---->
  <article class="card shadow-sm container">
    <avatar-compo></avatar-compo>
    <h2>Mon compte</h2>
    <span
      ><h3 class="profil-username">
        {{ $store.state.user.firstName }}
        {{ $store.state.user.lastName }}
      </h3></span
    >

    <p v-if="$store.state.user.description">
      {{ $store.state.user.description }}
    </p>

    <!---- Button qui ouvre le modal pour update le profil ---->
    <button
      role="button"
      aria-label="Modifier mon profil"
      type="button"
      class="btn btn-primary my-2 px-5"
      @click="showModal = true"
    >
      Editer le profil
      <fa icon="pen-to-square" class="ms-4" alt="image d'un crayon" />
    </button>

    <!---- Modal d'édition---->
    <transition name="modalFade">
      <modal-comp
        v-if="showModal"
        title="Personnalisez votre profil"
        @fermeLModal="showModal = false"
      >
        <h2>Ajoutez une description et une photo de profil</h2>
        <form
          @submit.prevent="save"
          style="text-align: left"
          aria-label="modification des informations utilisateur"
        >
          <div class="mb-3">
            <div
              class="form-floating"
              aria-label="Modification de la description utilisateur"
            >
              <textarea
                aria-label="champs description utilisateur"
                class="form-control text-left"
                placeholder="description"
                id="floatingTextarea"
                v-model="user.description"
              ></textarea>
              <label for="floatingTextarea">Description</label>
            </div>
          </div>
          <div class="mb-5" aria-label="Modification image profil">
            <label for="formFile" class="form-label"
              >Change ta photo de profil ici</label
            >
            <input
              class="form-control"
              type="file"
              aria-label="Chargez une image"
              @change="uploadProfilFile"
              id="formFile"
            />
          </div>

          <div class="d-flex justify-content-between">
            <button
              role="button"
              aria-label="Supprimer mon compte"
              class="btn btn-danger"
              @click.prevent="deleteAccount"
            >
              <fa icon="trash-alt" class="me-2" alt="image d'une poubelle" />
              Supprimer mon compte
            </button>

            <button
              role="button"
              aria-label="Enregister les modifications"
              type="submit"
              class="btn btn-primary"
            >
              Submit
            </button>
          </div>
          <p class="err-msg">{{ errMsg }}</p>
        </form>
      </modal-comp>
    </transition>
    <button
      role="button"
      aria-label="Déconnexion du compte"
      class="btn btn-outline-secondary my-2"
      @click="handleClick"
    >
      Déconnexion
      <fa
        icon="right-from-bracket"
        class="ms-4"
        alt="image d'une flèche de sortie"
      />
    </button>
  </article>
</template>

<script>
  import axios from 'axios'
  import ModalComp from './ModalComp.vue'
  import AvatarCompo from './AvatarCompo.vue'
  export default {
    components: { ModalComp, AvatarCompo },
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
      /*choisir  une image de profil */
      uploadProfilFile(event) {
        this.user.picture = event.target.files[0]
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
          this.$router.push({ path: '/' })
            .catch((error) => {
              error
            })
        }
      },
      /*Mettre à jour son profil */
      save() {
        let formData = new FormData()
        formData.append('file', this.user.picture)
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
            this.$store.commit("updateUser", response.data)
            this.showModal = false
          })
          .catch((error) => {
            console.log(error)
            this.errMsg = error.response.data.message
              ? error.response.data.message
              : error
          })
      },
    },
  };
</script>

<style scoped>
.card {
  border: none;
  margin-bottom: 20px;
}
h2 {
  font-size: 1.2em;
  font-weight: 600;
}
.profil-username {
  font-weight: 700;
  font-size: medium;
  margin-top: 8px;
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

.picture-user-container {
  width: 78px;
}
.picture-user-profile {
  border-radius: 50%;
  padding: 0;
  height: 78px;
  object-fit: cover;
}
.err-msg {
  color: var(--primary-color);
  font-weight: 400;
  margin-top: 20px;
}
</style>
