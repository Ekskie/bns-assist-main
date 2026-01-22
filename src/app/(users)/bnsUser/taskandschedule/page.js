"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import {
  useAddDailyDiaryMutation,
  useLazyGetAllDailyDiaryQuery,
  useUpdateDailyDiaryMutation,
} from "@/service/dailyDiary/dailyDiaryApiSlice";

const TaskSchedule = () => {
  const { id } = useAuth();

  const [addDiary, { isLoading }] = useAddDailyDiaryMutation();
  const [getAllDailyDiary, { data }] = useLazyGetAllDailyDiaryQuery();
  const [updateTask] = useUpdateDailyDiaryMutation();

  const [viewTasksId, setViewTasksId] = useState(null);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  // Voice to text
  const [listening, setListening] = useState(false);

  const recognition =
    typeof window !== "undefined" &&
    (window.SpeechRecognition || window.webkitSpeechRecognition)
      ? new (window.SpeechRecognition || window.webkitSpeechRecognition)()
      : null;

  if (recognition) {
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "fil-PH";

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;

      // ✅ CONCATENATE (not replace)
      setModalContent((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };
  }

  useEffect(() => {
    getAllDailyDiary({ userId: id });
  }, [isLoading]);

  const handleCreateNewDiary = async () => {
    try {
      await addDiary({ userId: id }).unwrap();
      toast.success("Diary Created");
      getAllDailyDiary({ userId: id });
    } catch {
      toast.error("Error creating diary");
    }
  };

  const handleOpenModal = (task, diaryId, type, key) => {
    setEditingTask({ diaryId, taskKey: key, type });
    setModalContent(task.diary.content || "");
    setShowModal(true);
  };

  const toggleListening = () => {
    if (!recognition) return;
    listening ? recognition.stop() : recognition.start();
    setListening(!listening);
  };

  // ✅ SUPABASE IMAGE UPLOAD
  const handleImageChange = async (file, taskKey, type) => {
    if (!file) return;

    try {
      const supabase = getSupabase();
      const ext = file.name.split(".").pop();
      const fileName = `${id}-${Date.now()}.${ext}`;
      const filePath = `diaries/${fileName}`;

      // Upload
      const { error } = await supabase.storage
        .from("diary-images")
        .upload(filePath, file);
      console.log(error)
      if (error) throw error;

      // Public URL
      const { data: urlData } = supabase.storage
        .from("diary-images")
        .getPublicUrl(filePath);

      const imageUrl = urlData.publicUrl;

      const currentDiary = data?.diaries?.find((d) => d._id === viewTasksId);
      if (!currentDiary) return;

      if (type === "Regular") {
        await updateTask({
          diaryId: viewTasksId,
          tasks: {
            ...currentDiary.tasks,
            [taskKey]: {
              ...currentDiary.tasks[taskKey],
              diary: {
                ...currentDiary.tasks[taskKey].diary,
                imageUrl,
              },
            },
          },
        }).unwrap();
      }

      if (type === "Special") {
        await updateTask({
          diaryId: viewTasksId,
          specialTasks: {
            ...currentDiary.specialTasks,
            [taskKey]: {
              ...currentDiary.specialTasks[taskKey],
              diary: {
                ...currentDiary.specialTasks[taskKey].diary,
                imageUrl,
              },
            },
          },
        }).unwrap();
      }

      toast.success("Image uploaded");
      getAllDailyDiary({ userId: id });
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    }
  };

  const handleSaveModal = async () => {
    const { diaryId, taskKey, type } = editingTask;
    const currentDiary = data?.diaries?.find((d) => d._id === diaryId);
    if (!currentDiary) return;

    if (type === "Regular") {
      await updateTask({
        diaryId,
        tasks: {
          ...currentDiary.tasks,
          [taskKey]: {
            ...currentDiary.tasks[taskKey],
            diary: {
              ...currentDiary.tasks[taskKey].diary,
              content: modalContent,
            },
          },
        },
      }).unwrap();
    }

    if (type === "Special") {
      await updateTask({
        diaryId,
        specialTasks: {
          ...currentDiary.specialTasks,
          [taskKey]: {
            ...currentDiary.specialTasks[taskKey],
            diary: {
              ...currentDiary.specialTasks[taskKey].diary,
              content: modalContent,
            },
          },
        },
      }).unwrap();
    }

    toast.success("Diary updated");
    setShowModal(false);
    getAllDailyDiary({ userId: id });
  };

  const renderTaskRows = (tasksObj, type) =>
    Object.entries(tasksObj || {}).map(([key, task]) => (
      <tr key={key}>
        <td className="border px-4 py-2">{task.title}</td>

        <td
          className="border px-4 py-2 text-blue-600 cursor-pointer max-w-[300px]"
          onClick={() => handleOpenModal(task, viewTasksId, type, key)}
        >
          <p className="line-clamp-2 break-words">
            {task.diary.content || "Click to add"}
          </p>
        </td>

        <td className="border px-4 py-2">
          {task.diary.imageUrl ? (
            <img
              src={task.diary.imageUrl}
              className="w-16 h-16 object-cover rounded"
            />
          ) : (
            "No Image"
          )}
        </td>

        <td className="border px-4 py-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e.target.files[0], key, type)}
          />
        </td>
      </tr>
    ));

  return (
    <div className="w-full mx-auto p-6">
      {/* LIST VIEW */}
      {!viewTasksId && (
        <>
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-semibold">Daily Diaries</h2>
            <button
              onClick={handleCreateNewDiary}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Create Diary
            </button>
          </div>

          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">Tasks</th>
                <th className="border p-2">Special</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.diaries?.map((d) => (
                <tr key={d._id}>
                  <td className="border p-2">{d.date}</td>
                  <td className="border p-2">
                    {Object.keys(d.tasks || {}).length}
                  </td>
                  <td className="border p-2">
                    {Object.keys(d.specialTasks || {}).length}
                  </td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => setViewTasksId(d._id)}
                      className="text-blue-600 underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* TASK VIEW */}
      {viewTasksId && (
        <>
          <button
            onClick={() => setViewTasksId(null)}
            className="mb-4 underline"
          >
            ← Back
          </button>

          <h3 className="font-semibold mb-2">Regular Tasks</h3>
          <table className="w-full border mb-6">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Title</th>
                <th className="border p-2">Content</th>
                <th className="border p-2">Image</th>
                <th className="border p-2">Upload</th>
              </tr>
            </thead>
            <tbody>
              {data?.diaries
                ?.filter((d) => d._id === viewTasksId)
                .map((d) => renderTaskRows(d.tasks, "Regular"))}
            </tbody>
          </table>

          <h3 className="font-semibold mb-2">Special Tasks</h3>
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Title</th>
                <th className="border p-2">Content</th>
                <th className="border p-2">Image</th>
                <th className="border p-2">Upload</th>
              </tr>
            </thead>
            <tbody>
              {data?.diaries
                ?.filter((d) => d._id === viewTasksId)
                .map((d) => renderTaskRows(d.specialTasks, "Special"))}
            </tbody>
          </table>
        </>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-[500px]">
            <h3 className="font-semibold mb-3">Edit Diary</h3>

            <textarea
              className="w-full border p-2 mb-3"
              rows={5}
              value={modalContent}
              onChange={(e) => setModalContent(e.target.value)}
            />

            <div className="flex justify-between">
              <button
                onClick={toggleListening}
                className={`px-3 py-1 rounded ${
                  listening ? "bg-red-500" : "bg-green-500"
                } text-white`}
              >
                {listening ? "Stop Voice" : "Start Voice"}
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveModal}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskSchedule;
