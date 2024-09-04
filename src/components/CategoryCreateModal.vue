<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Create category</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="cancel" color="medium">Cancel</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <div class="w-[90%] mt-[10rem] mx-auto">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="category">
        Category name
      </label>
      <input v-model="categoryName" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="category" type="text" placeholder="category">
      <button
        type="button"
        @click="handleCreateCategory"
        :disabled="!categoryName"
        class="flex justify-center w-[250px] px-20 py-2 rounded-lg absolute bottom-[50%] left-1/2 transform -translate-x-1/2 bg-[#79eefd] text-lg text-white font-bold disabled:opacity-50"
      >
        Create
      </button>
    </div>

  </ion-content>
</template>

<script lang="ts" setup>
  import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    modalController,
  } from '@ionic/vue';
  import { ref } from 'vue';
  const categoryName = ref();

  const cancel = () => modalController.dismiss(null, 'cancel');
  
  const handleCreateCategory = () => {
    modalController.dismiss(categoryName.value, 'create');
  };
</script>