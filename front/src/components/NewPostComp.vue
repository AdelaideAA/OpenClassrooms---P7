<template>
  <div class="card post-card mt-4">
    <form
      action=""
      @submit.prevent="createPost"
      class="form-post"
      name="myForm"
      id="myForm"
    >
      <label for="postContent">Nouveau post</label>
      <div>
        <textarea
          name="post"
          id="floatingTextarea"
          rows="2"
          placeholder="Que voulez vous partager aujourd'hui?"
          class="form-control text-left"
          v-model="post"
        ></textarea>
        
          <div class="mb-5">
            <label for="formFile" class="form-label"
              >Ajoutez une image ci dessous</label
            >
            <input
            name="file"
            accept="image/*"
              class="form-control"
              type="file"
              aria-label="Upload"
              @change="uploadFile"
              id="formFile"
            />
          </div>
          <!--******Si j'ai le temps je met en place une preview et je change le btn de l'input*******-->
          <!-- <div id="preview" v-if="preview">
                <img v-if="imageUrl" :src="imageUrl">
            </div>          -->
          <!-- <div class="image-upload">
            <label for="file-input">
              <i id="previewImg" class="fa-solid fa-image share-image"></i>
            </label>
            <input
              id="file-input"
              type="file"
              onchange="previewFile(this);"
              style="display: none"
            />
          </div> -->
        
        <button type="submit" class="btn-post">
          <i class="fa-solid fa-check"></i> Publier
        </button>
        <!-- <p>{{ errMsg }}</p> -->
      </div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'NewPostComp',

    data() {
      return {
        post: '',
        file: '',
        //preview: null,
        // errMsg: null,
      };
    },

    methods: {
      uploadFile(event) {
        this.file = event.target.files[0];
        console.log(this.file)
      },

      createPost() {
        /*Il faut qu'il y est quelque chose à poster*/
        // if (!this.message && !this.file) {
        //   this.errMsg = 'Vous devez envoyer une image ou un texte!';
        //   return;
        // }
        /* on créé un objet formData afin de pouvoir ajouter le texte et surtout le file choisi */

        let formData = new FormData();
        formData.append('post', this.post);
        formData.append('file', this.file);
        formData.append('userId', this.$store.state.user._id);
        formData.append('authorImg', this.$store.state.user.picture);
        formData.append(
          'userName',
          this.$store.state.user.firstName +
            ' ' +
            this.$store.state.user.lastName
        );

        /* envoi de l'objet formData via axios.post */
        axios
          .post('publication', formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,  
            },
          })
          .then((response) => {
            console.log( response);
            if (response.status === 201) {
              this.$store.commit('ajouterPost', response.data.post);
              this.post = '';
            }
          })
          .catch((error) => console.log(error));
      },
    },
  };
</script>

<style scoped>
.card{
  margin: auto;
  
}
  .form-post {
    padding: 5%;
    display: flex;
    flex-direction: column;

  }
  .btn-post {
    border-radius: 15px;
    background-color: var(--tertiary-color);
    transition: all 300ms ease-in-out;
    border: none;
    padding: 5px 13px;
    color: white;
  }
  .btn-post:hover {
    background-color: var(--primary-color);
    transform: scale(1.1);
  }

</style>
