<template>
  <div class="w-full flex flex-col items-center">
    <div class="flex items-center gap-1 mb-5">
      <ion-icon aria-hidden="true" :icon="navigateOutline" />
      <p class="text-lg">Choose correct answer</p>
    </div>
    
    <p><span>{{ index + 1 }}</span>/<span>10</span></p>
    
    <div class="w-full flex items-center gap-1">
      <ion-icon aria-hidden="true" :icon="timeOutline" class="text-lg" />
      <div class="w-full bg-gray-200 rounded-full h-2.5">
        <div class="progress-bar bg-[#4289A7] h-2.5 rounded-full"></div>
      </div>  
    </div>

    <div class="w-full h-[170px] flex justify-center items-center mt-5 rounded-lg bg-white border-2 border-gray-300">
      <p class="text-2xl">{{ word.word }}</p>
    </div>

    <div class="option-wrapper w-full flex flex-col gap-5 my-5">
      <div 
        v-for="(option, index) in shaffledOptions"
        :key="index"
        @click="handleClickAnswer(option.isCorrect, index)"
        :class="`w-full h-fit min-h-14 p-2 rounded-lg bg-white border-2 border-gray-300 ${(isTimeOver && option.isCorrect) ? 'border-lime-400' : 'border-gray-300'}`"
      >
        <p class="hidden">{{ option.isCorrect }}</p>
        {{ option.definition }}
      </div>
    </div>

    <button v-if="!isTimeOver" type="button" class="flex justify-center w-[250px] px-20 py-2 rounded-lg bg-gray-400 text-lg text-white font-bold absolute bottom-[80px]">skip</button>
    <button v-if="isTimeOver" type="button" @click="handleChangeWordDisplay" class="flex justify-center w-[250px] px-20 py-2 mt-14 rounded-lg bg-[#79eefd] text-lg text-white font-bold">Next</button>
  </div>

</template>

<script setup lang="ts">
  import { IonIcon } from '@ionic/vue';
  import { navigateOutline, timeOutline } from 'ionicons/icons';
  import { ref, onMounted, defineProps, defineEmits } from 'vue';

  const emit = defineEmits(['handleChangeWordDisplay', 'startTimer', 'handleAnswered']);
  const { word, index, isTimeOver } = defineProps(["word", "index", "isTimeOver"]);
  const isAnswerClicked = ref(false);

  const options = word.options;
  const shaffledOptions = options.sort(() => Math.random() - 0.5);

  const handleChangeWordDisplay = () => {
    emit('handleChangeWordDisplay', index);
  };

  const handleClickAnswer = (answer: boolean, index: number) => {
    emit('handleAnswered'); 
    const btnElems = document.querySelector('.option-wrapper');
    const clickedBtn = btnElems?.children[index] as HTMLElement;
    
    if (!isAnswerClicked.value){
      if (answer) {
        clickedBtn.classList.add('border-lime-400');
      } else {
        clickedBtn.classList.add('border-red-500');
        const correctBtn = Array.from(btnElems?.children ?? []).find((btn) => {
          return btn.querySelector('p')?.textContent === 'true';
        }) as HTMLElement;
        correctBtn.classList.add('border-lime-400');
      }
    }
    isAnswerClicked.value = true;
  };  

  onMounted(() => {
    emit('startTimer', '.progress-bar');
  });


</script>