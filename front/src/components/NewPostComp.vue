<template>
  <div class="post-card">
    <!-- 
      <div class="post-user-info">
        <img class="profile-picture" src="user.photo" alt="" />
        <figcaption>
          Sandra <br />
          <span class="date"> 28/07/2023 </span>
        </figcaption>
      
          
        </div> -->
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
          id="postContent"
          cols="50"
          rows="2"
          placeholder="Que voulez vous partager aujourd'hui?"
          class="share-text"
          v-model="post"
        ></textarea>
        <div class="share">
          <input
            name="file"
            type="file"
            accept="image/png, image/jpeg"
            @change="uploadFile"
            class="share-picture"
          />
<!-- <div id="preview" v-if="preview">
                <img :src="preview" :alt="preview">
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
        </div>
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
      //       uploadFile(event) {
      //  /* sur le onchange on va attribuer cette valeur à file (nécessaire pour l'envoi au backend) */
      //             this.file = this.$refs.file.files[0]
      //             let input = event.target
      //             if(input.files) {
      //                 let reader = new FileReader()
      //                 reader.onload = (e) => {
      //                     this.preview = e.target.result
      //                 }
      //                 reader.readAsDataURL(input.files[0])
      //             }

      //       },

      createPost() {
        /*Il faut qu'il y est quelque chose à poster*/
        // if (!this.formData.message && !this.formData.file) {
        //   this.errMsg = 'Vous devez envoyer une image ou un texte!';
        //   return;
        // }
        /* on créé un objet formData afin de pouvoir ajouter le texte et surtout le file choisi */

        let formData = new FormData();
        formData.append('post', this.post);
        formData.append('file', this.file);
        formData.append('userId', this.$store.state.user._id);
        
        console.log(this.post);
        console.log(this.file);

        /* envoi du form via axios.put de l'objet formData */
        axios
          .post('publication', formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((response) => console.log(response))
          .catch((error) => console.log(error));
      },
    },
  };
</script>

<style>
  .share-image {
    font-size: 20px;
  }
  .post-card {
    background-color: var(--secondary-color);
    border-radius: 10px;
    box-shadow: 0px 3px 10px 0px rgb(0 0 0 / 30%);
    margin: auto;
    padding: 20px;
    margin: 30px 10px;
  }
  .form-post {
    padding: 5%;
    display: flex;
    flex-direction: column;
  }
  .share-picture {
    border-radius: 15px;
    align-self: center;
  }
  .share-text {
    border-radius: 15px;
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
  .share {
    border-top: 1px solid;
    margin-top: 8px;
  }
</style>
