<template>
  <div v-if="userRole === 'journalist'">
    <h1>Nachricht erstellen</h1>
    <form @submit.prevent="submitPost">
      <div>
        <label for="title">Titel:</label>
        <input type="text" id="title" v-model="title">
      </div>
      <div>
        <label for="content">Inhalt:</label>
        <textarea id="content" v-model="content"></textarea>
      </div>
      <div>
        <button type="submit">Nachricht erstellen</button>
      </div>
    </form>
  </div>
  <div v-else>
    <p>Du hast keine Berechtigung, Beiträge zu erstellen.</p>
  </div>
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode'; // Importieren Sie den benannten Export jwtDecode, um das JWT-Token zu decodieren

export default {
  name: "NachrichtenErstellen",
  data() {
    return {
      title: '',
      content: '',
      userRole: ''
    };
  },
  methods: {
    async submitPost() {
      try {
        // Überprüfen, ob der Benutzer die Rolle eines Journalisten hat
        if (this.userRole === 'journalist') {
          const response = await axios.post('http://localhost:27017/api/posts/post-erstellen', {
            title: this.title,
            content: this.content
          });
          console.log('Nachricht erfolgreich erstellt:', response.data);
          // Nachricht wurde erfolgreich erstellt, rufe die Beiträge erneut ab
          this.$emit('postCreated'); // Emit an event to notify parent component
        } else {
          console.log('Du hast keine Berechtigung, Beiträge zu erstellen.');
          // Hier kannst du eine Meldung anzeigen, dass der Benutzer keine Berechtigung hat
        }
      } catch (error) {
        console.error('Fehler beim Erstellen der Nachricht:', error);
        // Hier kannst du eine Fehlermeldung anzeigen
      }
    },
    // Methode zum Extrahieren der Benutzerrolle aus dem JWT-Token
    extractUserRoleFromToken(token) {
      try {
        const decodedToken = jwt_decode(token);
        console.log('Decoded Token:', decodedToken); // Überprüfen Sie, ob das Token erfolgreich decodiert wurde und die Benutzerrolle vorhanden ist
        return decodedToken.role;
      } catch (error) {
        console.error('Fehler beim Extrahieren der Benutzerrolle aus dem Token:', error);
        return null;
      }
    }
  },
  mounted() {
    const token = sessionStorage.getItem('token');
    console.log('Token:', token); // Überprüfen Sie, ob das Token korrekt im Session Storage gespeichert ist
    if (token) {
      this.userRole = this.extractUserRoleFromToken(token);
      console.log('User Role:', this.userRole); // Überprüfen Sie, ob die Benutzerrolle erfolgreich extrahiert wurde
    }
  }
};
</script>
