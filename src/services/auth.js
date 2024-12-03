const auth = {
  isAuthenticated: false,
  user: null,

  // Simulera en login-funktion (i en riktig app skulle detta vara ett API-anrop)
  login(username, password) {
    return new Promise((resolve, reject) => {
      // Kontrollera inloggningsuppgifter
      if (username === "admin" && password === "123") {
        // ... admin login logik ...
      } else if (username === "user" && password === "123") {
        // ... user login logik ...
      }
    });
  },

  // Rensa auth-state vid utloggning
  logout() {
    // ... logout logik ...
  },
  // ... andra auth metoder ...
};

export default auth;
