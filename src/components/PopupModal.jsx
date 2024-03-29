/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import AddTaskForm from "./AddTaskForm";
import EditTaskForm from "./EditTaskForm";
import DeleteTask from "./DeleteTask";

const PopupModal = (props) => {

  /*
    based on this props type I am deciding in side the modal which component to render
    three different modal is there new task, edit task, and delete task modal
  */  
  const { type } = props;

  // To set the modal title based on modal type this title variable is used
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (type === "newTask") {
      setTitle("Create a task");
    } else if (type === "edit") {
      setTitle("Edit task");
    } else if (type === "delete") {
      setTitle("Delete task");
    }
  }, []);

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ textTransform: "uppercase" }}
          >
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {type === "newTask" && (
            <>
              <AddTaskForm />
            </>
          )}

          {type === "edit" && (
            <>
              <EditTaskForm />
            </>
          )}

          {type === "delete" && (
            <>
              <DeleteTask />
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PopupModal;
