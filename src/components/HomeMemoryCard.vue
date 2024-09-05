<template>
  <ion-card class="w-[350px] h-[200px] mx-auto mt-6 rounded-lg">
    <ion-card-content v-if="cardItem && cardItem.length > 0" class="relative bg-white pt-14">
      <p>Memory process: <span>{{ cardItem[0].memoryProcess }}</span>/4</p>
      <p><span class="mr-1 text-lg font-bold">{{ cardItem.length }}</span>Words</p>
      <div class="text-[19rem] font-bold text-gray-200 absolute top-[-60%] right-[-5%]">{{ cardItem[0].memoryProcess }}</div>
      
      <ion-button 
        fill="clear"
        @click="handleStartMemoryTest"
        class="w-[150px] h-[45px] py-.5 text-white font-bold bg-[#5ed0e0] rounded-lg mt-6 hover:opacity-80"
      >
        <span v-if="!loading">Start Now</span>
        <ion-spinner v-if="loading" name="crescent" class="text-white"></ion-spinner>
      </ion-button>
    </ion-card-content>
  </ion-card>

</template>

<script setup lang=ts>
  import { IonButton, IonCard, IonCardContent } from '@ionic/vue';
  import { defineProps, ref } from 'vue';
  import { useRouter } from 'vue-router';

  const { cardItem } = defineProps(["cardItem"]);
  const router = useRouter();
  const loading = ref(false);

  const handleStartMemoryTest = () => {
    loading.value = true;
    router.push('memory-test');
  };
  
</script>

<style scoped>
  ion-card-content[class*="card-content-"] > p {
    font-size: 16px !important;
    color: #4d4d4d;
  }
</style>