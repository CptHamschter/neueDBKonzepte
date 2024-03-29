<template> 
  <div>
    <h1>Hallo und herzlich willkommen auf unserer Nachrichtenseite</h1>

    <div class="Eventhinzufügen">
      <router-link to="/nachricht"><button @click="navigateToCreateNews">News hinzufügen</button></router-link>
    </div>
    
    <br>
    <br>
    
    <!-- Hier werden die Beiträge angezeigt -->
    <div v-if="posts.length > 0">
      <h2>Alle Beiträge:</h2>
      <ul>
        <li v-for="post in posts" :key="post._id">
          <h3>{{ post.title }}</h3>
          <p>{{ post.content }}</p>
          <p>Autor: {{ post.author.email }}</p>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Keine Beiträge gefunden</p>
    </div>
    
    
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'HauptSeite',

  components: {

  },

  data() {
    return {
      posts: []
    };
  },

  methods: {
    navigateToCreateNews() {
      // Hier kannst du zur Seite zum Erstellen von Nachrichten navigieren
    },
    fetchPosts() {
      // Hiermit rufst du die Beiträge vom Backend ab
      axios.get('http://localhost:27017/api/posts/') // Annahme: Dein Backend-Endpunkt ist '/api/posts'
        .then(response => {
          this.posts = response.data;
        })
        .catch(error => {
          console.error('Fehler beim Abrufen der Beiträge:', error);
        });
    }
  },

  mounted() {
    // Hier rufst du die Beiträge beim Laden der Seite ab
    this.fetchPosts();
  }
};
</script>
