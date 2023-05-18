<template>
  <div class="q-pa-md">
    <h4>Redatelji</h4>
  </div>
<!--
  <div class="q-pa-md">
    <q-table
      title="Podaci iz tablice Redatelj"
      :rows="posts"
      :columns="columns"
      row-key="name"
    />
  </div>
-->

  <div class="q-pa-md">
    <q-table
      flat bordered
      title="Redatelji"
      :rows="posts"
      :columns="columns"
      row-key="name"
      binary-state-sort
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="ID_Redatelj" :props="props">{{ props.row.ID_Redatelj }}</q-td>
          <q-td key="Ime" :props="Ime">
            {{ props.row.Ime }}
            <q-popup-edit v-model="props.row.naziv" title="Update Ime" buttons v-slot="scope">
              <q-input type="text" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="Prezime" :props="Ime">
            {{ props.row.Prezime }}
            <q-popup-edit v-model="props.row.Prezime" title="Update Prezime" buttons v-slot="scope">
              <q-input type="text" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="Biografija" :props="naziv">
            {{ props.row.Biografija }}
            <q-popup-edit v-model="props.row.Biografija" title="Update Biografija" buttons v-slot="scope">
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

// treba dodati skripte za update i brisanje

const posts = ref([])

const columns = [
  { name: 'ID_Redatelj', align: 'left', label: 'ID', field: 'ID_Redatelj', sortable: true },
  { name: 'Ime', align: 'left', label: 'Ime', field: 'Ime', sortable: true },
  { name: 'Prezime', align: 'left', label: 'Prezime', field: 'Prezime', sortable: true },
  { name: 'Biografija', align: 'left', label: 'Biografija', field: 'Biografija', sortable: false },
 
]
const getPosts = async () => {
  try{
    const response = await api.get('redatelji')
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