<template>
  <ion-page>
    <ion-header class="shadow-sm">
      <ion-toolbar>
        <ion-title>Memory test</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">

      <div v-if="testPhase === 'start'" class="w-full flex flex-col items-center gap-10 mt-20">
        <h1 class="text-3xl">Are you ready?</h1>
        <p class="text-xl">Memory Process:<span class="ml-1">{{ memoryProcessNum }}</span>/4</p>
        <button type="button" @click="handleStartTest" class="flex justify-center w-[250px] px-20 py-2 mt-20 rounded-lg bg-[#79eefd] text-lg text-white font-bold border">Start</button>
      </div>

      <div v-if="testPhase === 'testing'">
        <div v-for="(word, index) in testWords" :key="word.id" >
          <TestWord
            v-if="!word.hide"
            @handleChangeWordDisplay="handleChangeWordDisplay"
            @startTimer="startTimer"
            @handleAnswered="handleAnswered"
            @handleCorrectCounter="handleCorrectCounter"
            :word="word"
            :index="index"
            :isTimeOver="isTimeOver"
            :wordsLength="testWords.length"
          />
        </div>
      </div>

      <div v-if="testPhase === 'finish'" class="w-full flex flex-col items-center">
        <h1 class="text-3xl font-bold">Finish!</h1>
        <p class="text-xl">Score:<span class="ml-1">{{ correctCounter }}</span>/<span>{{ testWords.length }}</span></p>
        <img src='../../public/memory test finish img.png' alt="memory test finish img" class="w-[450px] h-[450px]" />
        <!-- <button type="button" class="flex justify-center w-[90%] px-14 py-2 rounded-lg bg-[#79eefd] text-lg text-white font-bold">Review the questions</button> -->
        <button type="button" @click="handleBackStart" class="flex justify-center gap-1 w-[90%] px-8 py-2 rounded-lg text-lg text-gray-500 font-bold"
        >
          <ion-icon aria-hidden="true" :icon="returnUpBackOutline" class="text-2xl text-gray-500" />
          Try again
        </button>
      </div>

      <ReviewWord v-if="testPhase === 'review'" />

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon } from '@ionic/vue';
  import { returnUpBackOutline } from 'ionicons/icons';
  import { ref, onMounted, onUnmounted } from 'vue';

  import TestWord from '@/components/TestWord.vue';
  import ReviewWord from '@/components/ReviewWord.vue';
  import { CardItem } from '@/types/type';

  const testPhase = ref("start");
  const testWords = ref<CardItem[]>([]);
  const isTimeOver = ref(false);
  const isAnswered = ref(false);
  const memoryProcessNum = ref("");
  const correctCounter = ref(0);

  const handleStartTest = () => {
    testPhase.value = "testing";
  }

  const handleBackStart = () => {
    testPhase.value = "start";
    const testItem = JSON.parse(localStorage.getItem('testItem')!);
    testWords.value = testItem;
    testWords.value[0].hide = false;
    memoryProcessNum.value = testWords.value[0].memoryProcess;
  }

  const handleChangeWordDisplay = (index: number) => {
    testWords.value[index].hide = true;
    if (testWords.value.length !== index + 1) {
      testWords.value[index+1].hide = false;
    } else {
      testPhase.value = "finish";
    }
    isTimeOver.value = false;
  }

  const handleAnswered = () => {
    isAnswered.value = true;
  }

  const handleCorrectCounter = () => {
    correctCounter.value += 1;
  }

  const startTimer = (selector: string) => {      
    const progressBar = document.querySelector(selector) as HTMLElement;
    let width = 100;
    const interbal = setInterval(() => {
      width -= 1;
      progressBar!.style.width = `${width}%`;
      if (isAnswered.value) {
        clearInterval(interbal);
        width = 100;
        isTimeOver.value = true;
        isAnswered.value = false;
      } else if (width === 0) {
        clearInterval(interbal);
        width = 100;      
        isTimeOver.value = true;
        isAnswered.value = false;
      }
    }, 50);
  };

  onMounted(async () => {
    const testItem = JSON.parse(localStorage.getItem('testItem')!);
    testWords.value = testItem;
    testWords.value[0].hide = false;
    memoryProcessNum.value = testWords.value[0].memoryProcess;

  });

  onUnmounted(() => {
    testPhase.value = "start";
  });

</script>
