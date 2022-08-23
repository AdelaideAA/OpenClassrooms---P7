<template>
<!---- Modal pour mettre à jour un post ---->
<div
      class="modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="Modifier la publication">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalLabel">{{ title }}</h5>
            <button
              role="button"
              type="button"
              class="close btn"
              aria-label="Close"
              @click="$emit('fermeLeModal')"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button
            role="button"
            aria-label="annuler les modifications"
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="$emit('fermeLeModal')"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div> 
</template>

<script>
export default {
  name: 'ModalUpdatePostComp',
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