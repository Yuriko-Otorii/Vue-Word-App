<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/wordly/home">
          <ion-icon aria-hidden="true" :icon="home" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="register" href="/wordly/register">
          <ion-icon aria-hidden="true" :icon="addCircle" />
          <ion-label>register</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="memoryTest" href="/wordly/memory-test">
          <ion-icon aria-hidden="true" :icon="book" />
          <ion-label>Test</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
  import { home, addCircle, book } from 'ionicons/icons';
</script>

<style scoped>
  ion-tab-button {
    --color-selected: #C5DF16;
  }
</style>
