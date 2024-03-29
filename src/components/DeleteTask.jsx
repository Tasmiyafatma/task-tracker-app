import { useDispatch, useSelector } from "react-redux";
import { showHideDeleteTaskModal } from "../../utils/modalSlice";
import { storeDeleteData } from "../../utils/deleteDataSlice";
import { updateCompletedData, updateDefferedData, updateDeployedData, updateInProgressData, updateMainData, updatePendingData } from "../../utils/dataStoreSlice";

const DeleteTask = () => {
  /*
    from redux store fetching the main data and the data we need to delete 
  */
  const deleteData = useSelector((store) => store?.deleteData?.data);
  const mainData = useSelector((store) => store?.dataStore?.mainData);
  const dispatch = useDispatch();

  const handleClickNo = () => {
    dispatch(showHideDeleteTaskModal(false));
    dispatch(storeDeleteData(null));
  };

  const handleClickYes = () => {
    console.log(mainData);
    console.log(deleteData);

    const finalData = mainData.filter((item) => {
      if (item.id === deleteData.id && item.status !== 'Completed') {
        // If the IDs match, filter out this item (i.e., don't include it in finalData)
        return false;
      }
      // If the IDs don't match, keep the item
      return true;
    });

    // After teh deletion from final data I am filtering again and storing to specific array;
    const pendingData = finalData.filter((item) => item.status === "Pending");
    const inProgressData = finalData.filter((item) => item.status === "In Progress");
    const completedData = finalData.filter((item) => item.status === "Completed");
    const deployedData = finalData.filter((item) => item.status === "Deployed");
    const defferedData = finalData.filter((item) => item.status === "Deffered");
    
    // dispatcing all teh updated data to redux store
    dispatch(updateMainData(finalData));
    dispatch(updatePendingData(pendingData));
    dispatch(updateInProgressData(inProgressData));
    dispatch(updateCompletedData(completedData));
    dispatch(updateDeployedData(deployedData));
    dispatch(updateDefferedData(defferedData));
    dispatch(showHideDeleteTaskModal(false));
  };
  return (
    <>
      <div className="conatiner">
        <p className="fw-bold">Do You Wish to Delete Task</p>
        <div className="row g-0">
          <div className="col">
            <p className="fw-normal">{deleteData.task}</p>
          </div>
          <div className="col d-flex justify-content-end align-items-center gap-2">
            <button className="btn btn-primary" onClick={handleClickYes}>
              Yes
            </button>
            <button className="btn btn-primary" onClick={handleClickNo}>
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteTask;
