<template>
  <Header />
  <div class="main">
    <h1>Fil d'actualités</h1>
    <main>
      <section>
        <p>Place aux publications</p>
      </section>
    </main>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components: {
    Header,
  },
};
</script>

<style>
.main {
  background: #FFD7D7;
}
</style>
