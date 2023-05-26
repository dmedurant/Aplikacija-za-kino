<template>
  <div class="bg-image">
  <div class="q-pa-md">
    <h4>Korisnici</h4>
  </div>
<!--
  <div class="q-pa-md">
    <q-table
      title="Podaci iz tablice Korisnik"
      :rows="posts"
      :columns="columns"
      row-key="name"
    />
  </div>
-->

  <div class="q-pa-md">
    <q-table
      flat bordered
      title="Korisnici"
      :rows="posts"
      :columns="columns"
      row-key="name"
      binary-state-sort
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="ID_Korisnik" :props="props">{{ props.row.ID_Korisnik }}</q-td>
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
          <q-td key="Adresa" :props="naziv">
            {{ props.row.Adresa }}
            <q-popup-edit v-model="props.row.Adresa" title="Update Adresa" buttons v-slot="scope">
              <q-input type="text" v-model="scope.value" dense autofocus />
            </q-popup-edit>
            </q-td>
            <q-td key="Broj" :props="naziv">
            {{ props.row.Broj }}
            <q-popup-edit v-model="props.row.Broj" title="Update Broj" buttons v-slot="scope">
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
</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {api} from 'boot/axios';

// treba dodati skripte za update i brisanje

const posts = ref([])

const columns = [
  { name: 'ID_Korisnik', align: 'left', label: 'ID', field: 'ID_Korisnik', sortable: true },
  { name: 'Ime', align: 'left', label: 'Ime', field: 'Ime', sortable: true },
  { name: 'Prezime', align: 'left', label: 'Prezime', field: 'Prezime', sortable: true },
  { name: 'Adresa', align: 'left', label: 'Adresa', field: 'Adresa', sortable: false },
  { name: 'Broj', align: 'left', label: 'Broj', field: 'Broj', sortable: false },
 
]
const getPosts = async () => {
  try{
    const response = await api.get('Korisnici')
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
<style>
.bg-image {
  background-image: url(https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/12/Gradient_builder_2.jpg?auto=format&q=60&w=1815&h=1200&fit=crop&crop=faces)
}
</style>