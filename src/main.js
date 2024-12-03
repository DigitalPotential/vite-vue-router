import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Skapa Vue-applikationen
const app = createApp(App);

// Lägg till router
app.use(router);

// Montera appen på #app elementet i index.html
app.mount("#app");
