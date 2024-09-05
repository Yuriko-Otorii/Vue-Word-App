<template>
  <ion-page>
    <ion-header class="shadow-sm">
      <ion-toolbar>
        <ion-title class="mx-auto">Word List</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="flex flex-col items-center">
        <div class="flex items-center w-full mx-auto px-3 h-[30px]">
          <ion-icon v-if="phase !== 'selectCategory'" @click="handleBackArrow" aria-hidden="true" :icon="arrowBack" class="text-3xl text-gray-500" />
          <!-- <ion-searchbar show-clear-button="focus" placeholder="Search word" class="custom-searchbar"></ion-searchbar>
          <ion-icon v-if="phase === 'wordList'" aria-hidden="true" :icon="filter" class="text-3xl text-gray-500" /> -->
        </div>
        <h1 class="text-xl text-center">Category:<span v-if="phase !== 'selectCategory'" class="text-xl ml-1 font-bold">{{ selectedCategoryName }}</span></h1>
        <ion-list v-if="phase === 'selectCategory'" class="w-full flex flex-col gap-2">
          <div
            v-for="category in categoryList"
            :key="category.id"
            @click="handleSlectCategory(category.name)"
            class="flex items-center justify-between bg-white rounded-lg w-full h-[80px] py-3 px-6 mx-auto"
          >
            <p>{{ category.name }}</p>
            <p>
              <span v-if="category.name === 'adjective'">{{ wordsInAsjectives.length }}</span>
              <span v-if="category.name === 'animal'">{{ wordsInAnimals.length }}</span>
              <span v-if="category.name === 'phrasal verb'">{{ wordsInPhrasalVerbs.length }}</span>
              <span v-if="category.name === 'doctors'">{{ wordsInDoctors.length }}</span>
              <span v-if="category.name === 'Business'">0</span>
              items
            </p>              
          </div>
        </ion-list>
        
        <div v-for="word in selectedCategory" :key="word.id" class="w-full">
          <ion-list v-if="phase === 'wordList'" class="w-full flex flex-col gap-4">
            <div              
              @click="handleWordDetail(word.id)"
              class="flex items-center justify-between bg-white rounded-lg w-full h-[50px] py-3 px-6 mx-auto"
            >
              <p>{{ word.word }}</p>
            </div>
          </ion-list>
          <WordDetail v-if="phase === 'wordDetail'" :word="word" :clickedWord="clickedWord"/>
        </div>

        

      </div>
  
    </ion-content>  
  </ion-page>
</template>

<script setup lang="ts">
    import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList } from '@ionic/vue';
    import { arrowBack } from 'ionicons/icons';
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
    const wordsInAsjectives = ref<CardItem[]>([]);
    const wordsInAnimals = ref<CardItem[]>([]);
    const wordsInPhrasalVerbs = ref<CardItem[]>([]);
    const wordsInDoctors = ref<CardItem[]>([]);
    const selectedCategory = ref<CardItem[]>([]);
    const selectedCategoryName = ref<string>("");
    const clickedWord = ref<number>();
    const phase = ref("selectCategory");

    // const wordsInAnimals = words.value.filter((eachItem: CardItem[]) => {
    //   eachItem.filter((item: CardItem) => {
    //     return item.category === "Animal";
    //   });
    // });

    // console.log(wordsInAnimals);
    

    const handleSlectCategory = (category: string) => {
      selectedCategoryName.value = category;
      if (category === "animal") {
        selectedCategory.value = wordsInAnimals.value;
      } else if (category === "adjective") {
        selectedCategory.value = wordsInAsjectives.value;
      } else if (category === "phrasal verb") {
        selectedCategory.value = wordsInPhrasalVerbs.value;
      } else if (category === "doctors") {
        selectedCategory.value = wordsInDoctors.value;
      } else {
        selectedCategory.value = [];
      }
      phase.value = "wordList"
    }

    const handleWordDetail = (wordId: number) => {
      phase.value = "wordDetail"
      clickedWord.value = wordId;
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
        console.log(response2.data);

        const [words1, words2, words3, words4] = words.value;

        wordsInAsjectives.value = words1;
        wordsInAnimals.value = words2;
        wordsInPhrasalVerbs.value = words3;
        wordsInDoctors.value = words4;
        
      } catch (error) {
        console.log(error);
      }
    });

</script>