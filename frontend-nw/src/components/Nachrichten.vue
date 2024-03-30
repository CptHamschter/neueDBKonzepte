<template>
  <div class="posts-container">
    <div v-if="posts.length > 0" class="posts-list">
      <div v-for="post in posts" :key="post._id" class="post-card">
        <h3 class="post-title">{{ post.title }}</h3>
        <p>{{ post.content }}</p>
        <p>Author: {{ post.author.email }}</p>
        <div class="post-actions">
          <button @click="likePost(post._id)" class="like-button">
            <span :class="{ 'liked': isLiked(post._id) }">
              <span v-if="isLiked(post._id)" class="heart">❤️</span>
              <span v-else class="heart-empty">🤍</span>
              Like
            </span>
          </button>
          <button if="canDeletePost()" @click="deletePost(post._id)" class="delete-button">Delete</button>
          <router-link :to="'/nachricht-bearbeiten/' + post._id" class="edit-link">Nachricht bearbeiten</router-link>
        </div><div class="comment-section">
          <h4>Kommentare:</h4>
          <div v-for="comment in post.comments" :key="comment._id" class="comment">
            <p>{{ comment.body }}</p>
            <p v-if="comment.author">{{ comment.author.email }}</p>
            <!-- Hier können Sie weitere Kommentarinformationen anzeigen, wie das Datum -->
          </div>
          <textarea v-model="newComment" placeholder="Schreiben Sie einen Kommentar"></textarea>
          <button @click="addComment(post._id)">Kommentar hinzufügen</button>
        </div>
      </div>
    </div>
    <div v-else class="no-posts">
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
      currentUser: null,
      newComment: ''
    };
  },

  methods: {
    fetchPosts() {
      axios.get('http://localhost:27017/api/posts/')
        .then(response => {
          this.posts = response.data;
        })
        .catch(error => {
          console.error('Fehler beim Abrufen der Beiträge:', error);
        });
    },

    likePost(postId) {
      axios.post(`http://localhost:27017/api/posts/${postId}/like`, null, {
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
      })
        .then(response => {
          const index = this.posts.findIndex(post => post._id === postId);
          if (index !== -1) {
            this.posts[index].likes = response.data.likeCount;
          }
          console.log('Beitrag geliked');
          this.fetchPosts();
        })
        .catch(error => {
          console.error('Fehler beim Liken des Beitrags:', error);
          console.log('Beitrag konnte nicht geliked werden');
        });
    },

    isLiked(postId) {
      const post = this.posts.find(post => post._id === postId);
      if (post && Array.isArray(post.likes) && this.currentUser && post.likes.includes(this.currentUser._id)) {
        return true;
      }
      return false;
    },

    canDeletePost() {
      return !!this.currentUser;
    },

    deletePost(postId) {
      axios.delete(`http://localhost:27017/api/posts/${postId}`, {
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
      })
        .then(response => {
          console.log('Beitrag gelöscht:', response);
          this.fetchPosts(); // Aktualisieren Sie die Beitragliste nach dem Löschen
        })
        .catch(error => {
          console.error('Fehler beim Löschen des Beitrags:', error);
        });
    },
    
    addComment(postId) {
      axios.post(`http://localhost:27017/api/posts/${postId}/comment`, { comment: this.newComment }, {
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
      })
        .then(response => {
          console.log('Kommentar hinzugefügt:', response.data);
          // Aktualisieren Sie die Liste der Beiträge, um den neuen Kommentar anzuzeigen
          this.fetchPosts();
          // Setzen Sie das Eingabefeld für den Kommentar zurück
          this.newComment = '';
        })
        .catch(error => {
          console.error('Fehler beim Hinzufügen des Kommentars:', error);
        });
    }
  },

  mounted() {
    this.fetchPosts();
    // Setzen Sie currentUser basierend auf Ihrer Implementierung
  }
}
</script>

<style scoped>
.posts-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.posts-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.post-card {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
}

.post-title {
  margin-bottom: 10px;
}

.post-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.like-button, .delete-button, .edit-link {
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 10px; /* Abstand zwischen den Buttons */
  flex: 1; /* Alle Buttons nehmen gleich viel Platz ein */
  text-align: center; /* Zentrieren des Texts */
}

.like-button {
  background: linear-gradient(45deg, #007bff, #0056b3); /* Schöner Farbübergang */
}

.delete-button {
  background: linear-gradient(45deg, #dc3545, #c82333); /* Schöner Farbübergang */
}

.edit-link {
  background: linear-gradient(45deg, #ffc107, #e0a800); /* Schöner Farbübergang */
}

.like-button:hover, .delete-button:hover, .edit-link:hover {
  filter: brightness(1.1); /* Helligkeit beim Überfahren erhöhen */
}

.liked .heart {
  color: red;
}

.no-posts {
  margin-top: 20px;
}
.comment-section {
  margin-top: 20px;
}

.comment {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.comment textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

.comment button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.comment button:hover {
  background-color: #0056b3;
}
</style>
