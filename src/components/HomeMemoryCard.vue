<template>
  <ion-card class="w-[350px] h-[200px] mx-auto">
    <ion-card-content class="relative mt-10">
      <p>Memory process: <span>1</span>/4</p>
      <p><span class="mr-1 text-lg">10</span>Words</p>
      <div class="text-[19rem] font-bold text-gray-100 absolute top-[-90%] right-[-5%]">1</div>
      
      <ion-button 
        fill="clear"
        class="w-[150px] py-.5 text-white font-bold bg-[#5ed0e0] rounded-lg mt-10 hover:opacity-80"
      >
        Start Now
      </ion-button>
    </ion-card-content>

  </ion-card>

</template>

<script setup lang=ts>
  import { IonButton, IonCard, IonCardContent } from '@ionic/vue';
</script>