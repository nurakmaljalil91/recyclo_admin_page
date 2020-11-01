<template>
  <div>
    <v-card flat class="mx-auto pa-4">
      <v-row align="center" justify="center"> </v-row>
      <v-form>
        <v-text-field
          v-model="email"
          :rules="[rules.required, rules.email]"
          label="E-mail"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 8 characters"
          counter
          @click:append="show = !show"
        ></v-text-field>
      </v-form>
      <v-card-actions>
        <v-row>
          <v-btn block color="primary" @click="login">Login</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { auth } from "../firebaseDb";

export default {
  data() {
    return {
      show: false,
      tab: null,
      email: "",
      password: "",
      errormsg: "",
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  methods: {
    login() {
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push({ name: "Users" });
          console.log("sign in");
        })
        .catch((error) => {
          this.errormsg = error;
        });
    },
  },
};
</script>
