<template>
  
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label>Korisnicko ime</label>
      <input type="text" class="form-control" v-model="KorisnickoIme" placeholder="Korisnicko ime"/> 
    </div>
    <div class="form-group">
      <label>Korisnicki broj</label>
      <input type="text" class="form-control" v-model="broj" placeholder="Korisnicki broj"/> 
    </div>
    <button class ="btn btn-primary btn-block">SignUp</button>
    
  </form>
</template>

<script>
import axios from 'src/boot/axios';
export default {
  name: 'SignUp',
  data(){
    return  {
      KorisnickoIme:'',
      broj:''
    }
  },
  methods: {
    handleSubmit(){
      const data = {
        KorisnickoIme:this.KorisnickoIme,
        broj:this.broj
      }
      
      axios.post('http://localhost:3000/SignUp', data)
      .then(
        res => { console.log(res)}
      )
      .catch(
        err => { console.log(err)}
      )
    }
  }
}

</script>