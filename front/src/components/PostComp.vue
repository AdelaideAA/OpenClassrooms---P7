<template>
  <!--***************card de post*************-->
  <div class="post-card">
    <div class="post-user">
      <div class="post-user-info">
        <img class="profile-picture" :src="$store.state.user.picture" alt="" />

        <figcaption>
          {{ userName }} <br />
          <span class="date"> 28/07/2023 </span>
        </figcaption>
      </div>
      <div class="modif">
        <!-- Button modal -->
        <button
          type="button"
          class="btn btn-primary"
          @click="showModalPost = true"
        >
          Modifier mon post
        </button>
        <!--***********Modal pour editer le post***************-->
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
                    v-model="post.post"
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
                <button class="btn btn-danger" @click="deletePost(), reload()">
                  <i class="far fa-trash-alt delete me-2"></i> Supprimer ma
                  publication
                </button>

                <button
                  @click="UpdatePost(), reload()"
                  type="submit"
                  class="btn btn-primary"
                >
                  Enregistrer les modifications
                </button>
              </div>

              <!-- <p>{{ errMsg }}</p> -->
            </form>
          </modal-update-post-comp>
        </transition>
      </div>
    </div>

    <div class="post-content">
      <p>{{ contenu }}</p>
      <div v-if="image != null">
        <img :src="image" alt="image du post" />
      </div>
    </div>
    <!--*********Partie Like et dislike***************-->

    <div class="like">
      <button type="button" class="btn btn-primary" @click="likeIt()">
        <i class="fa-solid fa-heart"></i
        ><span class="badge text-bg-secondary">{{ like }}</span>
      </button>
      <button type="button" class="btn btn-primary" @click="dislikeIt()">
        <i class="fa-solid fa-thumbs-down"></i
        ><span class="badge text-bg-secondary">{{ dislike }}</span>
      </button>
    </div>

    <!-- <like-comp></like-comp> -->
    <div id="react"><p>Commenter</p></div>
  </div>
</template>

<script>
  import axios from 'axios';
  import ModalUpdatePostComp from './ModalUpdatePostComp.vue';

  export default {
    name: 'PostComp',
    components: {
      ModalUpdatePostComp,
    },
    data() {
      return {
        publications: [],
        showModalPost: false,
        post: {
          post: '',
          image: '',
        },
        liked: Boolean,
        like: 0,
        dislike: 0,
      };
    },
    props: ['id', 'contenu', 'image', 'userName'],

    methods: {
      /*Afficher l'ensemble des publications*/
      showAllPublications() {
        const token = localStorage.getItem('token');
        
        axios
          .get('publication/', {
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            this.publications.push(...res.data);
           
          })
          .catch((error) => {
            console.log(error);
          });
      },
      /*Choisir une nouvelle image*/
      uploadFile(event) {
        this.post.image = event.target.files[0];
      },

      /* Modifier et envoyer le nouveau post */
      async UpdatePost() {
        //j'aimerais afficher un composant ou modal qui permettra de modifier (voir composant dans ModifyPostComp)
        const token = localStorage.getItem('token');
        let formData = new FormData();
        formData.append('post', this.post.post);
        formData.append('file', this.post.image);
        formData.append('id', this.id);
       

        await axios
          .put('publication/' + this.id, formData, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .then((res) => {
            console.log(res);
            this.$store.commit('updatePost', res.data);
            this.showModalPost = false;
          })
          .catch((error) => console.log(error));
      },
      /* Supprimer le post */

      deletePost() {
        const token = localStorage.getItem('token');
        // //const id = this.$store.state.posts._id;
        // for( let i=0; i < this.$store.state.posts.length; i++) {
        //   let post = this.$store.state.posts[i]
        axios
          .delete('publication/' + this.id, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .then((response) => {
            console.log(response);
            this.showModalPost = false;
          })
          .catch((error) => console.log(error.response));
      },
      /*****Refresh la page suite aux modifications*****/
      reload() {
        setTimeout("window.open(self.location, '_self');", 500);
      },

      /****************Like et dislikes*************** */
      likeIt() {
        const userId = this.$store.state.user._id;
        const postId = this.id;
        this.like++;
        const data = {
          like: this.like,
          userId,
          postId,
        };

        //console.log(data);
        //const idParams = this.id

        //route à utiliser :
        axios
          .post(`publication/${postId}/like/`, data, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .then((response) => console.log(response));
      },

      dislikeIt() {
        const userId = this.$store.state.user._id;
        const postId = this.id;
        this.dislike++;
        const data = {
          dislike: this.dislike,
          userId,
          postId,
        };

         axios
          .post(`publication/${postId}/like/`, data, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .then((response) => console.log(response));
        
      },
    },
  };
</script>

<style>
  .post-user {
    display: flex;
    justify-content: space-between;
  }
  .post-user-info {
    display: flex;
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
</style>
