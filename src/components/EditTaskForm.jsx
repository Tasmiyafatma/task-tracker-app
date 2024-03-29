import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showHideEditTaskModal } from "../../utils/modalSlice";
import { updateCompletedData, updateDefferedData, updateDeployedData, updateInProgressData, updateMainData, updatePendingData } from "../../utils/dataStoreSlice";

const EditTaskForm = () => {

  const dispatch = useDispatch();

  // Fetching edit data from redux store to populate it to the dit form 
  // Fetching the main data from redux store to update the data based on the user input
  const formData = useSelector((store) => store?.editData?.data);
  const mainData = useSelector((store) => store?.dataStore?.mainData);

  // for handling form data I have used useFor from 'react-hook-form';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    
    // to load the form data into form I am caling this inside useefect() 
    if (formData) {
      setValue("task", formData.task);
      setValue("description", formData.description);
      setValue("team", formData.team);
      setValue("assignee", formData.assignee);
      setValue("priority", formData.priority);
      setValue("status", formData.status);
    //   setValue("priority", "");
    //   setValue("status", "");
    }
  }, [formData, setValue]);

  // On form submit this function is going to call
  const onSubmit = (data) => {
    const { id } = formData;
    const copiedMainData = mainData.map(item => {
        if (item.id === id) {
          return {
            ...item,
            priority: data.priority,
            status: data.status
          };
        }
        return item; // Return the original item if it doesn't match the id
      });
      

    //  based on the user updation I am filtering the data out then storing it to respective arrays;
    const pendingData = copiedMainData.filter((item) => item.status === "Pending");
    const inProgressData = copiedMainData.filter((item) => item.status === "In Progress");
    const completedData = copiedMainData.filter((item) => item.status === "Completed");
    const deployedData = copiedMainData.filter((item) => item.status === "Deployed");
    const defferedData = copiedMainData.filter((item) => item.status === "Deffered");
    
    // Dispatching the action to redux store to update the new edited data to respective arrays
    dispatch(updateMainData(copiedMainData));
    dispatch(updatePendingData(pendingData));
    dispatch(updateInProgressData(inProgressData));
    dispatch(updateCompletedData(completedData));
    dispatch(updateDeployedData(deployedData));
    dispatch(updateDefferedData(defferedData));
    dispatch(showHideEditTaskModal(false));
  };

  // handle reset button, reset the from to default values,
  const handleResetField = () => {
    reset({
      priority: "",
      status: "",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="task" className="col-form-label">
            Task
          </label>
          <input
            type="text"
            className="form-control"
            id="task"
            {...register("task", { disabled: true })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="col-form-label">
            Description
          </label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            {...register("description", { disabled: true })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="team" className="col-form-label">
            Team
          </label>
          <input
            type="text"
            className="form-control"
            id="team"
            {...register("team", { disabled: true })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="assignee" className="col-form-label">
            Assignee
          </label>
          <input
            type="text"
            className="form-control"
            id="assignee"
            {...register("assignee", { disabled: true })}
          />
        </div>
        <div className="mb-3 row">
          <div className="col row">
            <label htmlFor="priority" className="col-sm-2 col-form-label">
              Priority:
            </label>
            <div className="col-sm-10">
              <select
                name="priority"
                id="priority"
                className="form-control"
                {...register("priority", { required: true })}
              >
                <option value="">Select Priority</option>
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
              </select>
              {errors.priority && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
          </div>
          <div className="col row">
            <label htmlFor="status" className="col-sm-2 col-form-label">
              Status:
            </label>
            <div className="col-sm-10">
              <select
                name="status"
                id="status"
                className="form-control"
                {...register("status", { required: true })}
              >
                <option value="">Select Status</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Deployed">Deployed</option>
                <option value="Deffered">Deffered</option>
              </select>
              {errors.status && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
          </div>
        </div>
        <div className="col d-flex justify-content-end align-items-center gap-2">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
          <button className="btn btn-primary" onClick={handleResetField}>
            Reset
          </button>
        </div>
      </form>
    </>
  );
};

export default EditTaskForm;
