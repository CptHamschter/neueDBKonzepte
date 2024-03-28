<template>
  <div>
    <div class="news-box">
      <div class="news-thumbnail">
        <img :src="messageData.image" alt="News Thumbnail">
      </div>
      <div class="news-inhalt">
        <h2>{{ messageData.title }}</h2>
        <p>{{ messageData.description }}</p>
        <button @click="showCommentBox = !showCommentBox">Kommentar verfassen</button>
        <br>
        <textarea v-if="showCommentBox" v-model="newComment"></textarea>
        <br>
        <button v-if="showCommentBox" @click="addComment">Kommentar hinzufügen</button>
      </div>
      <div class="news-kommentare">
        <h3>Kommentare</h3>
        <ul>
          <li v-for="(comment, index) in messageData.comments" :key="index">
            {{ comment }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NachrichtenFeld',
  
  data() {
    return {
      messageData: {
        title: "Neue Nachricht",
        description: "Beschreibung der Nachricht",
        image: "URL zum Bild der Nachricht",
        comments: ["Kommentar 1", "Kommentar 2", "Kommentar 3"]
      },
      showCommentBox: false,
      newComment: ''
    };
  },

  methods: {
    addComment() {
      if (this.newComment.trim() !== '') {
        this.messageData.comments.push(this.newComment);
        this.newComment = '';
      }
    }
  }
};
</script>

<style scoped>
.news-box {
  display: flex;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.news-thumbnail {
  flex: 0 0 30%;
}

.news-thumbnail img {
  width: 100%;
  border-radius: 5px 0 0 5px;
}

.news-inhalt {
  flex: 1;
  padding: 10px;
}

.news-kommentare {
  flex: 0 0 30%;
  padding: 10px;
  border-left: 1px solid #ccc;
}

.news-kommentare h3 {
  margin-top: 0;
}
</style>
