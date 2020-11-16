import React, { useContext, useState } from "react";
import "./TaskField.scss";
import { TaskContext } from "../../contexts/TaskContext";
import Todo from "../Todo/Todo.component";

import { BsSearch } from "react-icons/bs";

const TaskField = ({ theme }) => {
  const {
    textInput,
    taskLists,
    handleInput,
    addNewTask,
    deleteTaskFromList,
  } = useContext(TaskContext);
  const [selectDate, setSelectDate] = useState("");

  const [search, setSearch] = useState("");

  const handleDate = (e) => {
    const dateSelect = new Date(e.target.value).getTime();
    setSelectDate(dateSelect);
  };

  const remainingDaysFunc = (datenow) => {
    return Math.ceil(
      ((datenow || Date.now()) - Date.now()) / (1000 * 60 * 60 * 24)
    );
  };
  const remainingDays = remainingDaysFunc(selectDate);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="form__container">
      <div className="wrapper">
        <BsSearch className="search-icon" />
        <input
          type="search"
          name="searchText"
          id="search"
          className="search"
          onChange={handleSearch}
        />
        <div className="left__container" style={{ color: theme.textColor }}>
          <div className="heading-1">
            <h1 style={{ color: theme.textColor }}>
              Please put your task below
            </h1>
            <p>Select deadline, don't mess your mission</p>
          </div>
          <form onSubmit={(e) => addNewTask(e, selectDate)} className="form">
            <input
              className="form__text"
              type="text"
              value={textInput}
              onChange={handleInput}
              required
            />
            <div className="details__container">
              <div className="duedate__container">
                <label htmlFor="dueDate">
                  <h3>DueDate</h3>
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  onChange={handleDate}
                  required
                />
              </div>
              <h3 style={{ color: theme.textColor }}>
                {remainingDays} Day(s) remainings
              </h3>
            </div>

            <button
              type="submit"
              className="button"
              value="Submit"
              style={{ backgroundColor: theme.buttonColor }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className="main todo__container">
        <h1 className="heading__todo" style={{ color: theme.textColor }}>
          TODO
        </h1>
        {taskLists ? (
          taskLists.map((list) => {
            if (
              list.status === "todo" &&
              list.listText.includes(search || "")
            ) {
              return (
                <Todo
                  deleteList={() => deleteTaskFromList(list.id)}
                  inputText={list.listText}
                  key={list.id}
                  id={list.id}
                  dueDate={list.dueDate}
                  remainingDaysFunc={remainingDaysFunc}
                  remainingDays={remainingDays}
                  theme={theme}
                />
              );
            } else {
              return null;
            }
          })
        ) : (
          <h1>Empty</h1>
        )}
      </div>

      <div className="main doing___container">
        <h1 className="heading__todo" style={{ color: theme.textColor }}>
          DOING
        </h1>

        {taskLists ? (
          taskLists.map((list) => {
            if (
              list.status === "doing" &&
              list.listText.includes(search || "")
            ) {
              return (
                <Todo
                  deleteList={() => deleteTaskFromList(list.id)}
                  inputText={list.listText}
                  key={list.id}
                  id={list.id}
                  dueDate={list.dueDate}
                  remainingDaysFunc={remainingDaysFunc}
                  remainingDays={remainingDays}
                  theme={theme}
                />
              );
            } else {
              return null;
            }
          })
        ) : (
          <h1>Empty</h1>
        )}
      </div>

      <div className="main done___container">
        <h1 className="heading__todo" style={{ color: theme.textColor }}>
          DONE
        </h1>
        {taskLists ? (
          taskLists.map((list) => {
            if (
              list.status === "done" &&
              list.listText.includes(search || "")
            ) {
              return (
                <Todo
                  deleteList={() => deleteTaskFromList(list.id)}
                  inputText={list.listText}
                  key={list.id}
                  id={list.id}
                  dueDate={list.dueDate}
                  remainingDaysFunc={remainingDaysFunc}
                  remainingDays={remainingDays}
                  theme={theme}
                />
              );
            } else {
              return null;
            }
          })
        ) : (
          <h1>Empty</h1>
        )}
      </div>
    </div>
  );
};

export default TaskField;
