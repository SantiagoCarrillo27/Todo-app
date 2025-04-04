import { Todo } from "@/todos/models/todo.models";

/**
 *
 * @param {Todo} todo
 */
export const createTodoHTML = (todo) => {
  if (!todo) throw new Error("A TODO is Object required");

  const {done, description, id } = todo;


  const html = `
                <div class="view">
                    <input class="toggle" type="checkbox" ${done ? 'checked': ''}>
                    <label>${description}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
            `;
  const liElement = document.createElement("LI");
  liElement.setAttribute("data-id", id);
  if (done) liElement.classList.add("completed");

  liElement.innerHTML = html;
  return liElement;
};
