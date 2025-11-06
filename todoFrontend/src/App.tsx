import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/ui/Header/Header";
import type { Todo } from "./types/todo";
import TodoService from "./services/todoService";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoTable from "./components/TodoTable/TodoTable";
import TodoFilter from "./components/TodoFilter/TodoFilter";
import Loading from "./components/ui/Loading/Loading";
import { isOverdue } from "./utils/DateUtils";
import ErrorMessage from "./components/ui/ErrorMessage/ErrorMessage";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [isFetching, setIsFetching] = useState<boolean>(false);

  const [isAdding, setIsAdding] = useState<boolean>(false);

  const [updatingIds, setUpdatingIds] = useState<number[]>([]);

  const [deletingIds, setDeletingIds] = useState<number[]>([]);

  // to handle network error
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState<"all" | "pending" | "done" | "overdue">(
    "all"
  );

  useEffect(() => {
    const fetchTodos = async () => {
      setIsFetching(true);
      setError(null);
      try {
        const response = await TodoService.getAll();
        setTodos(response);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message + " :Failed to fetch todos");
        } else {
          setError("Failed to fetch todos");
        }
      } finally {
        setIsFetching(false);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTask = async (todo: Omit<Todo, "id">) => {
    setIsAdding(true);
    setError(null);
    try {
      const response = await TodoService.create(todo);
      setTodos((prev) => [...prev, response]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message + ": Failed to add todo");
      } else if (axios.isAxiosError(err)) {
        const backendMessage = err.response?.data?.error;
        setError(backendMessage ? backendMessage : "Failed to add todo");
      } else {
        setError("Failed to add todo");
      }
    } finally {
      setIsAdding(false);
    }
  };

  const handleUpdate = async (id: number, todo: Todo) => {
    setUpdatingIds((prev) => [...prev, id]);
    setError(null);
    try {
      await TodoService.update(id, todo);
      setTodos((prev) => prev.map((t) => (t.id === id ? todo : t)));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message + ": Failed to update todo");
      } else {
        setError("Failed to update todo");
      }
    } finally {
      setUpdatingIds((prev) => prev.filter((tId) => tId !== id));
    }
  };

  const handleDelete = async (id: number) => {
    setDeletingIds((prev) => [...prev, id]);
    setError(null);
    try {
      await TodoService.delete(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message + ": Failed to delete todo");
      } else {
        setError("Failed to delete todo");
      }
    } finally {
      setDeletingIds((prev) => prev.filter((tid) => tid !== id));
    }
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "pending":
        return !todo.isDone;
      case "done":
        return todo.isDone;
      case "overdue":
        return isOverdue(todo);
      default:
        return true;
    }
  });

  return (
    <div className="App container">
      <Header title="Todo App" />
      <TodoForm
        setTodos={setTodos}
        onCreate={handleAddTask}
        isAdding={isAdding}
      />
      <TodoFilter filter={filter} setFilter={setFilter} />
      {isFetching ? (
        <Loading />
      ) : (
        <>
          {error && <ErrorMessage message={error} />}
          <TodoTable
            todos={filteredTodos}
            onUpdate={handleUpdate}
            updatingIds={updatingIds}
            onDelete={handleDelete}
            deletingIds={deletingIds}
          />
        </>
      )}
    </div>
  );
};

export default App;
