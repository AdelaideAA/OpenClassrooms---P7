<template>
<!----Créer un nouveau post ---->
  <article class="card post-card mb-4 shadow-sm">
    <form
      action=""
      @submit.prevent="createPost"
      class="form-post p-2"
      name="myForm"
      id="myForm"
      aria-label="Formulaire de création d'un post"
    >
      <div class="row">
        <div class="col-2">
          <avatar-compo></avatar-compo>
        </div>
        <div class="col-10">
          <label class="new-post" for="postContent">Nouveau post</label>

          <div>
            <textarea
              name="post"
              id="floatingTextarea"
              rows="2"
              placeholder="Que voulez vous partager aujourd'hui?"
              class="form-control text-left"
              v-model="post"
              aria-label="champs pour le message du post"
            ></textarea>

            <div class="mb-5">
              <label for="formFile" class="form-label"
                >Ajoutez une image ci dessous</label
              >
              <input
              :key="fileInputKey"
                name="file"
                accept="image/*"
                class="form-control"
                type="file"
                aria-label="Chargez une image"
                @change="uploadFile"
                id="formFile"
              />
            </div>
            <p class="err-msg">{{ errMsg }}</p>
            <button role="button" type="submit" class="btn-post">
              <fa icon="check" />
               Publier
            </button>
            
          </div>
        </div>
      </div>
    </form>
  </article>
</template>

<script>
  import axios from 'axios';

  import AvatarCompo from './AvatarCompo.vue';
  export default {
    components: { AvatarCompo },
    name: 'NewPostComp',

    data() {
      return {
        post: '',
        file: '',
        errMsg: null,
        fileInputKey: 0,
      };
    },

    methods: {
      uploadFile(event) {
        this.file = event.target.files[0];
      },

      createPost() {
        /*Il faut qu'il y est quelque chose à poster*/
        if (!this.post && !this.file) {
          this.errMsg = 'Vous devez publier une image ou un texte!';
          return;
        }

        /* on créé un objet formData qui va contenir les élements à poster*/
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
            if (response.status === 201) {
              this.$store.commit('ajouterPost', response.data.post);
              this.post = '';
              this.file = '';
              this.fileInputKey++;
              this.$emit("postCree", true)
              
            }
          })
          .catch((error) => {
            console.log(error);
            this.errMsg = error.response.data.message
              ? error.response.data.message
              : error;

          })
          
      },
    },
  };
</script>

<style scoped>
  .card {
    margin: auto;
  }

  .post-card {
    border: none;
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
  .err-msg{
    color: var(--primary-color);
    font-weight: 400;
  }
  @media(max-width: 768px){
    .new-post{
      margin-top: 15px;
    margin-bottom: 20px;
    }
    .mb-5{
      margin-top: 1rem;
      margin-bottom: 2rem!important;
    }
  }
</style>
