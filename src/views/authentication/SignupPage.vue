<template>
  <ion-content :fullscreen="true" class="ion-padding">
    <h1 class="text-3xl text-[#fff] text-bold absolute top-[15%] left-1/2 transform -translate-x-1/2">Sign up</h1>
    <div class="w-[500px] h-[500px] rounded-full bg-[#4289A7] absolute top-[-33%] left-1/2 transform -translate-x-1/2 -z-10"></div>

    <form @submit.prevent="handleSubmit">
      <div class="flex flex-col gap-4 w-72 absolute top-[32%] left-1/2 transform -translate-x-1/2">
        <div class="relative h-11 w-full min-w-[200px] mb-8">
          <input
            type="text"
            v-model="usernameInput"
            placeholder="Username"
            class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
          <label
            class="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Username
          </label>
        </div>
        <div class="relative h-11 w-full min-w-[200px] mb-8">
          <input
            type="email"
            v-model="emailInput"
            placeholder="Email"
            class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
          <label
            class="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Email
          </label>
        </div>
        <div class="relative h-11 w-full min-w-[200px]">
          <input
            type="password"
            v-model="passwordInput"
            placeholder="Password"
            class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
          <label
            class="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Password
          </label>
        </div>
      </div>
      <button type="submit" class="flex justify-center w-[250px] px-20 py-2 rounded-lg absolute bottom-[30%] left-1/2 transform -translate-x-1/2 bg-[#4289A7] text-lg text-white border ">
        Sign up
        <ion-spinner v-if="loading" name="crescent" class="ml-5 text-white"></ion-spinner>
      </button>
    </form>

    <div class="w-[330px] h-[330px] rounded-full bg-[#C1EDF3] absolute bottom-[-22%] right-[-20%] -z-10"></div>
    <div class="w-[500px] h-[500px] rounded-full bg-[#4289A7] absolute bottom-[-32%] left-[-50%] -z-9"></div>
    

  </ion-content>
</template>

<script setup>
  import { IonContent, IonSpinner } from '@ionic/vue';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useMutation } from '@vue/apollo-composable';
  import { signupMutation } from '@/graphql/mutation/signup';

  const router = useRouter();
  const usernameInput = ref('');
  const emailInput = ref('');
  const passwordInput = ref('');

  const { mutate, loading } = useMutation(signupMutation);

  const handleSubmit = async () => {    
    try {
      const { data } = await mutate({ username:usernameInput.value,  email: emailInput.value, password: passwordInput.value });
      console.log(data);
      
      router.push('/login');
    } catch (error) {
      console.error("error", error);
    }
  };
</script>
