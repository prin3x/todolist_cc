import React, { useContext, useState, useEffect } from "react";
import { TaskContext } from "../../contexts/TaskContext";
import './Todo.style.scss'
import {  ImPencil, ImCheckmark } from "react-icons/im";

const Todo = ({id, inputText, theme, dueDate,remainingDaysFunc }) => {
  const { updateTask, deleteTaskFromList,updateStatus } = useContext(TaskContext);

  const [editing, setEditing] = useState(false);

  const [input, setInput] = useState(inputText);

  const [selfRemaingingDays, setSelfRemaingingDays] = useState(remainingDaysFunc(dueDate));


  const updateText = () => {
    setEditing(true);
  };

  const handleUpdate = e => {
    setInput(e.target.value);
  };

  const handleSubmit = (uid, value) => {
    let update = { listText: value, id: uid };
    updateTask(uid, update);
    setEditing(false);
  };

  const handleStatus = (status) => {
    let newStatus  =  document.querySelector(`#${status}`).dataset.status

    updateStatus(id, newStatus)
  }


//! use setDate inside useEffect doesn't work why?
  useEffect(()=>{
    let dayChange = setInterval(() => {
      let updateDate = remainingDaysFunc(dueDate)
      setSelfRemaingingDays(updateDate)

      
    },1000 * 60 * 60 * 12 )


    return () => clearInterval(dayChange)
  },[selfRemaingingDays,dueDate,remainingDaysFunc])


  return (
    inputText ? (
    <div className='card todo__card'>
        <div
          className='todo__container'
          
          style={!selfRemaingingDays ? {backgroundColor: '#ed6663'} : {
            backgroundColor: theme.listColor,
            color: theme.textColor,
          } }
        >
          {editing ? (
            <input
              className='form__text'
              type='text'
              value={input}
              onChange={handleUpdate}
              style={{
                backgroundColor: theme.listColor,
                color: theme.textColor,
              }}
            />
          ) : (
            inputText
          )}

          
          {editing ? (
            <ImCheckmark
              onClick={() => handleSubmit(id, input)}
              className='icon submit-icon'
            />
          ) : (   <ImPencil
            className='icon update-icon'
            onClick={() => updateText(id)}
          /> ) }

       
        </div>
        <div className="utilities__container"  style={{
          backgroundColor: theme.subColor,
        }}>
        <div className="remainingdays__container"   >
        {selfRemaingingDays}<span>days</span>

        </div>
        </div>

        <div className='status__container'>
            <div className="status__changable">
            <div className="change_status__container change_status-todo" id='todo' data-status='todo'  onClick={()=>handleStatus('todo')}>
            TODO
            </div>
            <div className="change_status__container change_status-doing "  id='doing' data-status='doing' onClick={()=>handleStatus('doing')}>
            DOING
            </div>
            <div className="change_status__container change_status-done" id='done' data-status='done' onClick={()=>handleStatus('done')}>
            DONE
            </div>
            
            </div>


        <div className="change_status__container change_status-delete" id='done' data-status='done' onClick={() => deleteTaskFromList(id)}>
        DELETE
        </div>
        </div>
        

      </div>) : <h1>Empty</h1>
  )
}

export default Todo