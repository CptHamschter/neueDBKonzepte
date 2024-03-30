<template>
  <div>
    <!-- Beitragsliste anzeigen -->
    <div v-if="posts.length > 0">
      <ul>
        <ul v-for="post in posts" :key="post._id">
          <h3>{{ post.title }}</h3>
          <p>{{ post.content }}</p>
          <p>Author: {{ post.author }}</p>
          <br>
          <br>
          <button @click="likePost(post._id)">
            <span v-if="post.likes.includes(currentUser._id)">❤️</span>
            <span v-else>🤍</span>
            Like
          </button>
          <br>
          <textarea v-model="newComment[post._id]"></textarea>
          <button @click="addComment(post._id)">Kommentar hinzufügen</button>
          <ul>
            <ul v-for="(comment, index) in post.comments" :key="index">
              <div style="text-align: right;">
                <p>{{ comment.body }}</p>
                <p>{{ comment.date }}</p>
              </div>
            </ul>
          </ul>
        </ul>
        <router-link to="/nachricht-bearbeiten"> <button> Nachricht bearbeiten</button></router-link>
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
  name: 'PostsPage',

  data() {
    return {
      posts: [],
      newComment: {}, // Ein Objekt, um die neuen Kommentare für jeden Beitrag zu speichern
      currentUser: {} // Informationen über den aktuellen Benutzer
    };
  },

  methods: {
    fetchPosts() {
      axios.get('http://localhost:27017/api/posts/')
        .then(response => {
          this.posts = response.data;
          // Initialisieren des newComment-Objekts für jeden Beitrag
          this.posts.forEach(post => {
            this.$set(this.newComment, post._id, '');
          });
        })
        .catch(error => {
          console.error('Fehler beim Abrufen der Beiträge:', error);
        });
    },
    likePost(postId) {
      axios.post(`http://localhost:27017/api/posts/${postId}/like`)
        .then(response => {
          // Aktualisiere den Like-Status des Beitrags in der lokalen Datenstruktur
          const index = this.posts.findIndex(post => post._id === postId);
          if (index !== -1) {
            this.posts[index].likes = response.data.likeCount;
          }
        })
        .catch(error => {
          console.error('Fehler beim Liken des Beitrags:', error);
        });
    },
    addComment(postId) {
      const comment = this.newComment[postId].trim();
      if (comment !== '') {
        axios.post(`http://localhost:27017/api/posts/${postId}/comment`, { comment })
          .then(response => {
            // Füge den Kommentar zum lokalen Beitrag hinzu
            const index = this.posts.findIndex(post => post._id === postId);
            if (index !== -1) {
              this.posts[index].comments.push(response.data.comments[response.data.comments.length - 1]);
              // Leere das Kommentarfeld
              this.newComment[postId] = '';
            }
          })
          .catch(error => {
            console.error('Fehler beim Hinzufügen des Kommentars:', error);
          });
      }
    },
    getCurrentUser() {
      // Hier kannst du den aktuellen Benutzer vom Backend abrufen
      // Beispiel: axios.get('http://localhost:27017/api/users/current')
      // .then(response => {
      //   this.currentUser = response.data;
      // })
      // .catch(error => {
      //   console.error('Fehler beim Abrufen der Benutzerdaten:', error);
      // });
      // Da die Benutzerinformationen nicht im Beispielcode vorhanden sind, setze ich es als leeres Objekt.
      this.currentUser = { _id: 'user123' }; // Beispiel für den aktuellen Benutzer
    }
  },

  mounted() {
    this.fetchPosts();
    this.getCurrentUser();
    this.posts.forEach(post => {
    this.newComment[post._id] = '';
  })
}
}
</script>
