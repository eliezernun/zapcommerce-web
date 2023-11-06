<template>
    <div class="container">
        <div class="centered">
            <v-btn elevation="12" size="large">Large Button</v-btn>
            <v-btn elevation="12" size="large">Large Button</v-btn>
        </div>
        <div class="logout-container">
            <v-btn color="red-lighten-1" elevation="12" size="large">Logout</v-btn>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: 'Sistemas'
}
</script>

<style>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    /* Adjust the height based on your requirements */
}

.centered {
    text-align: center;
}
.centered button {
    margin: 5px;
}
.logout-container{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 20px;
  margin-top: 20px;
}
</style>