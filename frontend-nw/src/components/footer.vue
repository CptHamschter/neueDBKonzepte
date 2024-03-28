<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-logo">
          <img src="logo.png" alt="World News Logo">
          <h1>World News</h1>
        </div>
        <p class="closing-message">Bleiben Sie informiert und entdecken Sie die Welt mit uns!</p>
      </div>
      <div class="footer-social">
        <h3>Folgen Sie uns auf</h3>
        <div class="social-icons">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-youtube"></i></a>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooTer',
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: #333;
    color: #fff;
    padding: 20px 0;
    text-align: center;
  }
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .footer-logo {
    display: flex;
    align-items: center;
  }
  
  .footer-logo img {
    height: 40px;
    margin-right: 10px;
  }
  
  .closing-message {
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  .footer-social {
    margin-top: 20px;
  }
  
  .social-icons a {
    color: #fff;
    font-size: 24px;
    margin-right: 10px;
  }
  
  .social-icons a:hover {
    color: #ffd700;
  }
  </style>
  