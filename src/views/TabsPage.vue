<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/wordly/home">
          <ion-icon class="text-3xl" aria-hidden="true" :icon="home" />
        </ion-tab-button>

        <ion-tab-button tab="register" href="/wordly/register">
          <ion-icon class="text-3xl" aria-hidden="true" :icon="addCircle" />
        </ion-tab-button>

        <ion-tab-button tab="memoryTest" href="/wordly/memory-test">
          <ion-icon class="text-3xl" aria-hidden="true" :icon="book" />
        </ion-tab-button>
        
        <ion-tab-button tab="list" href="/wordly/list">
          <ion-icon class="text-3xl" aria-hidden="true" :icon="list" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonTabBar, IonTabButton, IonTabs, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
  import { home, addCircle, book, list } from 'ionicons/icons';
</script>

<style scoped>
  ion-tab-button {
    --color-selected: #C5DF16;
  }
</style>
