import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./Componets/InputTodo";
import { InCompleteTodos } from "./Componets/InCompleteTodos";
import { CompleteTodos } from "./Componets/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState([""]);
  const [incompleteTodos, setIncompleteTodos] = useState([""]);
  const [completeTodos, setCompleteTodos] = useState([""]);
  const onChangeTodotext = (event) => setTodoText(event.target.value);
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    setIncompleteTodos(newIncompleteTodos);
    const newCompletetodos = [...completeTodos, incompleteTodos[index]];
    setCompleteTodos(newCompletetodos);
  };
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    setCompleteTodos(newCompleteTodos);
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodotext}
        onClick={onClickAdd}
        disabled={incompleteTodos.length > 4}
      />
      {incompleteTodos.length > 4 && (
        <p style={{ color: "red" }}>登録できるTODOは5個までです。</p>
      )}
      <InCompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
