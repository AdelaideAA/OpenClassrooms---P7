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
          Sandra <br />
          <span class="date"> 28/07/2023 </span>
        </figcaption>
      </div>
      <div class="modif">
        <button>Modifier</button>
        <button>Supprimer</button>
        <!-- <button id="cancel-btn">Annuler</button> -->
      </div>
    </div>

    <div class="post-content">
      <p>Je post du contenu</p>
      <div><img src="" alt="image du post" /></div>
    </div>

    <div class="like">
      <button type="button" class="btn btn-primary">
        <i class="fa-solid fa-thumbs-down"></i
        ><span class="badge text-bg-secondary">1</span>
      </button><button type="button" class="btn btn-primary">
        <i class="fa-solid fa-heart"></i><span class="badge text-bg-secondary">1</span>
      </button>
    </div>

    <div id="react"><p>Commenter</p></div>
  </div>
</template>

<script>
  export default {
    name: 'PostComp',
    data() {
      return {
        publications: [],
      };
    },
    components: {},
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
</style>
