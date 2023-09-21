<template>
  <div>
    <br>
    <q-input
    v-model="searchTerm"
    outlined
    dense
    placeholder="Pretražite naslove, sadržaj, direktora..."
    @keyup.enter="search"
    class="my-search-bar"
  />
    <div class="q-pa-md row items-start q-gutter-md">


      <template  v-if="filteredPosts.length > 0">
        <q-card style="margin-left:3%;"
          v-for="post in filteredPosts"
          :key="post.id"
          class="my-card"
        >
          <q-img :src="post.cover" />

          <q-card-section>
            <q-btn
              fab
              color="primary"
              icon="more"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%)"
              :to="'/detalji/' + post.ID_Film"
            />

            <q-btn
              fab
              color="red"
              icon="delete"
              class="absolute"
              style="top: 0px; left: 12px; transform: translateY(-50%)"
              @click="deleteById(post.ID_Film)"
            />

            <div class="myDiv" style="padding: 10px;"></div>

            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">{{ post.Naslov }}</div>
            <div class="row no-wrap items-center">
              <div class="text-caption text-grey">{{ post.Ime }}{{" "}}{{ post.Prezime }}</div>
            </div>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">{{ formatDate(post.DatumObjave) }}</div>
            <div class="text-caption text-grey">
              {{ post.Sadrzaj }}
            </div>
          </q-card-section>

          <q-separator />
        </q-card>
      </template>

      <template v-else>
        <div class="text-caption text-grey">Nije moguće pronaći traženi naslov</div>
      </template>
    </div>
  </div>

</template>

<script setup>
  import moment from 'moment';
import { ref, computed, onMounted } from "vue";
import { api } from 'boot/axios';
import { useRoute, useRouter } from 'vue-router';

const posts = ref([]);
const searchTerm = ref('');
const route = useRoute();
const router = useRouter();

const getPosts = async () => {
  try {
    const response = await api.get('filmovi');
    console.log(response.data);
    posts.value = response.data;
  } catch (error) {
    console.log(error);
  }
};
const formatDate = (date) => {
    return moment(date).format('DD-MM-YYYY');
  };
  
const deleteById = async (id) => {
  try {
    const response = await api.delete(`http://localhost:3000/obrisi_film/${id}`);
    console.log(response.data);
    // Perform any additional actions after successful deletion
  } catch (error) {
    console.log(error);
  }
  getPosts();
};

const search = () => {
  filteredPosts.value = posts.value.filter(
      (post) =>
        post.Naslov.toLowerCase().includes(searchTerm.value.toLowerCase()) || post.Sadrzaj.toLowerCase().includes(searchTerm.value.toLowerCase()) || post.Ime.toLowerCase().includes(searchTerm.value.toLowerCase())|| post.Prezime.toLowerCase().includes(searchTerm.value.toLowerCase()));
        //post.Naslov.toLowerCase().includes(searchTerm.value.toLowerCase()) || post.Sadrzaj.toLowerCase().includes(searchTerm.value.toLowerCase()));
  
        //  filteredPosts.value = posts.value.filter(post => post.Naslov.toLowerCase().includes(searchTerm.value.toLowerCase()));
};

onMounted(() => {
  getPosts();
});

const goToAtrakcijeDetalji = (id) => {
  router.push({ path: '/detalji', name: 'detalji', params: { id: id } });
};

const filteredPosts = computed(() => {
  return posts.value.filter(post => post.Naslov.toLowerCase().includes(searchTerm.value.toLowerCase()) || post.Sadrzaj.toLowerCase().includes(searchTerm.value.toLowerCase()) || post.Ime.toLowerCase().includes(searchTerm.value.toLowerCase()) || post.Prezime.toLowerCase().includes(searchTerm.value.toLowerCase()));
  //return posts.value.filter(post => post.Naslov.toLowerCase().includes(searchTerm.value.toLowerCase()) || post.Sadrzaj.toLowerCase().includes(searchTerm.value.toLowerCase()));
});

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

.my-search-bar {
  margin-bottom: 10px;
  margin-left: 20px;
  background-color: #ffffff9d;
  width:40%;
  border-radius: 10px;
}
</style>