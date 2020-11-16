<template>
  <div class="users">
    <Drawer />

    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2">
            Delete User?
          </v-card-title>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">
              Yes
            </v-btn>
            <v-btn color="red" text @click="dialog = false">
              No
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-container fluid>
      <v-card>
        <v-card-title
          >Manage Users
          <v-spacer></v-spacer>
          <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
            New Item
          </v-btn>
        </v-card-title>

        <template>
          <v-data-table
            :headers="headers"
            :items="users"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon class="mr-2" @click="editUser(item.id)"
                >mdi-pencil</v-icon
              >
              <v-icon @click="deleteUser(item.id)">mdi-delete</v-icon>
            </template></v-data-table
          >
        </template>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { db } from "../firebaseDb";
import Drawer from "@/components/Drawer";
export default {
  components: {
    Drawer,
  },
  data() {
    return {
      headers: [
        {
          text: "Username",
          align: "start",
          sortable: false,
          value: "username",
        },
        { text: "Password", value: "password" },
        { text: "Email", value: "email" },
        { text: "Points", value: "points" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      users: [],
      dialog: false,
      dialogDelete: false,
    };
  },
  created() {
    db.collection("users").onSnapshot((snapshotChange) => {
      this.users = [];
      snapshotChange.forEach((doc) => {
        this.users.push({
          id: doc.id,
          username: doc.data().username,
          email: doc.data().email,
          password: doc.data().password,
          points: doc.data().points,
        });
      });
    });
  },
  methods: {
    editUser() {},
    deleteUser(id) {
      db.collection("users")
        .doc(id)
        .delete()
        .then(() => {
          console.log("User delete");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
