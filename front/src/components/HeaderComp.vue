<template>
  <header>
    <ul class="nav justify-content-evenly bloc-color">
      <li class="nav-item">
        <router-link class="nav-link" to="/login">
          <i class="fa fa-users" aria-hidden="true"></i>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/login">
          <i class="fa fa-home" aria-hidden="true"></i>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/login">
          <i class="fa fa-sign-in" aria-hidden="true"></i>
        </router-link>
      </li>
    </ul>
  </header>
</template>

<style>
.bloc-color {
  width: 100%;
  background-color: var(--secondary-color);
  min-height: 60px;
}

.nav {
  height: 60px;
  align-items: center;
}
.nav-link {
  color: #4e5166;
}

.img-cont {
  max-height: 280px;
  overflow: hidden;
  display: flex;
  align-items: center;
}
img {
  padding-right: 20px;
}

.fa {
  font-size: 1.2em;
}
</style>