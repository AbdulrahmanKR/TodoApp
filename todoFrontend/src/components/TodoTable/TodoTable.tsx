import type { Todo } from "../../types/todo";
import { isOverdue } from "../../utils/DateUtils";
import Button from "../ui/Button/Button";
import "./TodoTable.css";

type PropsType = {
  todos: Todo[];
  onUpdate: (id: number, todo: Todo) => Promise<void>;
  updatingIds: number[];
  onDelete: (id: number) => Promise<void>;
  deletingIds: number[];
};

const TodoTable = ({
  todos,
  onUpdate,
  updatingIds,
  onDelete,
  deletingIds,
}: PropsType) => {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Todo</th>
          <th>Due at</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {todos.length === 0 ? (
          <tr>
            <td></td>
            <td className="no-todos">
              📝 No tasks to show — you’re all caught up!
            </td>
            <td></td>
          </tr>
        ) : (
          todos.map((todo) => (
            <tr key={todo.id} className={isOverdue(todo) ? "overdue" : ""}>
              <td>
                <input
                  type="checkbox"
                  name="isDone"
                  onChange={(e) =>
                    onUpdate(todo.id, {
                      ...todo,
                      isDone: e.currentTarget.checked,
                    })
                  }
                  checked={todo.isDone ? true : false}
                  disabled={updatingIds.includes(todo.id)}
                />
              </td>
              <td className={todo.isDone ? "done" : ""}>{todo.title}</td>
              <td>
                {todo.dueAt ? (
                  new Date(todo.dueAt).toLocaleString()
                ) : (
                  <span>
                    <i style={{ color: "#d4d4d4" }}>No deadline</i>
                  </span>
                )}
              </td>
              <td>
                <Button
                  variant="basic"
                  onClick={() => onDelete(todo.id)}
                  isDisabled={deletingIds.includes(todo.id)}
                >
                  ❌
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default TodoTable;
