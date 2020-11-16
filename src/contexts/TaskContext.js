import React, { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [textInput, setTextInput] = useState("");

  const [taskLists, setTaskLists] = useState([]);



  const handleInput = e => {
    setTextInput(e.target.value);
  };

 

  const addNewTask =(e, duedate) => {
    e.preventDefault();
    setTaskLists([
      {
        listText: textInput,
        id: taskLists.length ? taskLists[0].id + 1 : 0,
        dueDate: duedate,
        status: 'todo',
      },
      ...taskLists,
    ]);

    setTextInput("");
  };

  const updateTask = (uid, newValue) => {
    const list = [...taskLists];
    let newItem = list.map(i =>
      i.id === uid ? { ...newValue, dueDate: i.dueDate, status: i.status } : i
    );

    setTaskLists([...newItem]);
  };

  const deleteTaskFromList = uid => {
    const list = [...taskLists];
    const updateList = list.filter(list => list.id !== uid);

    setTaskLists([...updateList]);
  };

  
  const updateStatus= (uid, newValue) => {
    const list = [...taskLists];
    const newItem = list.map(i =>
      i.id === uid ? { ...i, status: newValue } : i
    );

    setTaskLists([...newItem]);
  };

  const updateDueDate = (uid, newValue) => {
    const list = [...taskLists];
    const newItem = list.map(i =>
      i.id === uid ? { ...i, dueDate: newValue } : i
      );

    setTaskLists([...newItem]);
  };

  return (
    <TaskContext.Provider
      value={{
        textInput,
        taskLists,
        handleInput,
        addNewTask,
        deleteTaskFromList,
        updateTask,
        updateStatus,
        updateDueDate
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
