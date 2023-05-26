<template>
    <div class="bg-image">
    <q-page padding class="flex flex-center">
      <q-card style="width: 350px;">
        <q-card-section>
          <div class="q-gutter-md full-with" style="max-width: 500px">
          <div class="full-with">
      <div class="q-gutter-md" style="max-width: 350px">
        <p  class="text-h5 text-weight-light text-center" style="color:#2196F3">Unos novog Filma</p>
        <q-input ref="naslovRef" v-model="inputNaslov" label="Naslov" placeholder="Naslov">
        </q-input>
  
        <q-input ref="SadrzajRef" v-model="inputSadrzaj" label="Sadrzaj" placeholder="Sadržaj ">
        </q-input>
  
        <q-input ref="DatumObjaveRef" v-model="inputDatumObjave" label="Datum Objave" placeholder="format: gg-mm-dd ">
        </q-input>
        <q-input ref="trajanjeRef" v-model="inputTrajanje" label="Trajanje" placeholder="Trajanje ">
        </q-input>
  
          <div
            class="q-pa-sm"
            style="max-width: 700px; overflow-wrap: break-word"
          ></div>
        </div>
      </div>
        <div class="row justify-center q-pa-md">
          <div class="row justify-center q-pa-md">
            <q-btn
            label="Unesi"
            @click="submitForm"
            color="blue"
            class="q-ml-sm"
          />
          </div>
        </div>
      </div>
  
  <q-dialog v-model="showDialog">
        <q-card>
          <q-card-section> Film je uspješno dodan! </q-card-section>
          <q-card-actions align="right">
            <q-btn
              flat
              label="Ok"
              color="primary"
              v-close-popup
              @click="closeAndReload"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
  </q-card-section>
    </q-card>
  </q-page>
  </div>
  </template>
  
  <script>
  // eslint-disable-next-line no-unused-vars
  import { QDialog } from 'quasar'
  // eslint-disable-next-line no-unused-vars
  import { ref } from 'vue'
  import axios from 'axios' // Import axios
  export default {
    data () {
      return {
        inputNaslov: '',
        inputSadrzaj: '',
        inputDatumObjave: '',
        inputTrajanje: ''
  
      }
    },
    methods: {
      closeAndReload() {
        this.showDialog = false;
        window.location.reload();
      },
  
      resetForm () {
        this.inputNaslov = ''
        this.inputSadrzaj = ''
        this.inputDatumObjave = ''
        this.inputTrajanje = ''
        this.$refs.naslovRef.resetValidation()
        this.$refs.SadrzajRef.resetValidation()
        this.$refs.DatumObjaveRef.resetValidation()
        this.$refs.trajanjeRef.resetValidation()
      },
      async submitForm () {
        const sampleData = {
            naslov: this.inputNaslov,
          sadrzaj: this.inputSadrzaj,
          datumObjave: this.inputDatumObjave,
          trajanje: this.inputTrajanje
        }
        try {
          const response = await axios.post(
            'http://localhost:3000/unosFilm',
            sampleData
          )
          console.log(response.data)
          this.showDialog = true
          this.resetForm()
        } catch (error) {
          console.error(error)
        }
      }
    },
  }
  
  </script>
  
  <style>
    .bg-image {
      background-image: url(https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v1016-c-08_1-ksh6mza3.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=f584d8501c27c5f649bc2cfce50705c0)
    }
  </style>