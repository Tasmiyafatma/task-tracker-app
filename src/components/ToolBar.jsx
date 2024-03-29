import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { showHideNewTaskModal } from "../../utils/modalSlice";
import {
  updateCompletedData,
  updateDefferedData,
  updateDeployedData,
  updateInProgressData,
  updateMainData,
  updatePendingData,
} from "../../utils/dataStoreSlice";

const ToolBar = () => {
  // getting the main data from redux store to perform our actions
  const mainData = useSelector((store) => store?.dataStore?.mainData);
  const dispatch = useDispatch();

  // sort the data based on priority
  const handlePriorityChange = (eventKey) => {
    const sortedData = sortByPriority(mainData.slice(), eventKey); // Avoid modifying original data

    // after the data is sorted filtering the data for respective arrays
    const pendingData = sortedData.filter((item) => item.status === "Pending");
    const inProgressData = sortedData.filter(
      (item) => item.status === "In Progress"
    );
    const completedData = sortedData.filter(
      (item) => item.status === "Completed"
    );
    const deployedData = sortedData.filter(
      (item) => item.status === "Deployed"
    );
    const defferedData = sortedData.filter(
      (item) => item.status === "Deffered"
    );

    // dispatching actions to update respective arrays data
    dispatch(updateMainData(sortedData));
    dispatch(updatePendingData(pendingData));
    dispatch(updateInProgressData(inProgressData));
    dispatch(updateCompletedData(completedData));
    dispatch(updateDeployedData(deployedData));
    dispatch(updateDefferedData(defferedData));
  };

  function sortByPriority(data, selectedPriority) {
    return data.sort((a, b) => {
      const priorityA = a.priority || "";
      const priorityB = b.priority || "";

      if (priorityA === selectedPriority) {
        return -1;
      } else if (priorityB === selectedPriority) {
        return 1;
      } else {
        return priorityA.localeCompare(priorityB);
      }
    });
  }

  // Applying the assignee name filter
  const handleAssigneeNameChange = (event) => {
    const filteredData = mainData.filter((item) => {
      const assigneeLowerCase = item.assignee.toLowerCase();
      const searchValueLowerCase = event.target.value.toLowerCase();
      return assigneeLowerCase.includes(searchValueLowerCase);
    });

    // after the data is sorted filtering the data for respective arrays
    const pendingData = filteredData.filter(
      (item) => item.status === "Pending"
    );
    const inProgressData = filteredData.filter(
      (item) => item.status === "In Progress"
    );
    const completedData = filteredData.filter(
      (item) => item.status === "Completed"
    );
    const deployedData = filteredData.filter(
      (item) => item.status === "Deployed"
    );
    const defferedData = filteredData.filter(
      (item) => item.status === "Deffered"
    );

    // dispatching actions to update respective arrays data
    dispatch(updatePendingData(pendingData));
    dispatch(updateInProgressData(inProgressData));
    dispatch(updateCompletedData(completedData));
    dispatch(updateDeployedData(deployedData));
    dispatch(updateDefferedData(defferedData));
  };

  // Applying the assignee name filter
  const handlePriprityFilterChange = (eventKey) => {
    const filteredData = mainData.filter((item) => item.priority === eventKey);

    // after the data is sorted filtering the data for respective arrays
    const pendingData = filteredData.filter(
      (item) => item.status === "Pending"
    );
    const inProgressData = filteredData.filter(
      (item) => item.status === "In Progress"
    );
    const completedData = filteredData.filter(
      (item) => item.status === "Completed"
    );
    const deployedData = filteredData.filter(
      (item) => item.status === "Deployed"
    );
    const defferedData = filteredData.filter(
      (item) => item.status === "Deffered"
    );

    // dispatching actions to update respective arrays data
    dispatch(updatePendingData(pendingData));
    dispatch(updateInProgressData(inProgressData));
    dispatch(updateCompletedData(completedData));
    dispatch(updateDeployedData(deployedData));
    dispatch(updateDefferedData(defferedData));
  };

  return (
    <>
      <div className="row g-0">
        <div className="col-10 p-3 d-flex justify-content-start align-items-center gap-2">
          <label className="fw-semibold">Filter By:</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Assignee Name"
              aria-label="assigneeName"
              aria-describedby="basic-addon1"
              onChange={handleAssigneeNameChange}
            />
          </div>
          <Dropdown onSelect={handlePriprityFilterChange}>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              Priority
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey={"P0"}>P0</Dropdown.Item>
              <Dropdown.Item eventKey={"P1"}>P1</Dropdown.Item>
              <Dropdown.Item eventKey={"P2"}>P2</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="input-group">
            <input
              type="date"
              className="form-control"
              aria-label="startDate"
              aria-describedby="basic-addon1"
            />
          </div>
          <p className="m-0">-</p>
          <div className="input-group">
            <input
              type="date"
              className="form-control"
              aria-label="endDate"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div className="col-2 p-3 d-flex justify-content-end align-items-center">
          <button
            className="btn btn-primary"
            onClick={() => dispatch(showHideNewTaskModal(true))}
          >
            Add New Task
          </button>
        </div>
      </div>
      <div className="col p-3 gap-3 d-flex justify-content-start align-items-center">
        <label className="fw-semibold">Sort By:</label>
        <Dropdown onSelect={handlePriorityChange}>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            Priority
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey={"P0"}>P0</Dropdown.Item>
            <Dropdown.Item eventKey={"P1"}>P1</Dropdown.Item>
            <Dropdown.Item eventKey={"P2"}>P2</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
};

export default ToolBar;
