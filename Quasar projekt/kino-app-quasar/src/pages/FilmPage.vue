<template>
  <div style="background-color: #229df9;">
    <div v-for="post in posts" :key="post.ID_Film" class="row q-pa-md">
      <div q-card>
        <p style="font-size: 60px; font-weight:700;">{{ post.Naslov }}</p>
        <q-img
          :src="post.cover"
          width="300px"
          height="450px"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        ></q-img>
      </div>
      <div class="q-pa-md">
        <div class="q-pa-md items-start q-gutter-xs">
          <p style="font-size: 20px; font-weight:700;">Opis:</p>
          <div class="post-text">{{ post.Sadrzaj }}</div>
          <q-separator color="white" />
          <br>
          <p style="font-size: 20px; font-weight:700;">Datum objave:</p>
          <h7>{{ formatDate(post.DatumObjave) }}</h7>
          <q-separator color="white" />
          <div class="" style="max-width: 400px"></div>
        </div>

        <div class="q-pa-md">
          <div class="column">
            <div class="text-h6 q-mb-md">Rezervacija</div>
            <q-table
              :rows="availableDates"
              :columns="columns"
              row-key="date"
              :rows-per-page-options="[5, 10, 15]"
              :pagination="pagination"
              dense
              flat
              class="shadow-0"
            >
              <template v-slot:top-left>
                <p>Dostupno</p>
              </template>
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="date" :props="props">{{ formatDate(props.row.DatumPrikaza) }}</q-td>
                  <q-td key="vrijeme" :props="props">{{ formatTime(props.row.vrijeme_prikaza) }}</q-td>
                  <q-td key="action" :props="props">
                    <q-btn
                      label="Select"
                      color="primary"
                      @click="navigateToAnotherPage(props.row.id_prikaza)"
                    />
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
          <q-separator vertical inset class="q-mx-lg" />
          <div class="column items-center">
            <q-btn name="rezervacija" label="Odabir" @click="rezervacijaFilma" color="blue" class="q-ml-sm" />
          </div>
        </div>
      </div>
    </div>
    <q-card-section>
      <q-btn class="button" @click="$router.push('/') " label="Natrag na početnu" />
    </q-card-section>
    <div class="q-pa-md row items-start q-gutter-xs">
      <p style="font-size: 25px; color: white">Komentari:</p>
    </div>
    <div class="q-pa-md row items-start q-gutter-xs">
      <p style="font-size: 20px; color: white">Ovdje možete pogledati komentare o atrakciji</p>
    </div>
  </div>
</template>

<script setup>
import moment from 'moment';
import { ref, onMounted } from "vue";
import { api } from 'boot/axios';
import { useRoute, useRouter } from 'vue-router';

const posts = ref([]);
const comments = ref([]);
const route = useRoute();
const router = useRouter();

const trenutniID = route.params.id;

const getPosts = async (id) => {
  try {
    const response = await api.get(`http://localhost:3000/film/` + trenutniID);
    posts.value = response.data;
    console.log("ID je: ", trenutniID);
    console.log("Podatak iz baze po ID: ", posts.value);

    // Load available dates from a different table
    const availableDatesResponse = await api.get('http://localhost:3000/available-dates/' + trenutniID);
    availableDates.value = availableDatesResponse.data;

  } catch (error) {
    console.log(error);
  }
};

const availableDates = ref([]);
const columns = [
  { name: 'date', required: true, label: 'Date', align: 'left', field: 'date', sortable: true },
  { name: 'vrijeme', required: true, label: 'Vrijeme', align: 'left', field: 'vrijeme', sortable: true },
  { name: 'action', required: true, label: 'Action', align: 'center', field: 'action' }
];
const pagination = { rowsPerPage: 5 };



const rezervacijaFilma = () => {
  // Handle rezervacijaFilma logic
};

const formatDate = (date) => {
  return moment(date).format('YYYY-MM-DD');
};

const formatTime = (time) => {
  return moment(time, 'HH:mm:ss', true).format('HH:mm');
};

const navigateToAnotherPage = (rowID) => {
  router.push({
    path: '/rezervacija',
    name: "rezervacija",
    params: {
      id_filma: trenutniID,
      id_prikaza: rowID,
    },
  });
};

onMounted(() => {
  getPosts(trenutniID);
});

</script>




<style scoped></style>


<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 800px

</style>

<style>
.post-text {
  max-width: 620px;
  word-wrap: break-word;
}

.button{
  background-color: black;
  color:white;
}
.button:hover{
  background-color:white;
  color:black;
}

</style>