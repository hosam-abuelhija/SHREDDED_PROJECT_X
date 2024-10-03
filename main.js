import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAv5vCoLdqubm_IJAOjNlgF7o9zo-1-VfE",
  authDomain: "login-3e8e4.firebaseapp.com",
  projectId: "login-3e8e4",
  storageBucket: "login-3e8e4.appspot.com",
  messagingSenderId: "251369161445",
  appId: "1:251369161445:web:ef0c157a6b0cdcdb1a0a0c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-login-btn");
if (googleLogin) {
    googleLogin.addEventListener("click", async function () {
      debugger;
      event.preventDefault();
      try {
        console.log("Button clicked, attempting login...");
        const result = await signInWithPopup(auth, provider);
  
        const user = result.user;
        console.log("User:", user);
        let dbuser = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        }
        
        let response = await fetch(`https://localhost:44384/api/Users/Google`, {
          method: "POST",
          body: JSON.stringify(dbuser),
          headers: {"Content-Type": "application/json"}
        });
        if (response.status === 200) {
          const data = await response.json();
          console.log("Login Data:", data);
    
          const userId = data.userID; // Extract userId here
          localStorage.setItem('jwtToken', data.token);
          localStorage.setItem('userId', userId);
          window.location.href = "Home.html";
          
        } else {
          const errorText = await response.text();
          console.error("Login failed:", errorText);
          message.innerHTML = `<p style='color:red;'>Login failed</p>`;
        }
        
      } catch (error) {
        console.error("Error during login:", error);
        alert("Error during login. Please try again.");
      }
    });
} else {
    console.error("Login button not found");
}

