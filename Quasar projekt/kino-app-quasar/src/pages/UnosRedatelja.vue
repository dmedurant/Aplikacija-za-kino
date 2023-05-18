<template>
    <div class="bg-image">
    <q-page padding class="flex flex-center">
      <q-card style="width: 350px;">
        <q-card-section>
          <div class="q-gutter-md full-with" style="max-width: 500px">
          <div class="full-with">
      <div class="q-gutter-md" style="max-width: 350px">
        <p  class="text-h5 text-weight-light text-center" style="color:#2196F3">Unos novog redatelja</p>
        <q-input ref="imeRef" v-model="inputIme" label="Ime" placeholder="Ime">
        </q-input>
  
        <q-input ref="prezimeRef" v-model="inputPrezime" label="Prezime" placeholder="Prezime ">
        </q-input>
  
        <q-input ref="bioRef" v-model="inputBio" label="Bio" placeholder="Bio ">
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
          <q-card-section> Redatelj je uspješno dodan! </q-card-section>
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
  import imageCompression from "browser-image-compression";
  // eslint-disable-next-line no-unused-vars
  import { ref } from 'vue'
  import axios from 'axios' // Import axios
  export default {
    data () {
      return {
        inputIme: '',
        inputPrezime: '',
        inputBio: '',
  
      }
    },
    methods: {
      closeAndReload() {
        this.showDialog = false;
        window.location.reload();
      },
  
      resetForm () {
        this.inputIme = ''
        this.inputPrezime = ''
        this.inputBio = ''
        this.$refs.imeRef.resetValidation()
        this.$refs.prezimeRef.resetValidation()
        this.$refs.bioRef.resetValidation()
      },
      async submitForm () {
        const sampleData = {
          ime: this.inputIme,
          prezime: this.inputPrezime,
          biografija: this.inputBio
        }
        try {
          const response = await axios.post(
            'http://localhost:3000/unosRedatelja',
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
      background-image: url(https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/45680/article_featured%403x.jpg)
    }
  </style>