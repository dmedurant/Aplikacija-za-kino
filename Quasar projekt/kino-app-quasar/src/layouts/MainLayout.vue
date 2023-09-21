<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background-color: rgba(0,0,0, 0.6)">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Kino App
        </q-toolbar-title>

        <div></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
    >
      <q-list>
        <q-item-label
          header
        >
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [

  {
    title: 'Početna',
    caption: 'Prikaz svih filmova',
    icon: '',
    link: '#'
  },
  {
    title: 'Login',
    caption: 'Ulogiravanje u sustav',
    icon: '',
    link: '#/log'
  },
  {
    title: 'Redatelji prikaz',
    caption: 'Prikaz redatelja',
    icon: '',
    link: '#/red'
  },/*
  {
    title: 'Redatelji unos',
    caption: 'Unos redatelja',
    icon: '',
    link: '#/redUnos'
  },*/
 /*
  {
    title: 'Film unos',
    caption: 'Unos filmova',
    icon: '',
    link: '#/filmUnos'
  },*/
  {
    title: 'Film prikaz',
    caption: 'Prikaz filmova',
    icon: '',
    link: '#/filmPrikaz'
  },
  /*{
    title: 'Korisnici prikaz',
    caption: 'Prikaz ',
    icon: '',
    link: '#/korPrikaz'
  },
  {
    title: 'Korisnici unos',
    caption: 'unos ',
    icon: '',
    link: '#/korUnos'
  },*/
  {
    title: 'Rezervacije',
    caption: 'Rezervacije ',
    icon: '',
    link: '#/rezervacije'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
