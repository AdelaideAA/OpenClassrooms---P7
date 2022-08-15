<template>
  <div class="post-card">
    <div class="post-user">
      <div class="post-user-info">
        <img
          class="profile-picture"
          src="../assets/business-women-avatars-smiling-f.jpg"
          alt=""
        />

        <figcaption>
          {{ userName }} <br />
          <span class="date"> 28/07/2023 </span>
        </figcaption>
      </div>
      <div class="modif">
        <!-- Button trigger modal -->
        <button
          type="button"
          class="btn btn-primary"
          @click="showModalPost = true"
        >
          Modifier mon post
        </button>
        <transition name="modalFade">
          <modal-update-post-comp
          v-if="showModalPost"
            title="Modifiez votre publication"
            @fermeLeModal="showModalPost = false"
            
          >
            <h2>Ajoutez une description et/ou une photo</h2>
            <form @submit.prevent="UpdatePost" style="text-align: left">
              <div class="mb-3">
                <div class="form-floating">
                  <textarea
                    class="form-control text-left"
                    placeholder="ajoutez vos modifications"
                    id="floatingTextarea"
                    
                  ></textarea>
                  <label for="floatingTextarea">Description</label>
                </div>
              </div>
              <div class="mb-5">
                <label for="formFile" class="form-label"
                  >Changez votre photo ici</label
                >
                <input
                  class="form-control"
                  type="file"
                  aria-label="Upload"
                  @change="uploadFile"
                  id="formFile"
                />
              </div>
              <div class="d-flex justify-content-between">
                <button class="btn btn-danger" @click.prevent="deletePost">
                  <i class="far fa-trash-alt delete me-2"></i> Supprimer ma
                  publication
                </button>

                <button
                  @click="UpdatePost"
                  type="submit"
                  class="btn btn-primary"
                >
                  Submit
                </button>
              </div>

              <p>{{ errMsg }}</p>
            </form>
          </modal-update-post-comp>
        </transition>
        <button @click="editPost">Modifier</button>
        <button @click="deletePost()">Supprimer</button>
        <!-- <button id="cancel-btn">Annuler</button> -->
      </div>
    </div>

    <div class="post-content">
      <p>{{ contenu }}</p>
      <div v-if="image != null">
        <img :src="image" alt="image du post" />
        <p>image ici !!</p>
      </div>
    </div>

    <div class="like">
      <button type="button" class="btn btn-primary">
        <i class="fa-solid fa-thumbs-down"></i
        ><span class="badge text-bg-secondary">1</span></button
      ><button type="button" class="btn btn-primary">
        <i class="fa-solid fa-heart"></i
        ><span class="badge text-bg-secondary">1</span>
      </button>
    </div>

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
        
      };
    },
    props: ['contenu', 'image', 'userName'],
    methods: {
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
      uploadFile(event) {
        this.file = event.target.files[0];
      },
      UpdatePost(id) {
        //j'aimerais afficher un composant ou modal qui permettra de modifier (voir composant dans ModifyPostComp)
        // let formData = new FormData();
        // formData.append('post', this.post);
        // formData.append('file', this.file);
        //axios.put ('publication/' + id, formData, { headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')} })
      },
      /* pour supprimer le post */
      deletePost() {
        const token = localStorage.getItem('token');
        const id = this.$store.state.posts._id;
        console.log(id);
        // axios.delete('publication/' + id, { headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')} })
        // .then((response) => console.log(response))
        // .catch ((error) => console.log(error.response));
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
