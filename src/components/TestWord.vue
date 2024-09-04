<template>
  <div class="w-full flex flex-col items-center">
    <div class="flex items-center gap-1 mb-5">
      <ion-icon aria-hidden="true" :icon="navigateOutline" />
      <p class="text-lg">Choose correct answer</p>
    </div>
    
    <p><span>1</span>/<span>10</span></p>
    
    <div class="w-full flex items-center gap-1">
      <ion-icon aria-hidden="true" :icon="timeOutline" class="text-lg" />
      <div class="w-full bg-gray-200 rounded-full h-2.5">
        <div class="progress-bar bg-[#4289A7] h-2.5 rounded-full"></div>
      </div>  
    </div>

    <div class="w-full h-[170px] flex justify-center items-center mt-5 rounded-lg bg-white border-2 border-gray-300">
      <p class="text-2xl">deserted</p>
    </div>

    <div class="w-full flex flex-col gap-5 my-5">
      <button class="w-full h-fit min-h-14 p-2 rounded-lg bg-white border-2 border-gray-300">abandoned</button>
      <button class="w-full h-fit min-h-14 p-2 rounded-lg bg-white border-2 border-gray-300">deserted</button>
      <button class="w-full h-fit min-h-14 p-2 rounded-lg bg-white border-2 border-gray-300">deserted</button>
      <button class="w-full h-fit min-h-14 p-2 rounded-lg bg-white border-2 border-gray-300">deserted</button>
    </div>

    <button v-if="!isTimeOver" type="button" class="flex justify-center w-[250px] px-20 py-2 rounded-lg bg-gray-400 text-lg text-white font-bold absolute bottom-[80px]">skip</button>
    <button v-if="isTimeOver" type="button" class="flex justify-center w-[250px] px-20 py-2 mt-20 rounded-lg bg-[#79eefd] text-lg text-white font-bold border">Next</button>

    
  </div>

</template>

<script setup>
  import { IonIcon } from '@ionic/vue';
  import { navigateOutline, timeOutline } from 'ionicons/icons';
  import { ref, onMounted } from 'vue';

  const isTimeOver = ref(false);

  onMounted(() => {
    const progressBar = document.querySelector('.progress-bar');
    let width = 100;
    const interval = setInterval(() => {
      width -= 1;
      progressBar.style.width = `${width}%`;
      if (width === 0) {
        clearInterval(interval);
        isTimeOver.value = true;
      }
    }, 100);
  });


</script>