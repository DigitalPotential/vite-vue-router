const auth = {
  isAuthenticated: false,
  user: null,

  // Hantera inloggning med användarnamn och lösenord
  login(username, password) {
    return new Promise((resolve, reject) => {
      // Simulera API-anrop för inloggning
      if (username === "admin" && password === "123") {
        this.isAuthenticated = true;
        this.user = {
          id: 1,
          username: username,
          role: "admin"
        };
        // Spara auth-status i localStorage
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(this.user));
        resolve(this.user);
      } else if (username === "user" && password === "123") {
        this.isAuthenticated = true;
        this.user = {
          id: 2,
          username: username,
          role: "user"
        };
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(this.user));
        resolve(this.user);
      } else {
        reject(new Error("Felaktiga inloggningsuppgifter"));
      }
    });
  },

  // Hantera utloggning
  logout() {
    this.isAuthenticated = false;
    this.user = null;
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  },

  // Kontrollera om användaren är inloggad
  checkAuth() {
    // Om vi redan har en user, returnera true
    if (this.isAuthenticated && this.user) {
      return true;
    }
    // Annars kolla localStorage
    const isAuth = localStorage.getItem("isAuthenticated") === "true";
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (isAuth && user) {
      this.isAuthenticated = true;
      this.user = user;
      return true;
    }
    
    return false;
  },
  // Hämta inloggad användare
  getUser() {
    if (!this.user) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        this.user = user;
      }
    }
    return this.user;
  },
  // Kontrollera om användaren har rätt roll
  hasRole(roles) {
    const user = this.getUser();
    if (!user) return false;
    return roles.includes(user.role);
  }
};

export default auth;