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
          <button @click="likePost(post._id)">Like</button> <!-- Button zum Liken -->
          <button @click="toggleCommentBox(post._id)">Kommentar verfassen</button> <!-- Button zum Öffnen des Kommentarformulars -->
          <div v-if="showCommentBox[post._id]">
            <textarea v-model="newComment[post._id]"></textarea>
            <button @click="addComment(post._id)">Kommentar hinzufügen</button>
          </div>
          <ul>
            <li v-for="(comment, index) in post.comments" :key="index">
              {{ comment }}
            </li>
          </ul>
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

  data() {
    return {
      posts: [],
      newComment: {}, // Ein Objekt, um die neuen Kommentare für jeden Beitrag zu speichern
      showCommentBox: {} // Ein Objekt, um zu verfolgen, ob das Kommentarformular für jeden Beitrag angezeigt wird
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
          // Initialisieren der neuen Kommentar- und showCommentBox-Objekte
          this.posts.forEach(post => {
            this.$set(this.newComment, post._id, '');
            this.$set(this.showCommentBox, post._id, false);
          });
        })
        .catch(error => {
          console.error('Fehler beim Abrufen der Beiträge:', error);
        });
    },
    likePost(postId) {
      axios.post(`http://localhost:27017/api/posts/${postId}/like`)
        .then(() => {
          // Aktualisieren Sie die Beitragsdaten, um den aktualisierten Like-Status anzuzeigen
          this.fetchPosts();
        })
        .catch(error => {
          console.error('Fehler beim Liken des Beitrags:', error);
        });
    },
    toggleCommentBox(postId) {
      this.$set(this.showCommentBox, postId, !this.showCommentBox[postId]);
    },
    addComment(postId) {
      const comment = this.newComment[postId];
      if (comment.trim() !== '') {
        axios.post(`http://localhost:27017/api/posts/${postId}/comment`, { comment })
          .then(() => {
            // Aktualisieren Sie die Beitragsdaten, um den neuen Kommentar anzuzeigen
            this.fetchPosts();
            this.newComment[postId] = ''; // Zurücksetzen des Kommentartexts nach dem Hinzufügen
          })
          .catch(error => {
            console.error('Fehler beim Hinzufügen des Kommentars:', error);
          });
      }
    }
  },

  mounted() {
    // Hier rufst du die Beiträge beim Laden der Seite ab
    this.fetchPosts();
  }
};
</script>
