<template>
  <!---- Composition du post ---->
  <article class="post-card p-2 mb-4 shadow-sm">
    <div class="post-user">
      <figure
        class="post-user-info"
        aria-label="informations de l'utilisateur qui à publié"
      >
        <div class="picture-user-container mx-auto mt-1 ms-4">
          <img
            class="picture-user-profile shadow"
            v-if="post.authorImg"
            :src="post.authorImg"
            alt="image de profil"
          />
          <img
            v-else
            src="../assets/avatar.png"
            alt="image de profil par défaut"
            class="picture-user-profile shadow"
          />
        </div>

        <figcaption aria-label="Nom de l'utilisateur et date de publication">
          {{ post.userName }} <br />
          <span class="date"> {{ timestamp }} </span>
        </figcaption>
      </figure>
      <div class="modif">
        <!---- Button modal ---->
        <button
          role="button"
          aria-label="Modifier ma publication"
          v-if="post.userId == user.userId || user.admin == true"
          type="button"
          class="btn btn-primary"
          @click="showModalPost = true"
        >
          <fa icon="pencil" alt="image d'un crayon" />
        </button>

        <!---- Modal pour editer le post ---->
        <transition name="modalFade">
          <modal-update-post-comp
            v-if="showModalPost"
            title="Modifiez votre publication"
            @fermeLeModal="showModalPost = false"
          >
            <h2>Modifier votre message et/ou votre image</h2>
            <form
              @submit.prevent="UpdatePost"
              style="text-align: left"
              aria-label="modification des champs du post"
            >
              <div class="mb-3">
                <div class="form-floating">
                  <textarea
                    aria-label="champs de modification du message"
                    class="form-control text-left"
                    placeholder="ajoutez vos modifications"
                    id="floatingTextarea"
                    v-model="newPost.post"
                  ></textarea>
                  <label for="floatingTextarea"
                    >Changez ou ajoutez un message</label
                  >
                </div>
              </div>
              <div class="mb-5">
                <label for="formFile" class="form-label"
                  >Changez ou ajoutez une image</label
                >
                <input
                  accept="image/*"
                  class="form-control"
                  type="file"
                  aria-label="changer l'image"
                  @change="uploadFile"
                  id="formFile"
                />
              </div>
              <div class="d-flex justify-content-between">
                <button
                  role="button"
                  type="button"
                  aria-label="Supprimer la publication"
                  class="btn btn-danger"
                  @click="deletePost"
                >
                  <fa
                    icon="trash-alt"
                    class="me-2"
                    alt="image d'une poubelle"
                  />
                  Supprimer ma publication
                </button>

                <button
                  role="button"
                  aria-label="Enregistrer les modifications"
                  type="submit"
                  class="btn btn-primary"
                >
                  Enregistrer les modifications
                </button>
              </div>

              <p>{{ errMsg }}</p>
            </form>
          </modal-update-post-comp>
        </transition>
      </div>
    </div>
    <!---- Fin modal - affichage des éléments sur le post -->
    <div class="post-content">
      <p>{{ post.post }}</p>
      <div class="post-content--img" v-if="post.imageUrl != null">
        <img :src="post.imageUrl" alt="image du post" />
      </div>
    </div>
    <!---- Partie Like ---->

    <div class="like">
      <button
        type="button"
        role="button"
        aria-label="ajouter un like à ce post"
        class="btn like-btn"
        @click="likeIt()"
      >
        <span aria-label="nombre de like" class="badge">{{ post.likes }}</span>
        <fa icon="heart" alt="image de coeur" />
      </button>
    </div>
  </article>
</template>

