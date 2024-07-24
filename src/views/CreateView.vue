<script setup lang="ts">
import { defineProps } from 'vue';
import BulkCreateAssetsForm from '@/components/BulkCreateAssetsForm.vue';
</script>

<template>
  <main>

    <h1>Create</h1>
    <p>Use this page to create multiple assets on your roblox account at once!</p>

    <BulkCreateAssetsForm />
    
  </main>
</template>

<style scoped>
  main {
    display: block;
    margin: 0 auto;
    min-width: 100%;
    height: 60vh;
  }

  h1 {
    color: white;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  ul {
    color: white;
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }
</style>