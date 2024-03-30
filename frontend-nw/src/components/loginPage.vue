<template>
  <div class="form-container anmelde-container">
    <form @submit.prevent="login">
      <h1 class="FormTitel">Anmelden</h1>
    
      <span>oder nutze deinen Account!</span>
      <input type="email" placeholder="Email" v-model="loginData.email" required/>
      <input type="password" placeholder="Passwort" v-model="loginData.password" required/>
      <a href="#">Passwort vergessen?</a>
      <button class="FormButtons">Anmelden</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginForm',
  data() {
    return {
      loginData: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:27017/api/auth/login', this.loginData);
        console.log('Anmeldung erfolgreich:', response.data);
        sessionStorage.setItem('token', response.data.token); 
        sessionStorage.setItem('Kunde', JSON.stringify(response.data.user)); 

        
        alert('Sie sind nun angemeldet!');
        setTimeout(() => {
          
          window.location.replace('/startseite');
        }, 1000); 
      } catch (error) {
        console.error('Anmeldefehler:', error.response.data.error);
        
      }
    }
  }
}
</script>

  <style scoped> 
h1 {
font-weight: bold;
margin: 0;
}

span {
font-size: 0.75em;
}

a {
color: #333;
font-size: 0.875em;
text-decoration: none;
margin: 0.9375em 0;
}


button {
border-radius: 1.8em;
border: 0.04em solid black;
background-color: black;
color: #FFFFFF;
font-size: 0.8em;
font-weight: bold;
padding: 0.87em 2.8125em;
letter-spacing: 0.03125em;
text-transform: uppercase;
transition: transform 80ms ease-in;
}

button:active {
transform: scale(0.95);
}

button:focus {
outline: none;
}

button.ghost {
background-color: transparent;
border-color: #FFFFFF;
}

form {
background-color: #FFFFFF;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 0 3.125em;
height: 100%;
text-align: center;
}

input {
background-color: #eee;
border: none;
padding: 0.75em 0.9375em;
margin: 0.5em 0;
width: 100%;
}
.form-container {
position: absolute;
top: 0;
height: 100%;
transition: all 0.6s ease-in-out;
}

.anmelde-container {
left: 0;
width: 50%;
z-index: 2;
}

.social-container {
margin: 1.25em 0;
}
.social-container a {
border: 0.0625em solid #DDDDDD;
border-radius: 50%;
display: inline-flex;
justify-content: center;
align-items: center;
margin: 0 0.3125em;
height: 2.5em;
width: 2.5em;
}


select {
  background-color: #eee;
  border: none;
  padding: 0.75em 0.9375em;
  margin: 0.5em 0;
  width: 100%;
  font-family: 'Montserrat', sans-serif; 
  box-sizing: border-box; 
  -webkit-appearance: none; 
  -moz-appearance: none; 
  appearance: none; 
  cursor: pointer;
}

.select-icon {
  position: absolute;
  right: 15px;
  top: calc(50% - 0.5em); 
  pointer-events: none; 
}
@media (max-width: 790px) {

    .form-container, .overlay-container {
      width: 100%; 
      position: relative; 
  }
  .anmelde-container, .registrierungs-container {
      position: relative; 
      opacity: 1; 
  }
  .container.right-panel-active .registrierungs-container,
  .container.right-panel-active .anmelde-container {
      transform: none;
      opacity: 1;
      position: relative;
      z-index: 1;
  }
  .FormTitel{
  margin-top: 10px;
}

.FormButtons{
  margin-bottom: 16px;
}
}

</style>