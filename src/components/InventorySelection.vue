<template>


<div v-if="categoryChosen">

<div v-for="item, index in inventoryItems" :key="index">

<div v-if="item.id == category">

    <p>Click Image to return to menu</p>
    <img :src=item.graphicURL width="200" height="200" @click="chosenCategory(-1)"/>
    <p>Description: {{item.description}}</p>
    <p>Number in Inventory: {{item.count}}</p>
    <input type="number" v-model="currentRequest"/>
    <button @click="requestCurrent()">Submit Request</button>
    
</div>


</div>



</div>
<div v-else>


    <p>Click Name or Count to Select to Remove Item/Items from Inventory</p>
    
    <div v-for="item, index in inventoryItems" :key="index" @click="chosenCategory(index)">

    
    <h2> {{item.name}}</h2>
    <p>Number in Inventory: {{item.count}}</p>
    
    
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
  providerID: number;
  sellerID: number;
  id: number;

}

interface InventoryRemoval
    {

          ID : number;
          Hammers : number;
          Nails : number;
          NutsAndBolts : number;
          Wrenches : number;
          Fulfilled : boolean;

    }
({
  props: {
    msg: String,
    
  },
})

export default class InventorySelection extends Vue {

    inventoryItems: InventoryItem[] =[];
    categories: string[] = ['Hammers', 'Wrenches', 'Nails', 'Bolts'];
    requestInventoryItem : InventoryItem={id:0, graphicURL:'', name:'', count:0, description:'', providerID:0, sellerID:0};
    currentRequest =0;
    categoryChosen=  false;
    category=0;
    inventoryRemoval: InventoryRemoval = {ID: 0, Fulfilled: false,Hammers:0, Nails:0, Wrenches:0, NutsAndBolts:0};
    requests: number[] = [0, 0, 0, 0];


    updateDB()
    {

        //this.buildRequestInventoryItem();
        this.buildInventoryRemoval();

        fetch("https://alectosinterdimensionalblog.com/toolwatchdemoapi/api/inventoryremovals/", 
    {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, *same-origin, omit
        headers: {'Content-type': 'application/json' // Indicates the content 
    },
        body: JSON.stringify(this.inventoryRemoval)
})
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
    if((data.response.includes("Insufficient")))
    alert(data.response);
    else
    {
    this.inventoryItems[0].count = data.response[0];
    this.inventoryItems[1].count = data.response[1];
    this.inventoryItems[2].count = data.response[2];
    this.inventoryItems[3].count = data.response[3];
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });

    }

    setAllRequestsToZero()
    {

    this.requests[0] = 0;
    this.requests[1] = 0;
    this.requests[2] = 0;
    this.requests[3] =0; 

    }
    
    requestCurrent()
    {

        this.requests[this.category-1] = this.currentRequest; 

    }
    chosenCategory(index:number)
    {
     

            if(!this.categoryChosen)
            {

                
        this.category = index+1;
        this.categoryChosen = true;

     //  alert(this.category + " cat chosen");
            }

            else
            {

                this.category = -1;
                this.categoryChosen = false;
                this.currentRequest = 0; 
            }

    }

    buildInventoryRemoval()
    {

        this.inventoryRemoval.Hammers = this.requests[0];
        this.inventoryRemoval.Wrenches = this.requests[1];
        this.inventoryRemoval.Nails = this.requests[2];
        this.inventoryRemoval.NutsAndBolts = this.requests[3];



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
    .then(data => {
        //alert(data);
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