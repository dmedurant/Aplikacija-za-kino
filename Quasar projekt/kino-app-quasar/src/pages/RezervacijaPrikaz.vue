<template>
    <div class="q-pa-md">
      <h4>Rezervacije</h4>
    </div>  
    <div class="q-pa-md">

      <q-table
        flat bordered
        title="Rezervacije:"
        :rows="posts"
        :columns="columns"
        row-key="name"
        binary-state-sort
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            
            <q-td key="Korisnik" :props="korisnik">
              {{ props.row.korisnik }}
              <q-popup-edit v-model="props.row.korisnik" title="Update korisnik" buttons v-slot="scope">
                <q-input type="text" v-model="scope.value" dense autofocus />
              </q-popup-edit>
            </q-td>
            <q-td key="DatumPrikaza" :props="DatumPrikaza">
              {{ new Date(props.row.DatumPrikaza).toLocaleDateString() }}
              <q-popup-edit v-model="props.row.DatumPrikaza" title="Update DatumPrikaza" buttons v-slot="scope">
              <q-input type="text" v-model="scope.value" dense autofocus />
              </q-popup-edit>
            </q-td> 
            <q-td key="vrijeme_prikaza" :props="vrijeme_prikaza">
              {{ props.row.vrijeme_prikaza }}
              <q-popup-edit v-model="props.row.vrijeme_prikaza" title="Update vrijeme_prikaza" buttons v-slot="scope">
              <q-input type="text" v-model="scope.value" dense autofocus />
              </q-popup-edit>
            </q-td>              
            <q-td key="Naslov" :props="Naslov">
              {{ props.row.Naslov }}
              <q-popup-edit v-model="props.row.Naslov" title="Update Naslov" buttons v-slot="scope">
                <q-input type="text" v-model="scope.value" dense autofocus />
              </q-popup-edit>
            </q-td>            
            <q-td key="broj_karti" :props="broj_karti">
              {{ props.row.broj_karti }}
              <q-popup-edit v-model="props.row.broj_karti" title="Update broj_karti" buttons v-slot="scope">
                <q-input type="text" v-model="scope.value" dense autofocus />
              </q-popup-edit>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>  
  
    <div class="q-pa-md q-gutter-sm">
      <q-btn color="primary" to="/" label="Natrag na početnu" />
    </div>
  </template>
  
  
  <script setup>
  import { ref, onMounted } from "vue";
  import {api} from 'boot/axios';  

  
  const posts = ref([])
  
  // 2x join
  // <q-td key="id_rezervacije" :props="props">{{ props.row.id_rezervacije }}</q-td>
  const columns = [
    //{ name: 'id_rezervacije', align: 'left', label: 'id', field: 'id_rezervacije', sortable: true },
    { name: 'korisnik', align: 'left', label: 'Korisnik', field: 'korisnik', sortable: true },
    { name: 'DatumPrikaza', align: 'left', label: 'Datum Prikaza', field: 'DatumPrikaza', sortable: true },  
    { name: 'vrijeme_prikaza', align: 'left', label: 'Vrijeme Prikaza', field: 'vrijeme_prikaza', sortable: true },      
    { name: 'Naslov', align: 'left', label: 'Naslov', field: 'Naslov', sortable: true },      
    { name: 'broj_karti', align: 'left', label: 'Broj Karti', field: 'broj_karti', sortable: true },     
    
   
  ]
  const getPosts = async () => {
    try{
      const response = await api.get('rezervacije')
      console.log(response.data)
      posts.value = response.data
  
    }catch (error){
      console.log(error)
    }
  
  }
  
  onMounted(() => {
    getPosts()
  })
  
  </script>