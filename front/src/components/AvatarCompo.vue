<template>
  <div class="picture-user-container mx-auto">
    <img
      class="picture-user-profile shadow"
      :src="$store.state.user.picture"
      alt="image de profil"
    />
  </div>
</template>

<script>
export default {
    name: 'AvatarCompo'

}
</script>

<style>
.picture-user-container {
  width: 78px;
}
.picture-user-profile {
  border-radius: 50%;
  padding: 0;
  height: 78px;
  object-fit: cover;
}
</style>