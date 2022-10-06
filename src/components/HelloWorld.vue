<!--https://blog.openreplay.com/how-to-use-typescript-to-create-vue-apps-with-vue-class-components/-->

<template>
  <div class="hello">
    <h1>hgello</h1>


      
<div v-for="(inventoryItem, index) in inventoryItems" :key="index" @click="switchShowOrderForm">
  <div v-if="!showOrderForm">{{inventoryItem.name}}  {{inventoryItem.count}}
  <div @click="takeOne(index)">Take One</div></div>
  <div v-else>
    <img :src=inventoryItem.graphicURL width="200" height="200"/>
    <p>{{inventoryItem.description}}</p>
  </div>

</div>

<form @submit.prevent="addInventoryItem">

<div>
  <label>Name</label>
  <br/>
  <input v-model="inventoryItem.name" />
  <br/>
  {{!inventoryItem.name ? "Name is required" : ""}}
</div>

<div>
  <label>Count</label>
  <br/>
  <input v-model="inventoryItem.count" />
  <br/>
  {{!inventoryItem.count ? "Count is required" : ""}}
</div>

<div>
  <label>Graphic URL</label>
  <br/>
  <input v-model="inventoryItem.graphicURL" />
  <br/>
  {{!inventoryItem.graphicURL ? "Graphic URL is required" : ""}}
</div>

<div>
  <label>Description</label>
  <br/>
  <input v-model="inventoryItem.description" />
  <br/>
  {{!inventoryItem.description ? "Description is required" : ""}}
</div>

<div>
  <label>Provider ID</label>
  <br/>
  <input v-model="inventoryItem.providerID" />
  <br/>
  {{!inventoryItem.providerID ? "Provider ID is required" : ""}}
</div>

<div>
  <label>Seller ID</label>
  <br/>
  <input v-model="inventoryItem.sellerID" />
  <br/>
  {{!inventoryItem.sellerID ? "Seller ID is required" : ""}}
</div>

<div>
  <label>Classification</label>
  <br/>
  <input v-model="inventoryItem.classification" />
  <br/>
  {{!inventoryItem.classification ? "Description is required" : ""}}
</div>


<button type="submit">Add Inventory Item</button>
</form>


  </div>
</template>

<script lang="ts">
import { Super } from "@babel/types";
import { Options, Vue } from "vue-class-component";
import * as sanitizeHtml from 'sanitize-html';


interface InventoryItem{
  name: string;
  count: number;
  graphicURL: string;
  description: string;
  classification: number;
  providerID: number;
  sellerID: number;
  ID: number;

}

({
  props: {
    msg: String,
    
  },
})

export default class HelloWorld extends Vue {
  msg!: string;
  showOrderForm = false;
  inventoryItem: InventoryItem = {ID: 0, name : "", count:0, graphicURL:"", description:"", classification:0, providerID:0, sellerID:0};
  inventoryItems: InventoryItem[] =[];
  sanitizedUrl ="";

  switchShowOrderForm(){

    this.showOrderForm= !this.showOrderForm;
  }

  takeOne(chosen: number){

    this.inventoryItems[chosen].count --;

  }
  mounted() {
    fetch("https://alectosinterdimensionalblog.com/toolwatchdemoapi/api/inventoryItems", {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'omit', // include, *same-origin, omit
 
  })
    .then(response => response.json())
    .then(data => {alert(data);
    this.inventoryItems = data;
  });

  }
  addInventoryItem(){

    //const clean = sanitizeHtml.default(this.inventoryItem.graphicURL, {
  //allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])
//});
    this.inventoryItems.push({ID: this.inventoryItem.ID, name:this.inventoryItem.name, graphicURL: sanitizeHtml.default(this.inventoryItem.graphicURL), count:this.inventoryItem.count, description:this.inventoryItem.description, classification:this.inventoryItem.classification, providerID:this.inventoryItem.providerID, sellerID: this.inventoryItem.sellerID});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
