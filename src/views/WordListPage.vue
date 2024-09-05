<template>
  <ion-page>
    <ion-header class="shadow-sm">
      <ion-toolbar>
        <ion-title class="mx-auto">Word List</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="flex flex-col items-center">
        <div class="flex items-center w-full mx-auto px-3">
          <ion-icon v-if="phase !== 'selectCategory'" @click="handleBackArrow" aria-hidden="true" :icon="arrowBack" class="text-3xl text-gray-500" />
          <ion-searchbar show-clear-button="focus" placeholder="Search word" class="custom-searchbar"></ion-searchbar>
          <ion-icon v-if="phase === 'wordList'" aria-hidden="true" :icon="filter" class="text-3xl text-gray-500" />
        </div>
        <h1 class="text-xl text-center">Category:<span v-if="phase !== 'selectCategory'" class="ml-1">Animal</span></h1>
        <ion-list v-if="phase === 'selectCategory'" class="w-full flex flex-col gap-2">
          <div
            v-for="category in categoryList"
            :key="category.id"
            @click="handleSlectCategory"
            class="flex items-center justify-between bg-white rounded-lg w-full h-[80px] py-3 px-6 mx-auto"
          >
            <p>{{ category.name }}</p>
            <p><span>10</span>items</p>              
          </div>
        </ion-list>
        
        <ion-list v-if="phase === 'wordList'" class="w-full flex flex-col gap-4">
          <div
            v-for="word in words"
            :key="word"
            @click="handleWordDetail"
            class="flex items-center justify-between bg-white rounded-lg w-full h-[50px] py-3 px-6 mx-auto"
          >
            <p>{{ word }}</p>
          </div>
        </ion-list>

        <WordDetail v-if="phase === 'wordDetail'" />

      </div>
  
    </ion-content>  
  </ion-page>
</template>

<script setup lang="ts">
    import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonIcon, IonList } from '@ionic/vue';
    import { arrowBack, filter } from 'ionicons/icons';
    import { ref, onMounted } from 'vue';
    import axios from 'axios';

    import WordDetail from '@/components/WordDetail.vue';
    import { CardItem } from '@/types/type';

    type category = {
      id: number;
      name: string;
    }

    const categoryList = ref<category[]>([]);
    const words = ref([]);
    const wordsInAnimals = ref([]);
    // const words = ["Dog", "Cat", "Raabbit", "Fox", "Pocupine", "Elephant", "Giraffe", "Lion", "Tiger", "Bear", "Wolf", "Deer", "Horse", "Cow", "Pig", "Sheep", "Goat", "Chicken", "Duck", "Goose", "Turkey", "Pigeon", "Parrot", "Ostrich", "Eagle", "Hawk", "Falcon", "Owl", "Swan", "Pelican", "Stork", "Crane", "Flamingo", "Penguin", "Seagull", "Albatross", "Sparrow", "Starling", "Crow", "Raven", "Magpie", "Jay", "Chickade"];
    const phase = ref("selectCategory");

    // const wordsInAnimals = words.value.filter((eachItem: CardItem[]) => {
    //   eachItem.filter((item: CardItem) => {
    //     return item.category === "Animal";
    //   });
    // });

    // console.log(wordsInAnimals);
    

    const handleSlectCategory = () => {
      phase.value = "wordList"
    }

    const handleWordDetail = () => {
      phase.value = "wordDetail"
    }

    const handleBackArrow = () => {
      if (phase.value === "wordList") {
        phase.value = "selectCategory"
      } else {
        phase.value = "wordList"
      } 
    }

    onMounted(async () => {
      try {
        const [response1, response2] = await Promise.all([
          axios.get('http://localhost:5000/category'),
          axios.get('http://localhost:5000/words')
        ]);

        categoryList.value = response1.data;
        words.value = response2.data;

        wordsInAnimals.value = words.value.filter((eachItem: CardItem[]) => {
          console.log(eachItem);
          
          eachItem.filter((item: CardItem) => {
            return item.category === "Animal";
          });
        });

        console.log(wordsInAnimals.value);
        

        // const response = await axios.get('http://localhost:5000/category');
        // categoryList.value = response.data;
        // console.log(response.data);        
      } catch (error) {
        console.log(error);
      }
    });

</script>