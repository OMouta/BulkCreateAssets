<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

  <header>
    <nav>
      <button><RouterLink to="/">Home</RouterLink></button>
      <button><RouterLink to="/create">Create</RouterLink></button>
    </nav>

    <div class="account">
      <button><RouterLink to="/login">Login</RouterLink></button>
    </div>
  </header>

  <RouterView />
  <footer>
    <p>Made with ❤️ by <a href="https://github.com/OMouta">@OMouta</a></p>
    <p>Check out this project on <a href="https://github.com/OMouta">github</a></p>
  </footer>
</template>

<style scoped>

header {
  color: white;
  padding: 1rem;
  text-align: center;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

nav {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.account {
  margin-left: auto;
}

footer {
  background-color: var(--color-primary);
  color: white;
  padding: 1rem;
  text-align: center;
}

</style>