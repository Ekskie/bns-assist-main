"use client";
import { useState, useMemo } from "react";
import { Search, Plus, Download } from "lucide-react";
import { isSameDay, parseISO } from "date-fns";
import { useGetPostQuery } from "@/service/auth/autApiSlice";
import { useAddDailySpecialTaskDiaryMutation } from "@/service/dailyDiary/dailyDiaryApiSlice";
import toast from "react-hot-toast";
import ManageUserTasks from "./ManageUsersTask";

const PER_PAGE = 5;

export default function AllActivities() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [addTask, setAddTask] = useState(false);
  const [viewTask, setViewTask] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [formData, setFormData] = useState({ title: "" });

  // GET BNS worker accounts
  const { data: bnsWorkerData = [], refetch } = useGetPostQuery();
  const [addSpecialTask] = useAddDailySpecialTaskDiaryMutation();

  const filteredWorkers = bnsWorkerData.filter(
    (user) =>
      user.type === "bns-worker" &&
      user.approve &&
      (user.fullName.toLowerCase().includes(search.toLowerCase()) ||
        user.barangay?.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredWorkers.length / PER_PAGE);

  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filteredWorkers.slice(start, start + PER_PAGE);
  }, [filteredWorkers, page]);

  // ======================
  // ADD SPECIAL TASK
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const today = new Date().toISOString().split("T")[0];

      const res = await addSpecialTask({
        userId: userInfo._id,
        taskName: formData.title,
        date: today,
      }).unwrap();

      toast.success("Special task added");
      refetch();
    } catch (e) {
      console.log(e);
      toast.error("Error adding task");
    }

    setAddTask(false);
    setFormData({ title: "" });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 my-6 overflow-hidden">
      {!viewTask && (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-4">Daily Diary</h1>

            <div className="flex gap-2 items-center">
              {/* Search */}
              <div className="relative h-9">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  placeholder="Search workers..."
                  className="h-full pl-10 pr-4 rounded-lg bg-white text-sm outline-none border border-gray-200"
                  value={search}
                  onChange={(e) => {
                    setPage(1);
                    setSearch(e.target.value);
                  }}
                />
              </div>

              {/* Download */}
              <button className="px-4 py-2 rounded-lg border bg-white text-sm text-gray-700 border-gray-200">
                <Download size={16} />
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className=" text-gray-500 font-semibold">
                  <th>Bns-Worker</th>
                  <th>Task Today</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginated.map((item, index) => {
                  const today = new Date();
                  const todaysDiary = item.diaries?.find((d) =>
                    isSameDay(parseISO(d.date), today)
                  );

                  const tasks = todaysDiary?.tasks || {};
                  const special = todaysDiary?.specialTasks || {};

                  const doneTasks = Object.values(tasks).filter(Boolean).length;
                  const doneSpecial =
                    Object.values(special).filter(Boolean).length;

                  return (
                    <tr key={index} className="hover">
                      {/* Worker Info */}
                      <td>
                        <div className="font-semibold">{item.fullName}</div>
                        <div className="text-sm text-gray-500">
                          {item.barangay}
                        </div>
                      </td>

                      {/* Today Task Count */}
                      <td>
                        <div className="text-sm">
                          <div>
                            <span className="font-semibold">Tasks:</span>{" "}
                            {doneTasks}/{Object.keys(tasks).length}
                          </div>
                          <div>
                            <span className="font-semibold">Special:</span>{" "}
                            {doneSpecial}/{Object.keys(special).length}
                          </div>
                        </div>
                      </td>

                      {/* Buttons */}
                      <td className="flex gap-2">
                        <button
                          onClick={() => {
                            setAddTask(true);
                            setUserInfo({ ...item });
                          }}
                          className="btn h-fit p-2 bg-green-500 border-none text-white"
                        >
                          Add Special Task
                        </button>
                        <button
                          onClick={() => {
                            setViewTask(true);
                            setUserInfo({ ...item });
                          }}
                          className="btn h-fit p-2 bg-gray-500 border-none text-white"
                        >
                          View Diaries
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-500">
              Showing {Math.min(page * PER_PAGE, filteredWorkers.length)} of{" "}
              {filteredWorkers.length}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="btn btn-sm bg-green-600 border-none text-white"
              >
                Previous
              </button>

              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="btn btn-sm bg-green-600 border-none text-white"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {/* VIEW TASKS */}
      {viewTask && (
        <ManageUserTasks
          userTask={userInfo}
          closeViewing={() => {
            setViewTask(false);
            setUserInfo({});
          }}
          refetch={refetch}
        />
      )}

      {/* ADD SPECIAL TASK MODAL */}
      <div className={`modal ${addTask ? "modal-open" : ""}`}>
        <div className="modal-box relative bg-white">
          <button
            onClick={() => setAddTask(false)}
            className="btn absolute right-2 top-2 bg-white border-none shadow-none text-black"
          >
            ✕
          </button>

          <h3 className="text-lg font-bold mb-4">
            Add Special Task to {userInfo.fullName}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>

              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ title: e.target.value })}
                className="input input-bordered w-full bg-white border-gray-200"
                placeholder="Enter task title"
              />
            </div>

            <div className="modal-action justify-end">
              <button
                type="button"
                onClick={() => setAddTask(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button type="submit" className="btn bg-green-500 border-none">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
