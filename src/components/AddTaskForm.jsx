import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showHideNewTaskModal } from "../../utils/modalSlice";
import { addMainData } from "../../utils/dataStoreSlice";

const AddTaskForm = () => {
  // for handling form data I have used useFor from 'react-hook-form';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  // On form submission this function is called
  const onSubmit = (data) => {
    data.id = new Date().getTime();
    data.status = "Pending";
    data.created_at = new Date().toLocaleDateString();

    // dispatching the main data to add it in redux store
    dispatch(addMainData(data));

    // After submission hiding the new task modal
    dispatch(showHideNewTaskModal(false));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 row">
          <label htmlFor="task" className="col-sm-2 col-form-label">
            Task
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="task"
              {...register("task", { required: true })}
              style={{ border: errors.task && "1px solid red" }}
            />
            {/* To show a error message if they won't fill task  */}
            {errors.task && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="description" className="col-sm-2 col-form-label">
            Description
          </label>
          <div className="col-sm-10">
            <textarea
              type="text"
              className="form-control"
              id="description"
              {...register("description", { required: true })}
              style={{ border: errors.description && "1px solid red" }}
            />
            {/* To show a error message if they won't fill description  */}
            {errors.description && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="team" className="col-sm-2 col-form-label">
            Team
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="team"
              {...register("team", { required: true })}
              style={{ border: errors.team && "1px solid red" }}
            />
            {/* To show a error message if they won't fill team  */}
            {errors.team && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="assignee" className="col-sm-2 col-form-label">
            Assignee
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="assignee"
              {...register("assignee", { required: true })}
              style={{ border: errors.assignee && "1px solid red" }}
            />
            {/* To show a error message if they won't fill asignee  */}
            {errors.assignee && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="priority" className="col-sm-2 col-form-label">
            Priority:
          </label>
          <div className="col-sm-10">
            <select
              name="priority"
              id="priority"
              className="form-control"
              {...register("priority", { required: true })}
              style={{ border: errors.priority && "1px solid red" }}
            >
              <option value="">Select Priority</option>
              <option value="P0">P0</option>
              <option value="P1">P1</option>
              <option value="P2">P2</option>
            </select>
            {/* To show a error message if they won't fill priority  */}
            {errors.priority && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-end align-items-center">
          <button className="btn btn-primary" type="submiot">
            Create
          </button>
        </div>
      </form>
    </>
  );
};

export default AddTaskForm;
