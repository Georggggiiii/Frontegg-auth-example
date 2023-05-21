<template>
  <div id="app" v-if="fronteggLoaded">
    <div v-if="authState.user">
      <span>Logged in as: {{ authState.user.name }}</span>
    </div>
    <button @click="showAdminPortal" v-if="authState.user">Open admin portal</button>
    <div>
      <button v-if="authState.user" @click="showAccessToken">What is my access token?</button><br>
      <button v-if="authState.user" @click="logout">Log out</button>
      <button v-if="!authState.user" @click="loginWithRedirect">Click to Login</button>
    </div>
  </div>
</template>

<script>
import { mapLoginActions, ContextHolder } from "@frontegg/vue";
import { AdminPortal } from "@frontegg/vue";

export default {
  name: "App",
  methods: {
    loginWithRedirect: mapLoginActions("loginWithRedirect"),
    showAccessToken() {
      alert(this.authState.user.accessToken);
    },
    logout() {
      const baseUrl = ContextHolder.getContext().baseUrl;
      window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
      window.localStorage.removeItem("user");
    },
    showAdminPortal() {
      AdminPortal.show();
    },
  },
  data() {
    return {
      ...this.mapAuthState(),
    };
  },
  created() {
    const storedUser = window.localStorage.getItem("user");
    if (storedUser) {
      this.authState.user = JSON.parse(storedUser);
    }
  },
  beforeUpdate() {
    window.localStorage.setItem("user", JSON.stringify(this.authState.user));
  },
};
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}
body {
  background-color: #2c3e50;
}
</style>
