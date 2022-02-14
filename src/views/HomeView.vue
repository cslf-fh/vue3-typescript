<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useTodoStore } from '@/stores/todos';

const label = ref<string>('');
const time = ref<string[]>(['morning', 'afternoon', 'night']);
const type = ref<string[]>(['all', 'finished', 'unfinished']);
const store = useTodoStore();
const { filterTime, filterType, filterTodos } = storeToRefs(store);

const addTodo = () => {
  store.addTodo(label.value);
  label.value = '';
};
</script>

<template>
  <p>Foo's Todo Lists for {{ filterTime }}</p>
  <div class="form">
    <div>
      <input v-model="label" type="text" />
      <button @click="addTodo">add</button>
      <button @click="store.saveTodos">save</button>
    </div>
    <div class="select">
      <div v-for="(i, key) in type" :key="key">
        <input :id="i" v-model="filterType" type="radio" :value="i" />
        <label :for="i">{{ i }}</label>
      </div>
      <select v-model="filterTime">
        <option v-for="(i, key) in time" :key="key">
          {{ i }}
        </option>
      </select>
    </div>
  </div>
  <div>
    <ul>
      <li v-for="(i, index, key) in filterTodos" :key="key" class="todo">
        <div @click="store.toggleTodo(i.id)">
          <span>{{ index }} : </span>
          <span>{{ i.id }} : </span>
          <span>{{ i.label }} : </span>
          <span>{{ i.finished }}</span>
        </div>
        <button @click="store.removeTodo(i.id)">delete</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.form,
.select,
.todo {
  display: flex;
  justify-content: space-between;
}
</style>
