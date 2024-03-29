import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import PopupModal from "./PopupModal";
import { storeEditData } from "../../utils/editDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { storeDeleteData } from "../../utils/deleteDataSlice";
import {
  showHideDeleteTaskModal,
  showHideEditTaskModal,
} from "../../utils/modalSlice";

const TaskCard = (data) => {
  const taskData = data.data;

  const [modalType, setModalType] = useState("edit");
  const dispatch = useDispatch();
  const displayEditModal = useSelector((store) => store?.modal?.editTaskModal);
  const displayDeleteModal = useSelector(
    (store) => store?.modal?.deleteTaskModal
  );

  // On task if user click to edit the task
  const handleEdit = (taskData) => {
    // dispatch event to show edit popup modal
    dispatch(showHideEditTaskModal(true));

    // Modal Type I am setring as edit to pass it as props to PopupModal component
    setModalType("edit");

    // dispatch action to store the data I need to edit
    dispatch(storeEditData(taskData));
  };

  // On task if user click to delete the task
  const handleDelete = (taskData) => {
    // dispatch action to store the data I need to delete
    dispatch(showHideDeleteTaskModal(true));

    // Modal Type I am setring as delete to pass it as props to PopupModal component
    setModalType("delete");

    // dispatch action to store the data I need to delete
    dispatch(storeDeleteData(taskData));
  };

  return (
    <>
      {/* From props only I will be receiving the taskData based on taht all the values I am displaying over the card */}
      <div className="task-card">
        <div className="row g-0">
          <div className="col d-flex justify-content-start align-items-center">
            <p className="m-0 fw-bold">{taskData.task}</p>
          </div>
          <div className="col d-flex justify-content-end align-items-center">
            <button className="btn btn-sm btn-primary">
              {taskData.priority}
            </button>
          </div>
        </div>
        <hr className="mt-2 mb-2" />
        <p className="fw-normal m-0">{taskData.description}</p>
        <div className="row g-0">
          <div className="col d-flex justify-content-start align-items-center">
            <p className="m-0 fw-bold">@{taskData.assignee}</p>
          </div>
          <div className="col d-flex justify-content-end align-items-center mt-3">
            <Dropdown className="task-dropdown ">
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-three-dots-vertical"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                </svg>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    handleEdit(taskData);
                  }}
                >
                  Edit
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    handleDelete(taskData);
                  }}
                >
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <button className="btn btn-sm btn-primary mt-3">
          {taskData.status === "Pending" ? "Assign" : taskData.status}
        </button>
      </div>

      <PopupModal
        type={modalType}
        show={modalType === "edit" ? displayEditModal : displayDeleteModal}
        onHide={() =>
          modalType === "edit"
            ? dispatch(showHideEditTaskModal(false))
            : dispatch(showHideDeleteTaskModal(false))
        }
      />
    </>
  );
};

export default TaskCard;
