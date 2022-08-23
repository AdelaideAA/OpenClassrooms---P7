<template>
  <header>
    <div class="bloc-color"></div>
    <div class="img-cont mb-5">
      <img alt="Logo, Groupomania" src="../assets/icon-left-font.png" />
    </div>
  </header>
</template>

<style>
.bloc-color {
  width: 100%;
  background-color: var(--secondary-color);
  min-height: 60px;
}

.fa {
  font-size: 1.2em;
}

.img-cont {
  max-height: 250px;
  width: 100%;
  background-color: white;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.img-cont img {
  object-fit: none;
  width: 100%;
  padding-right: 20px;
  max-height: inherit;
}

@media (max-width: 992px) {
  .img-cont {
    max-height: 150px;
  }
  .img-cont img{
    object-fit: cover;
  }

}
</style>