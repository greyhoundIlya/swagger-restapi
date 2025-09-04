import "./App.css";
import { todosApi } from "./shared/api/generated";
import { nanoid } from "nanoid";
import { useQueryClient } from "@tanstack/react-query";

function App() {
  const queryClient = useQueryClient();

  const { data: todos } = todosApi.useGetTodosListSuspense();

  const createTodoItem = todosApi.useCreateTodoItem({
    mutation: {
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          todosApi.getGetTodosListQueryOptions()
        );
      },
    },
  });

  const deleteTodoItem = todosApi.useDeleteTodoItem({
    mutation: {
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          todosApi.getGetTodosListQueryOptions()
        );
      },
    },
  });

  const updateTodoItem = todosApi.useUpdateTodoItem({
    mutation: {
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          todosApi.getGetTodosListQueryOptions()
        );
      },
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const text = formData.get("text");

    createTodoItem.mutate({
      data: {
        id: nanoid(),
        completed: false,
        text: text as string,
        createdAt: new Date().toISOString(),
      },
    });

    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input name="text" />
        <button type="submit" disabled={createTodoItem.isPending}>
          Submit
        </button>
      </form>
      <div>
        {todos?.map((todo) => (
          <div key={todo.id}>
            <input type="checkbox" checked={todo.completed}  onChange={() => updateTodoItem.mutate({ todoId: todo.id, data: { completed: !todo.completed } })}/>
            <span>{todo.text}</span>
            <button onClick={() => deleteTodoItem.mutate({ todoId: todo.id })}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
