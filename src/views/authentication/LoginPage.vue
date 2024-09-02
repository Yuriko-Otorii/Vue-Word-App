<script setup>
  import { useMutation } from '@vue/apollo-composable';
  import gql from 'graphql-tag';

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

  const login = async (email, password) => {
    try {
      const { data } = await mutate({ email, password });
      console.log("data", data);
    } catch (error) {
      console.error("error", error);
    }
  };

  

  console.log("mutate", mutate);
  

</script>

<template>
  <h1 class="text-2xl">Login Page</h1>
  <button @click="login('test@test.com', 'test')">Login</button>
</template>
