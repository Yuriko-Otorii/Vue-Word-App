<template>
  <ion-page>
    <ion-header class="shadow-sm">
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <HomeMemoryCard v-for="(card, index) in memoryCard" :key="index" :cardItem="card" :loading="loading" @handleLoadidng="handleLoadidng" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, onIonViewWillEnter } from '@ionic/vue';
  import HomeMemoryCard from '@/components/HomeMemoryCard.vue';
  import axios from 'axios';
  // import { getMemoryCardQuery } from '@/graphql/query/getMemoryCard';

  import { ref, onMounted } from 'vue';
  // import { useQuery } from '@vue/apollo-composable';

  const memoryCard = ref([]);
  const loading = ref(false);


  // const { result, loading } = useQuery(getMemoryCardQuery);

  // setTimeout(() => {
  //   console.log(result.value);
  // }, 5000);
  // onMounted(() => {    
  //   if (!loading.value && result.value) {
  //     console.log(result.value);
  //     memoryCard.value = result.value;
  //   }
  // });

  const handleLoadidng = () => {
    loading.value = true;
  }

  onMounted(async () => {
    try {
      const response = await axios.get('http://localhost:5000/words');
      memoryCard.value = response.data;      
    } catch (error) {
      console.log(error); 
    }
  });

  onIonViewWillEnter(() => {
    loading.value = false;
  });

</script>
