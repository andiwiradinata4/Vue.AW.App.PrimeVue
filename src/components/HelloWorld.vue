<script setup lang="ts">
import { ref } from 'vue';
import DatePicker from 'primevue/datepicker';
import InputOtp from 'primevue/inputotp';
import awDatePicker from '@/app/base/components/awDatePicker.vue';
const selectedDate = ref(null);
const minDate = new Date(); // Contoh: tanggal hari ini  
const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)); // Contoh: satu tahun ke depan  

defineProps<{
  msg: string
}>()

const dateValue = ref();
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
  </div>
  <awDatePicker v-model="selectedDate" name="datePicker" formatValue="dd/MM/yyyy" :minValue="minDate"
    :maxValue="maxDate" :useCustomIcon="true" customIcon="pi pi-calendar" />
  <InputOtp v-model="value" />

</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>



<!-- <template>  
  <div class="form-container">  
    <h2>Form Example</h2>  
    <form @submit.prevent="handleSubmit">  
      <div class="form-group">  
        <label for="datePicker">Select Date:</label>  
        <awDatePicker  
          v-model="selectedDate"  
          name="datePicker"  
          formatValue="dd/MM/yyyy"  
          :minValue="minDate"  
          :maxValue="maxDate"  
          :useCustomIcon="true"  
          customIcon="pi pi-calendar"  
        />  
      </div>  
      <button type="submit">Submit</button>  
    </form>  
    <p>Selected Date: {{ selectedDate }}</p>  
  </div>  
</template>  
  
<script setup lang="ts">  
import { ref } from 'vue';  
import awDatePicker from './path/to/awDatePicker.vue'; // Ganti dengan path yang sesuai  
  
const selectedDate = ref(null);  
const minDate = new Date(); // Contoh: tanggal hari ini  
const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)); // Contoh: satu tahun ke depan  
  
const handleSubmit = () => {  
  console.log('Selected Date:', selectedDate.value);  
};  
</script>  
  
<style scoped>  
.form-container {  
  max-width: 400px;  
  margin: auto;  
}  
.form-group {  
  margin-bottom: 20px;  
}  
</style>   -->
