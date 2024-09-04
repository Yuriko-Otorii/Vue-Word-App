<template>
    <div class="flex flex-col items-start bg-white rounded-lg w-full h-fit m-3 py-8 px-5">
      <div class="flex items-center justify-between bg-white rounded-lg w-full mx-auto mb-4">
        <p class="text-3xl font-bold">deserted</p>
        <ion-icon aria-hidden="true" :icon="starOutline" class="text-3xl text-gray-400" />
      </div>

      <p class="text-lg mb-1">adjective</p>
      <p class="text-lg">Memory process:<span class="ml-1">1</span>/4</p>
      
      <div class="w-full h-[2px] bg-[#4289A7] opacity-60 rounded-lg self-center my-5"></div>
      
      <label class="text-base text-gray-400">Definition:</label>
      <p class="text-lg mb-8">If a place is deserted, there are no people in it.</p>
      
      <label class="text-base text-gray-400">Examples:</label>
      <ul class="list-disc ml-4">
        <li class="text-lg">a deserted building/street</li>
        <li class="text-lg">The coastal resorts are deserted in winter.</li>
      </ul>

    </div>
</template>

<script setup lang="ts">
  import { IonIcon } from '@ionic/vue';
  import { starOutline } from 'ionicons/icons';

</script>