<template>
  <div class="shops">
    <Drawer />
    <v-container fluid>
      <v-card>
        <v-card-title
          >Manage Shops
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Shop
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline"
                  >{{ formTitle }} {{ this.editedIndex }}
                </span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedShop.name"
                        label="Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedShop.price"
                        label="Price"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedShop.discount"
                        label="Discount"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedShop.quatity"
                        label="Quantity"
                      ></v-text-field>
                    </v-col>
                     <v-col cols="12">
                      <v-text-field
                        v-model="editedShop.imageurl"
                        label="ImageUrl"
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
            :items="shops"
            :items-per-page="20"
            class="elevation-1"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon class="mr-2" @click="editShop(item.id)"
                >mdi-pencil</v-icon
              >
              <v-icon @click="deleteShop(item.id)">mdi-delete</v-icon>
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
          text: "Shop Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Price", value: "price" },
        { text: "Discount", value: "discount" },
        { text: "Quantity", value: "quantity" },
        { text: "Image Url", value: "imageurl" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      shops: [],
      dialog: false,
      dialogDelete: false,
      editedIndex: "-1",
      editedShop: {
        id: "",
        name: "",
        price: 0,
        discount: 0,
        quatity: 0,
        imageurl: ""
      },
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === "-1" ? "New Shop" : "Edit Shop";
    },
  },
  created() {
    db.collection("shops").onSnapshot((snapshotChange) => {
      this.users = [];
      snapshotChange.forEach((doc) => {
        this.shops.push({
          id: doc.id,
          name: doc.data().name,
          price: doc.data().price,
          discount: doc.data().discount,
          quantity: doc.data().quatity,
          imageurl: doc.data().imageurl,
        });
      });
    });
  },
  methods: {
    deleteShop(id) {
      db.collection("shops")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Shop delete");
          this.shops = [];
          db.collection("shops").onSnapshot((snapshotChange) => {
            snapshotChange.forEach((doc) => {
              this.shops.push({
                id: doc.id,
                name: doc.data().name,
                price: doc.data().price,
                discount: doc.data().discount,
                quantity: doc.data().quatity,
                imageurl: doc.data().imageurl,
              });
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editShop(docId) {
      this.shops.forEach((element) => {
        if (element.id == docId) {
          this.editedIndex = docId;
          console.log(this.editedIndex);
        }
      });
      this.editedShop.id = docId;
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.editedIndex = "-1";
      this.editedShop.id = "";
      this.editedShop.name = "";
      this.editedShop.price = 0;
      this.editedShop.discount = 0;
      this.editedShop.quatity = 0;
      this.editedShop.imageurl = "";
     
    },

    save() {
      console.log(this.editedIndex);
      if (this.editedIndex == "-1") {
        // push new object to firestore
        // this is -1
        db.collection("shops")
          .add({
            name: this.editedShop.name,
            price: parseInt(this.editedShop.price),
            discount: parseInt(this.editedShop.discount),
            quatity: parseInt(this.editedShop.quatity),
            imageurl: this.editedShop.imageurl,
        
          })
          .then(() => {
            console.log("Document written with ID: ");
            this.shops = [];
            db.collection("shops").onSnapshot((snapshotChange) => {
              snapshotChange.forEach((doc) => {
                this.shops.push({
                  id: doc.id,
                  name: doc.data().name,
                  price: doc.data().price,
                  discount: doc.data().discount,
                  quantity: doc.data().quatity,
                  imageurl: doc.data().imageurl,
                });
              });
            });
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
      } else {
        // edit object
        console.log(this.editedIndex);
        db.collection("shops")
          .doc(this.editedIndex)
          .set({
            name: this.editedShop.name,
            price: parseInt(this.editedShop.price),
            discount: parseInt(this.editedShop.discount),
            quatity: parseInt(this.editedShop.quatity),
            imageurl: this.editedShop.imageurl
            
          })
          .then(() => {
            console.log("Document" + this.editedIndex);
            this.shops = [];
            db.collection("shops").onSnapshot((snapshotChange) => {
              snapshotChange.forEach((doc) => {
                this.shops.push({
                  id: doc.id,
                  name: doc.data().name,
                  price: doc.data().price,
                  discount: doc.data().discount,
                  quantity: doc.data().quatity,
                  imageurl: doc.data().imageurl,
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
