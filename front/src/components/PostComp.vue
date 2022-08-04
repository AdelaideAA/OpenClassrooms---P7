<template>
  <main>
    <div class="post">
      <figure class="post-user-info">
        <div>
          <img class="profile-picture" src="" alt="" />
          <figcaption>
            Sandra <br />
            <span class="date"> 28/07/2023 </span>
          </figcaption>
        </div>
        <div class="reacts">
          <button id="edit-menu" class="dropdown-button">
            <p>...</p>
            <p>!!!</p>
          </button>
          <div class="dropdown-content"></div>
          <button>Modifier</button>
          <button>Supprimer</button>
          <button id="cancel-btn">Annuler</button>
        </div>
        <span class="likes">3</span>
        <span class="dislikes">1</span>
      </figure>
      <div class="post-content">
        <p>Je post du contenu</p>
        <div><img src="" alt="image du post" /></div>
      </div>
      <div id="react"><p>Réagir</p></div>
    </div>
  </main>

  <p>je viens de postcomp</p>
</template>

<script>
  import NewPostComp from '@/components/NewPostComp.vue';
  export default {
    name: 'PostComp',
    components: {
      NewPostComp,
    },
  };
</script>

<style>
  .dropdown-button {
    outline: none;
    border: none;
    background: transparent;
    margin: 60px 0px;
    position: absolute;
    border-radius: 50px;
    padding: 0px 15px 8px;
  }
  .dropdown p {
    font-size: 30px;
    line-height: 0%;
    margin: 0px 0px 8px;
  }
  .dropdown {
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    margin: 0px 20px;
  }
  #cancel-btn {
    border: transparent;
  }
  .dropdown-content {
    position: absolute;
    display: none;
    flex-direction: column;
    width: 100px;
    margin: 60px 0px;
    border: 1px solid;
    border-radius: 20px;
    background: #f2f2f2;
    overflow: hidden;
  }
  .dropdown-content button {
    padding: 5px;
    outline: none;
    background: transparent;
    border: none;
    border-bottom: dashed 1px;
  }
  .chooseReact:hover {
    background: linear-gradient(to left, #f2ccf2 50%, #ccf2cc 50%);
    background-size: 200%;
  }
  .reactLike {
    background: #ccf2cc;
  }
  .reactDislike {
    background: #f2ccf2;
  }
  #info-container {
    display: flex;
  }
  .reacts {
    display: flex;
    flex-direction: column;
  }
  .likes,
  .dislikes {
    position: absolute;
    margin-left: 5px;
    padding: 5px 10px;
    border-radius: 50%;
  }
  .likes {
    background: #ccf2cc;
  }
  .dislikes {
    background: #f2ccf2;
    margin-top: 30px;
  }
  .newcomment {
    display: flex;
    justify-content: space-around;
    display: none;
    padding: 5px 0px 20px;
  }
  input {
    width: 80%;
    border-radius: 50px;
    padding: 10px;
    outline: none;
  }
  .post {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 30px auto;
    background: #f2f2f2;
    border-radius: 50px;
  }
  .post-user-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 20px;
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
</style>
