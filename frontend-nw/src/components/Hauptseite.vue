<template>
  <div class="main-page">
    <h1 class="main-title">Willkommen auf unserer Nachrichtenseite</h1>

    <div class="add-event">
      <router-link to="/nachricht">
        <button class="add-news-button">Neue Nachricht hinzufügen</button>
      </router-link>
    </div>
    
    <br>
    <br>
   
    <PostsPage/>
    
  </div>
</template>

<script>
import PostsPage from '@/components/Nachrichten.vue'

export default {
  name: 'MainPage',
  components: {
    PostsPage,
  },
}
</script>

<style scoped>
.main-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.main-title {
  text-align: center;
  font-size: 32px;
  margin-bottom: 20px;
}

.add-event {
  text-align: center;
}

.add-news-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-news-button:hover {
  background-color: #0056b3;
}
</style>
