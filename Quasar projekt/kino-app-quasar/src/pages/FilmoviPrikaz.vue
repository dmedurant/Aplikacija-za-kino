<template>
    <div class="q-pa-md">
      <h4>Svi filmovi</h4>
    </div>
    <div class="q-pa-md">
     
      <q-table
        flat bordered
        title="Filmovi:"
        :rows="posts"
        :columns="columns"
        row-key="name"
        binary-state-sort
      >

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="ID_Film" :props="props">{{ props.row.ID_Film }}</q-td>
            <q-td key="Naslov" :props="Naslov">
              {{ props.row.Naslov }}
              <q-popup-edit v-model="props.row.naziv" title="Update Naslov" buttons v-slot="scope">
                <q-input type="text" v-model="scope.value" dense autofocus />
              </q-popup-edit>
            </q-td>
            <q-td key="Sadrzaj" :props="Sadrzaj">
              {{ props.row.Sadrzaj }}
              <q-popup-edit v-model="props.row.Sadrzaj" title="Update Sadrzaj" buttons v-slot="scope">
                <q-input type="text" v-model="scope.value" dense autofocus />
              </q-popup-edit>
            </q-td>
            <q-td key="DatumObjave" :props="naziv">
              {{ props.row.DatumObjave }}
              <q-popup-edit v-model="props.row.DatumObjave" title="Update Datum Objave" buttons v-slot="scope">
                <q-input type="text" v-model="scope.value" dense autofocus />
              </q-popup-edit>
              </q-td>
              <q-td key="VrijemeTrajanja" :props="naziv">
                {{ props.row.VrijemeTrajanja }}
                <q-popup-edit v-model="props.row.VrijemeTrajanja" title="Update Trajanje" buttons v-slot="scope">
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
  const searchTerm = ref('');

  const columns = [
    { name: 'ID_Film', align: 'left', label: 'ID', field: 'ID_Film', sortable: true },
    { name: 'Naslov', align: 'left', label: 'Naslov', field: 'Naslov', sortable: true },
    { name: 'Sadrzaj', align: 'left', label: 'Sadržaj', field: 'Sadrzaj', sortable: true },
    { name: 'DatumObjave', align: 'left', label: 'Datum Objave', field: 'DatumObjave', sortable: false },
    { name: 'Trajanje', align: 'left', label: 'Trajanje', field: 'VrijemeTrajanja', sortable: true }
   
  ]
  const getPosts = async () => {
    try{
      const response = await api.get('filmovi')
      console.log(response.data)
      posts.value = response.data
  
    }catch (error){
      console.log(error)
    }
  
  }

  const search = () => {
   posts.value = originalPosts.filter(post => post.Naslov.includes(searchTerm.value));
};
  
  onMounted(() => {
    getPosts()
  })
  
  </script>