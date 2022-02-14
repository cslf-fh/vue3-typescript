import { defineStore } from 'pinia';

type filterTime = 'morning' | 'afternoon' | 'night';
type filterType = 'all' | 'finished' | 'unfinished';
type LIST = {
  id: number;
  label: string;
  finished: boolean;
};
type TODO = {
  morning: LIST[];
  afternoon: LIST[];
  night: LIST[];
};

const STORAGE_KEY = 'todos';
const STORAGE = localStorage.getItem(STORAGE_KEY);
import SAMPLE from '@/assets/todos.json';

export const useTodoStore = defineStore({
  id: 'todo',
  state: () => ({
    filterTime: 'morning' as filterTime,
    filterType: 'all' as filterType,
    todos: {} as TODO,
  }),
  getters: {
    getTodos(): TODO {
      if (STORAGE) {
        this.todos = JSON.parse(STORAGE);
      } else {
        this.todos = SAMPLE;
      }
      return this.todos;
    },

    findTodo(state) {
      return (id: number): LIST => {
        const todo = state.todos[state.filterTime].find(
          (todo) => todo.id === id
        );
        if (todo === undefined) throw new Error('todo not found');

        return todo;
      };
    },

    finishedTodos(state) {
      return state.todos[state.filterTime].filter((todo) => todo.finished);
    },

    unfinishedTodos(state) {
      return state.todos[state.filterTime].filter((todo) => !todo.finished);
    },

    filterTodos(state): LIST[] {
      switch (state.filterType) {
        case 'finished':
          return this.finishedTodos;
        case 'unfinished':
          return this.unfinishedTodos;
        default:
          return state.todos[state.filterTime];
      }
    },

    nextId(state): number {
      const todo = [...state.todos[state.filterTime]];
      const rev = todo.reverse();
      return rev[0].id;
    },
  },
  actions: {
    addTodo(label: string) {
      this.todos[this.filterTime].push({
        id: this.nextId + 1,
        label,
        finished: false,
      });
    },

    removeTodo(id: number) {
      const todo = this.findTodo(id);
      const index = this.todos[this.filterTime].indexOf(todo);
      this.todos[this.filterTime].splice(index, 1);
    },

    toggleTodo(id: number) {
      const todo = this.findTodo(id);
      todo.finished = !todo.finished;
    },

    saveTodos() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
    },
  },
});