<script>
  import axios from 'axios'
  import ModalUpdatePostComp from './ModalUpdatePostComp.vue'

  export default {
    name: 'PostComp',
    components: {
      ModalUpdatePostComp,
    },
    
    data() {
      return {
        publications: [],
        showModalPost: false,
        newPost: {
          post: '',
          image: '',
        },
        user: {
          admin: this.$store.state.user.admin,
          userId: this.$store.state.user._id
        },
        timestamp: '',
        errMsg: '',
      }
    },
    created() {
      setInterval(this.getNow, 1000)
    },
    props: {
      post: {
        type: Object,
        required: true,
      },
    },
    methods: {

      //afficher la date sur le post
      getNow: function () {
        const today = new Date()
        const date =
          today.getDate() +
          '-' +
          (today.getMonth() + 1) +
          '-' +
          today.getFullYear()
        this.timestamp = date
      },

      /*Choisir une nouvelle image*/
      uploadFile(event) {
        this.newPost.image = event.target.files[0]
      },

      /* Modifier et envoyer le nouveau post */
      UpdatePost() {
        const token = localStorage.getItem('token')
        let formData = new FormData()
        formData.append('post', this.newPost.post)
        formData.append('id', this.post._id)

        if (this.newPost.image != '') {
          formData.append('file', this.newPost.image)
        }
        let id = this.post._id

        axios
          .put(`publication/${id}`, formData, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          })
          .then((res) => {
            this.$store.commit('updatePost', res.data.post)
            this.showModalPost = false
          })
          .catch((error) => {
            console.log(error)
            this.errMsg = 'Vous ne pouvez pas modifier votre publication pour le moment, veuillez réessayer plus tard.'
          })
      },
      /* Supprimer le post */

      deletePost() {
        const token = localStorage.getItem('token')
        axios
          .delete('publication/' + this.post._id, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .then((response) => {
            console.log('response du delete', response.data)
            if (response.data.delPost.acknowledged) {
              //appel la fonction pour remettre l'ensemble des post
              this.$store.dispatch("getAllPosts")
            }
            this.showModalPost = false

          })
          .catch((error) => {
            console.log(error)
            this.errMsg = 'Vous ne pouvez pas supprimer votre publication pour le moment, veuillez réessayer plus tard.'
          })
      },

      /****************Like et dislikes*************** */
      likeIt() {
        const userId = this.$store.state.user._id
        const likeData = {
          userId,
          postId: this.post._id,
          like: 1,
        }


        axios
          .post(`publication/${this.post._id}/like/`, likeData, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },

          })
          .then((response) => {
            this.$store.commit('updateLikes', response.data.updatedPost)
          })
          .catch((error) => console.log(error))
      },


    },
  };
</script>

<style>
.post-card {
  border: none;
}
.post-user {
  display: flex;
  justify-content: space-between;
}
.post-user-info {
  display: flex;
}

.fa-heart {
  color: #dd0303;
  font-size: 1.7em;
  transition: all 600ms ease;
}

.post-content {
  margin: -10px 100px;
}

.post-content img {
  max-height: 300px;
  width: 100%;
  margin: 10px 0px;
  object-fit: contain;
}
figcaption {
  min-width: fit-content;
  margin: 5px;
}

.profile-picture {
  border-radius: 50%;
  width: 80px;
  box-shadow: 1px 1px grey;
  height: 80px;
  object-position: center;
  object-fit: cover;
}

.date {
  color: #b2b2b2;
  font-size: 12px;
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
  width: 78px;
  object-fit: cover;
}

.badge {
  color: var(--tertiary-color);
}
.like {
  margin: 0px 100px;
  display: flex;
  justify-content: flex-end;
}
.like-btn {
  display: flex;
  align-items: center;
}
.like .like-btn:hover,
.like .like-btn:focus,
.like .like-btn:active {
  background-color: white;
  border-color: white;
}

.like .like-btn:hover .fa-heart {
  transform: scale(1.2);
}
.fa-pencil {
  font-size: 1.2em;
}
@media (max-width: 768px) {
  .picture-user-container {
    width: 65px !important;
  }
  .picture-user-profile {
    height: 70px;
  }
}
</style>
