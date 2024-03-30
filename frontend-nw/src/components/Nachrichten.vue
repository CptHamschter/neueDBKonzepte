<template>
  <div class="posts-container">
    <div v-if="posts.length > 0" class="posts-list">
      <div v-for="post in posts" :key="post._id" class="post-card">
        <div class="post-content">
          <img class="bild" src="../assets/BeitragsBilder.jpg" alt="Post-Bild">
          <div class="post-text">
            <h3 class="post-title">{{ post.title }}</h3>
            <p>{{ post.content }}</p>
            <p>Author: {{ post.author.email }}</p>
          </div>
        </div>
        
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
        </div>
        <div class="comment-section">
          <h4>Kommentare:</h4>
          <div v-for="comment in post.comments" :key="comment._id" class="comment">
            <p>{{ comment.body }}</p>
            <p v-if="comment.author">{{ comment.author.email }}</p>
            <!-- Hier können Sie weitere Kommentarinformationen anzeigen, wie das Datum -->
          </div>
          <textarea v-model="comments[post._id]" :placeholder="'Schreiben Sie einen Kommentar zu ' + post.title"></textarea>
          <br>
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
      newComment: '',
      currentUser: sessionStorage.getItem('userId'),
      comments: {} // Initialisierung des comments-Objekts
    };
  },

  created() {
    this.fetchPosts();
  },

  methods: {
    fetchPosts() {
      axios.get('http://localhost:27017/api/posts/')
        .then(response => {
          this.posts = response.data;
           // Initialisieren Sie das Kommentarobjekt für jeden Beitrag
           this.posts.forEach(post => {
            this.comments[post._id] = '';
          });
        })
        .catch(error => {
          console.error('Fehler beim Abrufen der Beiträge:', error);
        });
    },

    likePost(postId) {
      axios.post(`http://localhost:27017/api/posts/${postId}/like`, {}, {
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
      })
      .then(response => {
        const index = this.posts.findIndex(post => post._id === postId);
        if (index !== -1) {
          this.posts[index].likeCount = response.data.likeCount;
          
          const userLikes = JSON.parse(localStorage.getItem('userLikes')) || [];
          const userIndex = userLikes.indexOf(postId);
          
          if (userIndex === -1) {
            userLikes.push(postId);
          } else {
            userLikes.splice(userIndex, 1);
          }
          
          localStorage.setItem('userLikes', JSON.stringify(userLikes));
          this.$forceUpdate(); // Erzwingen der Aktualisierung der Ansicht
        }
      })
      .catch(error => {
        console.error('Fehler beim Liken/Entliken des Beitrags:', error);
      });
    },

    isLiked(postId) {
      const userLikes = JSON.parse(localStorage.getItem('userLikes')) || [];
      return userLikes.includes(postId);
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
  // Überprüfen, ob der Kommentar mindestens ein Wort enthält
  if (!this.comments[postId].trim()) {
    console.error('Kommentar nicht vollständig');
    return; // Stoppen Sie die Methode hier, wenn der Kommentar nicht vollständig ist
  }

  axios.post(`http://localhost:27017/api/posts/${postId}/comment`, { comment: this.comments[postId] }, {
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
  })
    .then(response => {
      console.log('Kommentar hinzugefügt:', response.data);
      // Aktualisieren Sie die Liste der Beiträge, um den neuen Kommentar anzuzeigen
      this.fetchPosts();
      // Setzen Sie das Eingabefeld für den Kommentar zurück
      this.comments[postId] = '';
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
  gap: 20px;
}

.post-card {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  width: 120%; /* Ändern der Breite der Beitragsbox */
}

.post-content {
  display: flex;
  align-items: center;
}

.bild {
height: 100%;
  width: 30%; /* Anpassen der Breite des Bildes */
  /* Automatische Anpassung der Höhe */
  padding-right: 20px/* Hinzufügen von Abstand zwischen Bild und Text */
}

.post-text {
  flex: 1;
}

.post-title {
  margin-bottom: 10px;
}

.post-actions {
  display: flex;
  justify-content: center; /* Zentrieren der Buttons */
  margin-top: 10px; /* Hinzufügen von Abstand oberhalb der Buttons */
}

.like-button, .delete-button, .edit-link {
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 10px;
}

.like-button {
  background: linear-gradient(45deg, #007bff, #0056b3);
}

.delete-button {
  background: linear-gradient(45deg, #dc3545, #c82333);
}

.edit-link {
  background: linear-gradient(45deg, #ffc107, #e0a800);
}

.like-button:hover, .delete-button:hover, .edit-link:hover {
  filter: brightness(1.1);
}

.liked .heart {
  color: red;
}

.comment-section {
  margin-top: 20px;
}

.comment {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.comment textarea {
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
