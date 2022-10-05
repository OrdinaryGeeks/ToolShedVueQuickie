<template>


<div v-if="categoryChosen">

<div v-for="item, index in inventoryItems" :key="index">

<div v-if="item.classification == index">

    <img :src=item.graphicURL width="200" height="200"/>
    <p>Description: {{item.description}}</p>
    <p>Number in Inventory: {{item.count}}</p>
    <input type="number" v-model="currentRequest"/>
    <button @click="requestCurrent()">Submit Request</button>
    
</div>


</div>



</div>
<div v-else>

    <div v-for="category, index in categories" :key="index" @click="chosenCategory(index)">
    
        <h2>{{category}}</h2>
    </div>




</div>



<p>Hammers Requested: {{requests[0]}}
Wrenches Requested: {{requests[1]}}
Nails Requested: {{requests[2]}}
Screws Requested: {{requests[3]}}
</p>

<button @click="updateDB()">Remove From Inventory</button>





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

    inventoryItems: InventoryItem[] =[];
    categories: string[] = ['Hammers', 'Wrenches', 'Nails', 'Screws'];
    requestInventoryItem : InventoryItem={ID:0, graphicURL:'', name:'', count:0, description:'', providerID:0, sellerID:0, classification:0};
    currentRequest =0;
    categoryChosen=  false;
    category=0;

    requests: number[] = [0, 0, 0, 0];


    updateDB()
    {

        this.buildRequestInventoryItem();


        fetch("https://alectosinterdimensionalblog.com/toolwatchdemoapi/api/inventoryItems/update/"+1, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'omit', // include, *same-origin, omit
    headers: {
  'Content-type': 'application/json' // Indicates the content 
 },
    body: JSON.stringify(this.requestInventoryItem)
})
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
    alert(data.response);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
       


    }
    requestCurrent()
    {

        this.requests[this.category] = this.currentRequest; 

    }
    chosenCategory(index:number)
    {
            alert(index);
        this.category = index;
        this.categoryChosen = true;



    }

    buildRequestInventoryItem()
    {
        this.requestInventoryItem = this.inventoryItems[this.category];
        this.requestInventoryItem.count = this.requests[this.category];
  

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


}


    </script><!-- Add "scoped" attribute to limit CSS to this component only -->
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