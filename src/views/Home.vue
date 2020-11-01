<template>
  <div class="home">
    <Nav />
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-card max-width="1200px" min-width="600px">
          <v-tabs
            v-model="tab"
            background-color="primary"
            centered
            dark
            icons-and-text
          >
            <v-tabs-slider></v-tabs-slider>
            <v-tab :key="1">
              Login
              <v-icon>mdi-login</v-icon>
            </v-tab>
            <v-tab :key="2">
              Register
              <v-icon>mdi-account-plus</v-icon>
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item :key="0" :value="0">
              <Login />
            </v-tab-item>
            <v-tab-item :key="1" :value="1">
              <Register />
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
import Login from "@/components/Login";
import Register from "@/components/Register";
export default {
  components: {
    Nav,
    Login,
    Register,
  },
  data() {
    return {
      tab: null,
    };
  },
};
</script>
