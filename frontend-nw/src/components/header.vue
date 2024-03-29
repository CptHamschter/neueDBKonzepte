<template>
    <header class="header">
      <div class="header-left">
        <router-link to="/"><h1>NEWS</h1></router-link> 
      </div>
      <router-link to="/login">Login/Registrierung</router-link>
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
      navigateToProfile() {
        // Hier implementieren Sie die Navigation zur Profilseite
        console.log("Navigating to profile page");
      },
      navigateToSavedPosts() {
        // Hier implementieren Sie die Navigation zur Seite mit den gespeicherten Beiträgen
        console.log("Navigating to saved posts page");
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
  