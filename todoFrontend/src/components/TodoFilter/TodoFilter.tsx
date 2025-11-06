import React from "react";
import Button from "../ui/Button/Button";
import "./TodoFilter.css";

type PropsType = {
  filter: "all" | "pending" | "done" | "overdue";
  setFilter: React.Dispatch<
    React.SetStateAction<"all" | "pending" | "done" | "overdue">
  >;
};

const TodoFilter = ({ filter, setFilter }: PropsType) => {
  return (
    <div className="todoFilter">
      <Button
        variant={filter === "all" ? "primary" : "secondary"}
        onClick={() => setFilter("all")}
      >
        All
      </Button>
      <Button
        variant={filter === "pending" ? "primary" : "secondary"}
        onClick={() => setFilter("pending")}
      >
        Pending
      </Button>
      <Button
        variant={filter === "done" ? "primary" : "secondary"}
        onClick={() => setFilter("done")}
      >
        Done
      </Button>
      <Button
        variant={filter === "overdue" ? "primary" : "secondary"}
        onClick={() => setFilter("overdue")}
      >
        Overdue
      </Button>
    </div>
  );
};

export default TodoFilter;
