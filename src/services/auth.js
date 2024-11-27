const auth = {
  isAuthenticated: false,
  user: null,

  login(username, password) {
    // I en riktig app skulle detta vara ett API-anrop
    return new Promise((resolve, reject) => {
      if (username === "admin" && password === "123") {
        this.isAuthenticated = true;
        this.user = {
          id: 1,
          username: username,
          role: "admin",
        };
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(this.user));
        resolve(this.user);
      } else {
        reject(new Error("Felaktiga inloggningsuppgifter"));
      }
    });
  },

  logout() {
    this.isAuthenticated = false;
    this.user = null;
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  },

  checkAuth() {
    const isAuth = localStorage.getItem("isAuthenticated") === "true";
    const user = JSON.parse(localStorage.getItem("user"));
    if (isAuth && user) {
      this.isAuthenticated = true;
      this.user = user;
    }
    return this.isAuthenticated;
  },
};

export default auth;
