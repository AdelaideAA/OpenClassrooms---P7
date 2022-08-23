<template>
  <div>
    <!---- Modal Pour mettre à jour son profil ---->
    <div
      class="modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="Modifications des informations de l'utilisateur"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalLabel">{{ title }}</h5>
            <button
              type="button"
              class="close btn"
              aria-label="Close"
              @click="$emit('fermeLModal')"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button
            aria-label="Annuler les modififcations"
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="$emit('fermeLModal')"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ModalComp",
    props: ["title"]

  }
</script>

<style scoped>
.modal {
  display: block;
  background-color: #4d47478a;
  backdrop-filter: blur(1px);
}

.close{
  font-size: 1.5em;
}




</style>