<template>
  <div style="background-color: #229df9">
<div  class="q-pa-md row items-start q-gutter-md">

  <q-card v-for="post in posts" :key="post.id" class="my-card">
    <q-img :src=post.cover />

    <q-card-section>
      <q-btn fab color="primary" icon="" class="absolute" style="top: 0; right: 12px; transform: translateY(-50%)"
      :to="'detalji/' + post.ID_Film" />

        <q-btn fab color="red" icon="delete" class="absolute"  style="top: 0px; left: 12px; transform: translateY(-50%)"
         @click="deleteById(post.ID_Film)" />

         <div class="myDiv" style="padding: 10px;"></div>

      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis">{{ post.Naslov }}</div>
      </div>

    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-subtitle1">{{ post.DatumObjave }}</div>
      <div class="text-caption text-grey">
        {{post.Sadrzaj}}
      </div>

    </q-card-section>

    <q-separator />

  </q-card>



</div>
</div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import {api} from 'boot/axios'
import { useRoute, useRouter } from 'vue-router';
const posts = ref([])
const route = useRoute()
const router = useRouter()



const getPosts = async () => {
try{
  const response = await api.get('filmovi')
  console.log(response.data)
  posts.value = response.data

}catch (error){
  console.log(error)
}

}


const deleteById = async (id) => {
try {
//const response = await api.delete('atrakcije/${id}');
const response = await api.delete(`http://localhost:3000/obrisi_film/${id}`);
console.log(response.data);
// Perform any additional actions after successful deletion
} catch (error) {
console.log(error);
}
getPosts();
}


onMounted(() => {
getPosts()
})

const goToAtrakcijeDetalji  = (id) => {
  router.push({ path: '/detalji', 
 name: 'detalji',
  params: { id: id } })
}

</script>

<style>
.bg-blue {
background-color: #2d1eff85;
color: white;
}

.my-card {
width: 100%;
max-width: 300px;
}
</style>