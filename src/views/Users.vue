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
            <v-btn color="primary" text @click="dialog = false"> Yes </v-btn>
            <v-btn color="red" text @click="dialog = false"> No </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-container fluid>
      <v-card>
        <v-card-title
          >Manage Users
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New User
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedUser.username"
                        label="Username"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedUser.password"
                        label="Password"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedUser.email"
                        label="Email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedUser.points"
                        label="Points"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
      editedIndex: -1,
      editedUser: {
        username: "",
        password: "",
        email: "",
        points: 0,
      },
      defaultUser: {
        username: "",
        password: "",
        email: "",
        points: 0,
      },
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
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    newUser() {},
    editUser(docId) {
      this.users.forEach(element => {
        if(element.id == docId){
          this.editedIndex = docId;
          console.log(this.editedIndex);
        }
      });
      this.editedUser = Object.assign({}, docId)
      this.dialog = true
    },
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
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
};
</script>
