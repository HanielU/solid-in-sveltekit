/* eslint-disable solid/event-handlers */
/*  eslint-disable solid/reactivity */
import { type Component, createSignal, For } from "solid-js";
import {
  ActionBtnStyle,
  AppCard,
  AppStyle,
  BtnStyle,
  FormStyle,
  InputStyle,
  ListWrapperStyle,
  TodoItemStyle,
} from "./App.css";

type Todo = {
  id: string;
  text: string;
  editing: boolean;
  done: boolean;
};
import type { Writable } from "svelte/store";

const [todos, setTodos] = createSignal<Todo[]>([]);

const App: Component<{ text?: Writable<string> }> = props => {
  const { text } = props;
  const [todoText, setTodoText] = createSignal("Hello World");

  text?.subscribe(v => setTodoText(v));

  function addTodo(e: Event) {
    e.preventDefault();
    if (!todoText().trim()) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: todoText(),
      editing: false,
      done: false,
    };

    setTodos([...todos(), newTodo]);
    if (props.text) {
      props.text.set("");
    } else {
      setTodoText("");
    }
  }

  return (
    <div class={AppStyle}>
      {/* Todo Card */}
      <div class={AppCard}>
        <form class={FormStyle} onSubmit={addTodo}>
          <input
            class={InputStyle}
            value={todoText()}
            onInput={e => text?.set((e.target as HTMLInputElement).value)}
            type="text"
          />
          <button class={BtnStyle}>Add</button>
        </form>

        {/* Todos list */}
        <ul class={ListWrapperStyle}>
          <For each={todos()}>{todo => <TodoItem todo={todo} />}</For>
        </ul>
      </div>
    </div>
  );
};

const TodoItem: Component<{ todo: Todo }> = props => {
  const { todo } = props;

  const [editText, setEditText] = createSignal(todo.text);

  const deleteTodo = () => setTodos(prevTodo => prevTodo.filter(t => t.id !== todo.id));

  const editTodo = () =>
    setTodos(prevTodo => prevTodo.map(t => ({ ...t, editing: t.id === todo.id && !t.editing })));

  const saveEdit = (e: Event) => {
    e.preventDefault();
    setTodos(prevTodo =>
      prevTodo.map(t => ({
        ...t,
        editing: false,
        text: t.id == todo.id ? editText() : t.text,
      }))
    );
  };

  const markTodo = () =>
    setTodos(prevTodo =>
      prevTodo.map(t => ({
        ...t,
        editing: false,
        done: t.id == todo.id ? !todo.done : t.done,
      }))
    );

  return (
    <li class={TodoItemStyle}>
      {todo.editing ? (
        <form onSubmit={saveEdit}>
          <input
            class="bg-inherit p-4"
            value={editText()}
            onChange={e => setEditText((e.target as HTMLInputElement).value)}
            type="text"
          />
        </form>
      ) : (
        <p
          class="break-words p-4 transition-opacity-5000 w-full"
          classList={{ "line-through opacity-50": todo.done }}
          onDblClick={editTodo}
        >
          {todo.text}
        </p>
      )}

      {/* iconlist */}
      <div class="flex ml-auto px-2.5">
        <div class={ActionBtnStyle} onClick={todo.editing ? saveEdit : editTodo}>
          <div class="i-iconoir-edit" />
        </div>
        <div class={ActionBtnStyle} onClick={deleteTodo}>
          <div class="i-iconoir-cancel" />
        </div>
        <div class={ActionBtnStyle} onClick={markTodo}>
          <div class="i-iconoir-check" />
        </div>
      </div>
    </li>
  );
};

export default App;
