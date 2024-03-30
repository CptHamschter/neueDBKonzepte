<template>
  <header class="header">
    <div class="header-left">
      <h1 @click="navigateToHome">NEWS</h1>
    </div>
    <span @click="navigateToLogin">Login/Registrierung</span>
    
  </header>
</template>

<script>
export default {
  name: 'headerBar',
  
  methods: {
    navigateToHome() {

      this.$router.push('/startseite');
    },
   
    navigateToLogin() {

      this.$router.push('/');
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
