<template>
    <form>     
        <label for="fileUpload">Bulk Upload</label>
        <input type="file" id="fileUpload" multiple @change="handleFileUpload" />
        
        <button type="submit">Submit</button>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const assetQuantity = ref(0);

function handleFileUpload(event) {
    const files = event.target.files;
    // Process the uploaded files here
}
</script>

<style scoped>
form {
    display: grid;
    gap: 1rem;
    margin: 0 auto;
    max-width: 400px;
    padding: 1rem;
}
</style>