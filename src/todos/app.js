import html from "@/todos/app.html?raw";
import todoStore from "@/store/todo.store";
import { renderTodos, renderPending } from "./use-cases";
import { Filters } from "../store/todo.store";

const ElementIds = {
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
  ClearAllTodos: ".clear-completed",
  FiltersAll: ".filtro",
  PendingCountLabel: "#pending-count",
};

/**
 *
 * @param {String} elementId
 */
export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(ElementIds.TodoList, todos);
    updatePendingCount();
  };


  const updatePendingCount = () => {
    renderPending(ElementIds.PendingCountLabel);
    
  }

  // FUNCIÓN AUTOINVOCADA -> addEventListener DOMcontentLoad
  (() => {
    const app = document.createElement("DIV");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  // REFERENCIAS HTML

  const newDescriptionId = document.querySelector(ElementIds.NewTodoInput);
  const todoListUL = document.querySelector(ElementIds.TodoList);
  const clearCompletedTodos = document.querySelector(ElementIds.ClearAllTodos);
  const filtersLIs = document.querySelectorAll(ElementIds.FiltersAll);

  //  LISTENER

  newDescriptionId.addEventListener("keyup", (event) => {
    if (event.keyCode !== 13) return;
    if (event.target.value.trim().length === 0) return;

    todoStore.addTodo(event.target.value);
    displayTodos();

    event.target.value = "";
  });

  todoListUL.addEventListener("click", (event) => {
    const element = event.target.closest("[data-id]");
    todoStore.toggleTodo(element.getAttribute("data-id"));
    displayTodos();
  });

  todoListUL.addEventListener("click", (event) => {
    const isDestroyElement = event.target.className === "destroy";
    const element = event.target.closest("[data-id]");

    if (!element || !isDestroyElement) return;

    todoStore.deleteTodo(element.getAttribute("data-id"));
    displayTodos();
  });

  clearCompletedTodos.addEventListener("click", () => {
    todoStore.deleteCompleted();
    displayTodos();
  });

  filtersLIs.forEach((element) => {
    element.addEventListener("click", (element) => {
      filtersLIs.forEach((el) => {
        el.classList.remove("selected");
      });

      element.target.classList.add("selected");

      switch (element.target.text) {
        case "Todos":
          todoStore.setFilter(Filters.All);
          break;
        case "Pendientes":
          todoStore.setFilter(Filters.Pending);
          break;
        case "Completados":
          todoStore.setFilter(Filters.Completed);
          break;
      }
      displayTodos();
    });
  });
};
