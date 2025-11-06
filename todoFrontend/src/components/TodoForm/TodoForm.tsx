import "./TodoForm.css";
import Button from "../ui/Button/Button";
import React, { useRef, useState } from "react";
import type { Todo } from "../../types/todo";

type PropsType = {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  onCreate: (todo: Omit<Todo, "id">) => Promise<void>;
  isAdding: boolean;
};

const TodoForm = ({ onCreate, isAdding }: PropsType) => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [isValidTitle, setIsValidTitle] = useState<boolean>(true);

  const dueDateInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<Element>) => {
    e.preventDefault();
    const todoTitle = titleInputRef.current?.value;
    const dueDate = dueDateInputRef.current?.value;

    if (todoTitle && todoTitle.length > 10) {
      setIsValidTitle(true);

      const newTodo: Omit<Todo, "id"> = {
        title: todoTitle,
        isDone: false,
        dueAt: dueDate ? new Date(dueDate).toISOString() : null,
      };

      onCreate(newTodo);

      titleInputRef.current!.value = "";
      dueDateInputRef.current!.value = "";
    } else {
      setIsValidTitle(false);
    }
  };

  return (
    <form className="todoForm" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="todo">Todo*</label>
        <input
          type="text"
          name="todo"
          id="todo"
          ref={titleInputRef}
          placeholder="What needs to be done"
        />
        {!isValidTitle && (
          <div className="errorMessage">
            Task must be longer than 10 characters
          </div>
        )}
      </div>
      <div>
        <label htmlFor="date">Due date</label>
        <input
          type="datetime-local"
          name="date"
          id="date"
          ref={dueDateInputRef}
        />
      </div>
      <div>
        <Button variant="primary" isDisabled={isAdding}>
          {isAdding ? "Adding..." : "+ Add Task"}
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;
