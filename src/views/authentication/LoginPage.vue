<template>
  <ion-content :fullscreen="true" class="ion-padding">
    <h1 class="text-3xl text-[#fff] text-bold absolute top-[15%] left-1/2 transform -translate-x-1/2">Login</h1>
    <div class="w-[500px] h-[500px] rounded-full bg-[#4289A7] absolute top-[-30%] left-1/2 transform -translate-x-1/2 -z-10"></div>

    <form @submit.prevent="handleSubmit">
      <div class="flex flex-col gap-6 w-72 absolute top-[35%] left-1/2 transform -translate-x-1/2">
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
      <button type="submit" class="flex px-20 py-2 rounded-lg absolute bottom-[30%] left-1/2 transform -translate-x-1/2 bg-[#4289A7] text-lg text-white border ">
        Login
      </button>
    </form>

    <div class="w-[330px] h-[330px] rounded-full bg-[#C1EDF3] absolute bottom-[-20%] left-[-20%] -z-10"></div>
    <div class="w-[500px] h-[500px] rounded-full bg-[#4289A7] absolute bottom-[-30%] right-[-50%] -z-9"></div>
    

  </ion-content>
</template>

<script setup>
  import { ref } from 'vue';
  import { useMutation } from '@vue/apollo-composable';
  import gql from 'graphql-tag';

  const emailInput = ref('');
  const passwordInput = ref('');

  const { mutate } = useMutation(gql`
    mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user {
          id
          username
          email
        }
      }
    }
  `);

  const handleSubmit = async () => {    
    try {
      const { data } = await mutate({ email: emailInput.value, password: passwordInput.value });
      localStorage.setItem('token', data.login.token);
      localStorage.setItem('user', JSON.stringify(data.login.user));
    } catch (error) {
      console.error("error", error);
    }
  };
  

</script>
