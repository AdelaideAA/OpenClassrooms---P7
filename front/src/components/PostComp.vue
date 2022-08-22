<template>
  <!---- Composition du post ---->
  <div class="post-card p-2 mb-4 shadow-sm">
    <div class="post-user">
      <div class="post-user-info">
        <div class="picture-user-container mx-auto mt-1 ms-4">
          <img
            class="picture-user-profile shadow"
            :src="post.authorImg"
            alt="image de profil"
          />
        </div>

        <figcaption>
          {{ post.userName }} <br />
          <span class="date"> {{ timestamp }} </span>
        </figcaption>
      </div>
      <div class="modif">
        <!---- Button modal ---->
        <button
         v-if= "post.userId == user.userId || user.admin == true"
          type="button"
          class="btn btn-primary"
          @click="showModalPost = true"
        >
          <i class="fa-solid fa-pencil"></i>

        </button>
        <!---- Modal pour editer le post ---->
        <transition name="modalFade">
          <modal-update-post-comp
            v-if="showModalPost"
            title="Modifiez votre publication"
            @fermeLeModal="showModalPost = false"
          >
            <h2>Modifier votre publication</h2>
            <form @submit.prevent="UpdatePost" style="text-align: left">
              <div class="mb-3">
                <div class="form-floating">
                  <textarea
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
                  aria-label="Upload"
                  @change="uploadFile"
                  id="formFile"
                />
              </div>
              <div class="d-flex justify-content-between">
                <button class="btn btn-danger" @click="deletePost">
                  <i class="far fa-trash-alt delete me-2"></i> Supprimer ma
                  publication
                </button>

                <button
                
                  @click="UpdatePost"
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

    <div class="post-content">
      <p>{{ post.post }}</p>
      <div v-if="post.imageUrl != null">
        <img :src="post.imageUrl" alt="image du post" />
      </div>
    </div>
    <!---- Partie Like ---->

    <div class="like">
      <button type="button" class="btn like-btn" @click="likeIt()">
        <span class="badge">{{ post.likes }}</span>
        <i class="fa-solid fa-heart"></i>
      </button>
    </div>
    <div id="react"><p>Commenter</p></div>
  </div>
</template>

<script>
  import axios from 'axios'
  import ModalUpdatePostComp from './ModalUpdatePostComp.vue'

  export default {
    name: 'PostComp',
    components: {
      ModalUpdatePostComp,
    },
    // created() {
    //   this.newPost.post = this.post.post
    // },
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
        errMsg:'',
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
      // /*Afficher l'ensemble des publications*/
      // showAllPublications() {
      //   const token = localStorage.getItem('token');

      //   axios
      //     .get('publication/', {
      //       headers: {
      //         'Content-type': 'application/json',
      //         Authorization: `Bearer ${token}`,
      //       },
      //     })
      //     .then((res) => {
      //       this.publications.push(...res.data);
      //       console.log("c'est res iciii", res)
      //     })
      //     .catch((error) => {
      //       //console.log(error);
      //     });
      // },

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
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .then((res) => {
            console.log(res)
            this.$store.commit('updatePost', res.data.post)
            this.showModalPost = false
          })
          .catch((error) => {
            console.log( error)
            this.errMsg='Vous ne pouvez pas modifier votre publication pour le moment, veuillez réessayer plus tard.'
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
            this.$store.commit('deletePost', response.data)
            this.showModalPost = false
          })
          .catch((error) =>{
            console.log(error)
            this.errMsg='Vous ne pouvez pas supprimer votre publication pour le moment, veuillez réessayer plus tard.'
          } )
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
            console.log('response', response.data.post)
            this.$store.commit('updateLikes', response.data.post)
          })
          .catch((error) => console.log( error))
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
 
.reacts {
  display: flex;
  flex-direction: column;
}
 
.post-content {
  margin: -10px 100px;
}
.post-content img {
  width: 100%;
  margin: 10px 0px;
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
#react {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0px 100px;
  border-top: solid 1px;
}
#react p {
  width: 40%;
  text-align: center;
  padding: 15px 0px;
  border: dashed #aaaaaa;
  border-radius: 20px;
  cursor: pointer;
  border-width: 1px;
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
.fa-pencil{
  font-size: 1.2em;
}
  @media (max-width: 768px) {
    .picture-user-container {
      width: 65px!important;
    }
    .picture-user-profile {
      height: 70px;
    }
  }

</style>
