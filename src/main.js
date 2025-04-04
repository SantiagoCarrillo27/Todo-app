import '@/style.css';
import { App } from '@/todos/app.js';
import todoStore from "@/store/todo.store";

todoStore.initStore();

App('#app');


