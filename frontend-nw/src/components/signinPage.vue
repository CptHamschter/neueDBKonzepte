<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div class="form-container registrierungs-container">
      <form @submit.prevent="register">
        <!-- Formular für die Registrierung mit v-model für die Datenbindung -->
        <h1 class="FormTitel">Account erstellen</h1>
                <!-- Social Media Links -->
				<div class="social-container">
                    <a href="#" class="social"><i class="fa fa-facebook"></i></a>
                    <a href="#" class="social"><i class="fa fa-google"></i></a>
                    <a href="#" class="social"><i class="fa fa-linkedin"></i></a>
                </div>
                <span>oder nutze deine Email um dich zu registrieren!</span>
                <select v-model="registerData.titel" required>
                    <option value="">Titel wählen</option>
                    <option value="Herr">Herr</option>
                    <option value="Frau">Frau</option>
                </select>
                <input type="text" placeholder="Vorname" v-model="registerData.vorname" required/>
                <input type="text" placeholder="Nachname" v-model="registerData.nachname" required/>
                <input type="email" placeholder="Email" v-model="registerData.email" required/>
                <input type="password" placeholder="Passwort" v-model="registerData.passwort" required/>
                <button class="FormButtons">Registrieren</button>
      </form>
    </div>
  </template>
  
<script>
//import axios from 'axios';

export default {
  name: 'RegisterForm',
  data() {
    return {
      registerData: {
        // Formulardaten
        titel: '',
        vorname: '',
        nachname: '',
        email: '',
        passwort: ''
      }
    };
  },
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

/* Button Eigenschaften*/
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
/* Eingabefelder Anmelde-/ SignUp-Formular */
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

.registrierungs-container {
left: 0;
width: 50%;
opacity: 0;
z-index: 1; /* reg container liegt erst "unterhalb" des anmelde containers*/
}

.container.right-panel-active .registrierungs-container {
transform: translateX(100%);
opacity: 1; /* sichtbar machen*/
z-index: 5; /* jetzt überhalb des anmelde containers */
animation: show 0.6s;
}
/* Icons im Formular */
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