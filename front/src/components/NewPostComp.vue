<template>
  

  <div class="createStatus"></div>
  <main>
    <div class="mb-3">
      <div class="post-card">
        <form action="" @submit.prevent="createPost" class="form-post">
          <label for="postContent">Nouveau post</label>
          <div>
            <textarea
              name="post"
              id="postContent"
              cols="50"
              rows="2"
              placeholder="Que voulez vous partager aujourd'hui?"
              class="share-text"
            ></textarea>
            <input type="file" @change="uploadFile" class="share-picture" />
            <button type="submit" class="btn-post">Publier</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'NewPostComp',
  };
</script>

<style>
  .post-card {
    background-color: var(--secondary-color);
    border-radius: 10px;
    box-shadow: 0px 3px 10px 0px rgb(0 0 0 / 30%);
    margin-top: 5px;
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
</style>
