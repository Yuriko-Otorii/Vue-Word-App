<template>
  <ion-page class="bg-[#79eefd]">
    <ion-header class="shadow-sm">
      <ion-toolbar>
        <ion-title class="mx-auto">Word register</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-5 px-2 pt-5">
        <div class="flex flex-col">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <ion-select
            aria-label="Category"
            interface="popover"
            placeholder="Select category"
            @ionChange="handleChange($event)"
            class="bg-white rounded px-2"
          >
            <ion-select-option v-for="category in categoryList" :key="category" :value="category" class="bg-white">{{ category }}</ion-select-option>
          </ion-select>

          <button @click="openModal" class="custom-btn w-fit flex align-center justify-end gap-1 rounded-lg px-1 py-2 mt-2 self-end">
            <ion-icon aria-hidden="true" :icon="addOutline" class="text-gray-500" />
            <span class="text-gray-500">Create new category</span>
          </button>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="word">
            Word
          </label>
          <input v-model="wordInput" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="word" type="text" placeholder="word">
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="definition">
            Definition
          </label>
          <input v-model="definitionInput" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="definition" type="text" placeholder="definition">
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="example">
            Example
          </label>
          <input v-model="exampleInput" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="example" type="text" placeholder="example">
        </div>

        <button type="submit"  class="flex justify-center w-[250px] px-20 py-2 rounded-lg absolute bottom-[30%] left-1/2 transform -translate-x-1/2 bg-[#79eefd] text-lg text-white font-bold border">Register</button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonSelect, IonSelectOption, modalController  } from '@ionic/vue';
  import { addOutline } from 'ionicons/icons';
  import { ref } from 'vue';
  import axios from 'axios';

  import CategoryCreateModal from '@/components/CategoryCreateModal.vue';

  const categoryList = ref(['Animal', 'Healthcare', 'Phrasal verb']);

  const wordInput = ref('');
  const definitionInput = ref('');
  const exampleInput = ref('');
  const categorySelect = ref('');

  const handleChange = (event: CustomEvent) => {
    console.log(event.detail.value);
    categorySelect.value = event.detail.value;
  }

  const openModal = async () => {
    const modal = await modalController.create({
      component: CategoryCreateModal,
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'create') {
      categoryList.value.push(data);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/words', {
        word: wordInput.value,
        definition: definitionInput.value,
        example: exampleInput.value,
        category: categorySelect.value,
        memoryProcess: "1",
        hide: true,
        options: [
          {
            definition: definitionInput.value,
            isCorrect: true,
          },
          {
            definition: "to succeed in avoiding punishment for something",
            isCorrect: false,
          },
          {
            definition: "a large African animal with a very long neck and long legs",
            isCorrect: false,
          },
          {
            definition: "a doctor who treats children",
            isCorrect: false,
          },
        ],
      });
      console.log(response.data);
      
    } catch (error) {
      console.log(error);      
    }
    console.log(wordInput.value, definitionInput.value, exampleInput.value, categorySelect.value);
  }
</script>

<style scoped>
  button.custom-btn {
  border: 2px solid rgb(154, 154, 154);
  border-radius: 8px;
  padding: 10px;
  background-color: transparent;
}
</style>