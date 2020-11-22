<template>
  <div class="wastes">
    <Drawer />

    <v-container fluid>
      <v-card>
        <v-card-title
          >Manage Waste
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Waste
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }} </span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedwaste.name"
                        label="name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedwaste.date"
                        label="date"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedwaste.status"
                        label="status"
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
                <v-btn color="blue darken-1" text @click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-title>

        <template>
          <v-data-table
            :headers="headers"
            :items="wastes"
            :items-per-page="20"
            class="elevation-1"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon class="mr-2" @click="editWaste(item.id)"
                >mdi-pencil</v-icon
              >
              <v-icon @click="deleteWaste(item.id)">mdi-delete</v-icon>
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
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Date", value: "date" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      wastes: [],
      dialog: false,
      dialogDelete: false,
      editedIndex: "-1",
      editedwaste: {
        id: "",
        name: "",
        date: "",
        status: "",
      },
      defaultWaste: {
        name: "",
        date: "",
        status: "",
      },
    };
  },
  created() {
    db.collection("wastes").onSnapshot((snapshotChange) => {
      this.wastes = [];
      snapshotChange.forEach((doc) => {
        this.wastes.push({
          id: doc.id,
          name: doc.data().name,
          date: doc.data().date,
          status: doc.data().status,
        });
        // console.log(this.wastes)
      });
    });
  },
  computed: {
    formTitle() {
      return this.editedIndex === "-1" ? "New Waste" : "Edit Waste";
    },
  },
  methods: {
    editWaste(docId) {
      this.wastes.forEach((element) => {
        if (element.id == docId) {
          this.editedIndex = docId;
          console.log(this.editedIndex);
        }
      });
      this.editedwaste.id = docId;
      this.dialog = true;
    },
    deleteWaste(id) {
      db.collection("wastes")
        .doc(id)
        .delete()
        .then(() => {
          console.log("waste delete");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    close() {
      this.dialog = false;
      this.editedIndex = "-1";
      this.editedwaste.id = "";
      this.editedwaste.name = "";
      this.editedwaste.date = "";
      this.editedwaste.status = "";
    },

    save() {
      if (this.editedIndex == "-1") {
        db.collection("wastes")
          .add({
            name: this.editedwaste.name,
            date: this.editedwaste.date,
            status: this.editedwaste.status,
          })
          .then(() => {
            console.log("Document written with ID: ");
            db.collection("wastes").onSnapshot((snapshotChange) => {
              this.wastes = [];
              snapshotChange.forEach((doc) => {
                this.wastes.push({
                  id: doc.id,
                  name: doc.data().name,
                  date: doc.data().date,
                  status: doc.data().status,
                });
              });
            });
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
      } else {
        db.collection("wastes")
          .doc(this.editedIndex)
          .set({
            name: this.editedwaste.name,
            date: this.editedwaste.date,
            status: this.editedwaste.status,
          })
          .then(() => {
            console.log("Document");
            db.collection("wastes").onSnapshot((snapshotChange) => {
              this.wastes = [];
              snapshotChange.forEach((doc) => {
                this.wastes.push({
                  id: doc.id,
                  name: doc.data().name,
                  date: doc.data().date,
                  status: doc.data().status,
                });
              });
            });
          })
          .catch(function(error) {
            console.error(error);
          });
      }

      this.close();
    },
  },
};
</script>
