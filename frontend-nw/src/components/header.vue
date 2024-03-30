<template>
  <header class="header">
    <div class="header-left">
      <h1 @click="navigateToHome">NEWS</h1>
    </div>
    <span @click="navigateToLogin">Login/Registrierung</span>
    <div class="header-right">
      <button @click="navigateToProfile">Profil</button>
      <button @click="navigateToSavedPosts">Gespeicherte Beiträge</button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'headerBar',
  
  methods: {
    navigateToHome() {
      // Hier implementieren Sie die Navigation zur Startseite
      this.$router.push('/');
    },
    navigateToProfile() {
      // Hier implementieren Sie die Navigation zur Profilseite
      this.$router.push('/profile');
    },
    navigateToSavedPosts() {
      // Hier implementieren Sie die Navigation zur Seite mit den gespeicherten Beiträgen
      this.$router.push('/saved-posts');
    },
    navigateToLogin() {
      // Hier implementieren Sie die Navigation zur Login/Registrierungsseite
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: white;
}

.header-left h1 {
  margin: 0;
  cursor: pointer;
}

.header-right button {
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #555;
  color: white;
  cursor: pointer;
}

.header-right button:hover {
  background-color: #777;
}
</style>
