import "./App.css";
// import { data } from "../utils/dummyData";
import TaskCard from "./components/TaskCard";
import Header from "./components/Header";
import PopupModal from "./components/PopupModal";
import { useDispatch, useSelector } from "react-redux";
import { showHideNewTaskModal } from "../utils/modalSlice";
import ToolBar from "./components/ToolBar";

function App() {
  /*  
      dispatch is used for sending action to redux store
      action will be forwarded to reducers 
      and inside reducer we will handle our data
  */
  const dispatch = useDispatch();

  /*
    For task tracker I have created five different arrays 
    after fetching the data from redux store I am filtering the data based on status 
  */
  const pendingData = useSelector((store) => store?.dataStore?.pengingData);
  const inProgressData = useSelector(
    (store) => store?.dataStore?.inProgressData
  );
  const completedData = useSelector((store) => store?.dataStore?.completedData);
  const deployedData = useSelector((store) => store?.dataStore?.deployedData);
  const defferedData = useSelector((store) => store?.dataStore?.defferedData);

  /* 
    This is to show new task popup modak using redux store 
    Here I ma getting modal value as a booleana from redux store 
  */
  const displayModal = useSelector((store) => store?.modal?.newTaskModal);

  return (
    // Main conatiner of our applicatio
    <div className="main-app">
      {/* Header rendering froma different compoent */}
      <Header />
      <div className="task-tracker-content">
        {/* Header Code */}
        <ToolBar />
        {/* Task card container placed here 5 different task card container based on status */}
        <div className="row g-0 mt-3 p-3">
          <div className="col me-2">
            <div className="task-container-card">
              <div className="header bg-secondary">
                <p>Pending</p>
              </div>
              <div className="task-container-area">
                {/* Conditional redering the task card from a separate compoent based on the pedning data array */}
                {pendingData &&
                  pendingData.map((data) => (
                    <TaskCard data={data} key={data.id} />
                  ))}
              </div>
            </div>
          </div>
          <div className="col me-2">
            <div className="task-container-card">
              <div className="header bg-warning">
                <p>In Progress</p>
              </div>
              <div className="task-container-area">
                {/* Conditional redering the task card from a separate compoent based on the in progress data array */}
                {inProgressData &&
                  inProgressData.map((data) => (
                    <TaskCard data={data} key={data.id} />
                  ))}
              </div>
            </div>
          </div>
          <div className="col me-2">
            <div className="task-container-card">
              <div className="header bg-success">
                <p>Completed</p>
              </div>
              <div className="task-container-area">
                {/* Conditional redering the task card from a separate compoent based on the completed data array */}
                {completedData &&
                  completedData.map((data) => (
                    <TaskCard data={data} key={data.id} />
                  ))}
              </div>
            </div>
          </div>
          <div className="col me-2">
            <div className="task-container-card">
              <div className="header bg-info">
                <p>Deployed</p>
              </div>
              <div className="task-container-area">
                {/* Conditional redering the task card from a separate compoent based on the deployed data array */}
                {deployedData &&
                  deployedData.map((data) => (
                    <TaskCard data={data} key={data.id} />
                  ))}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="task-container-card">
              <div className="header bg-danger">
                <p>Deffered</p>
              </div>
              <div className="task-container-area">
                {/* Conditional redering the task card from a separate compoent based on the deffered data array */}
                {defferedData &&
                  defferedData.map((data) => (
                    <TaskCard data={data} key={data.id} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* New task popup modal to be populated on click on add  Add New Task which is triggeed from ToolBar component */}
      <PopupModal
        type={"newTask"}
        show={displayModal}
        onHide={() => dispatch(showHideNewTaskModal(false))}
      />
    </div>
  );
}

export default App;
