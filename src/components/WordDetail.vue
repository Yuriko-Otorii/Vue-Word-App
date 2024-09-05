<template>
    <div v-if="clickedWord === word.id" class="flex flex-col items-start bg-white rounded-lg w-full h-fit m-3 py-8 px-5 mx-auto">
      <div class="flex items-center justify-between bg-white rounded-lg w-full mx-auto mb-4">
        <p class="text-3xl font-bold">{{ word.word }}</p>
        <ion-icon aria-hidden="true" :icon="star" class="text-3xl text-gray-300" />
      </div>

      <p class="text-lg mb-1">{{ word.category  }}</p>
      <p class="text-lg">Memory process:<span class="ml-1">{{ word.memoryProcess }}</span>/4</p>
      
      <div class="w-full h-[2px] bg-[#4289A7] opacity-60 rounded-lg self-center my-5"></div>
      
      <label class="text-base text-gray-400">Definition:</label>
      <p class="text-lg mb-8">{{ word.definition }}</p>
      
      <label class="text-base text-gray-400">Examples:</label>
      <ul class="">
        <li class="text-lg">{{ word.example }}</li>
      </ul>

    </div>
</template>

<script setup lang="ts">
  import { IonIcon } from '@ionic/vue';
  import { star } from 'ionicons/icons';
  import { defineProps } from 'vue';

  const { word, clickedWord } = defineProps(["word", "clickedWord"]);

  
</script>