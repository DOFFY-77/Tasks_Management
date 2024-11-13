import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constans.jsx";
import { Link, router } from "@inertiajs/react";

const TasksTable = ({
  tasks,
  success,
  queryParams = null,
  hideProjectColumn = false,
}) => { 
  queryParams = queryParams || {};
  const handleSearch = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("task.index"), queryParams);
  };

  return (
    <>
      {success && (
        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
          {success}
        </div>
      )}
      {!tasks.data.length ? (
        <h2 className="text-2xl text-center">No tasks found</h2>
      ) : (
        <div className="overflow-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
              <tr className="text-nowrap">
                <TableHeading
                  name="id"
                  sortField={queryParams.sort_field}
                  sortDirection={queryParams.sort_direction}
                  onSortChanged={handleSearch}
                >
                  ID
                </TableHeading>
                <th className="px-3 py-3">Image</th>
                {!hideProjectColumn && <th className="px-3 py-3">Project Name</th>}
                <TableHeading
                  name="name"
                  sortField={queryParams.sort_field}
                  sortDirection={queryParams.sort_direction}
                  onSortChanged={handleSearch}
                >
                  Name
                </TableHeading>
                <TableHeading
                  name="status"
                  sortField={queryParams.sort_field}
                  sortDirection={queryParams.sort_direction}
                  onSortChanged={handleSearch}
                >
                  Status
                </TableHeading>
                <TableHeading
                  name="created_at"
                  sortField={queryParams.sort_field}
                  sortDirection={queryParams.sort_direction}
                  onSortChanged={handleSearch}
                >
                  Create Date
                </TableHeading>
                <TableHeading
                  name="due_date"
                  sortField={queryParams.sort_field}
                  sortDirection={queryParams.sort_direction}
                  onSortChanged={handleSearch}
                >
                  Due Date
                </TableHeading>
                <th className="px-3 py-3">Created By</th>
                <th className="px-3 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
              <tr className="text-nowrap">
                <th className="px-3 py-3"></th>
                <th className="px-3 py-3"></th>
                {!hideProjectColumn && <th className="px-3 py-3"></th>}
                <th className="px-3 py-3">
                  <TextInput
                    className="w-full"
                    defaultValue={queryParams.name}
                    placeholder="Task Name"
                    onBlur={(e) => handleSearch("name", e.target.value)}
                  />
                </th>
                <th className="px-3 py-3">
                  <SelectInput
                    className="w-full"
                    defaultValue={queryParams.status}
                    onChange={(e) =>
                      handleSearch("status", e.target.value)
                    }
                  >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </SelectInput>
                </th>
                <th className="px-3 py-3"></th>
                <th className="px-3 py-3"></th>
                <th className="px-3 py-3"></th>
                <th className="px-3 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {tasks.data.map((task) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={task.id}
                >
                  <td className="px-3 py-2">{task.id}</td>
                  <td className="px-3 py-2">
                    <img src={task.image_path} style={{ width: 80 }} />
                  </td>
                  {!hideProjectColumn && (
                    <td className="px-3 py-2">{task.project.name}</td>
                  )}
                  <th className="px-3 py-2 text-gray-100 hover:underline">
                    <Link href={route("task.show", task.id)}>{task.name}</Link>
                  </th>
                  <td className="px-3 py-2">
                    <span
                      className={
                        "px-2 py-1 rounded text-nowrap text-white inline-block text-center " +
                        TASK_STATUS_CLASS_MAP[task.status]
                      }
                      style={{ width: "100px" }}
                    >
                      {TASK_STATUS_TEXT_MAP[task.status]}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-nowrap">{task.created_at}</td>
                  <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                  <td className="px-3 py-2">{task.createdBy.name}</td>
                  <td className="px-3 py-2 text-nowrap">
                    <Link
                      href={route("task.edit", task.id)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={(e) => deleteTask(task)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table><Pagination links={tasks.meta.links} />
        </div>
      )}
    </>
  );
};
export default TasksTable;

