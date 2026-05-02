"use client";
import { useEffect, useState } from "react";
import { fetchAPI } from "../../../lib/api";
import { useParams } from "next/navigation";

export default function ProjectDetail() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [assignId, setAssignId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [project, setProject] = useState(null);
  const [stats, setStats] = useState(null);
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);

  const load = async () => {
    const tasksRes = await fetchAPI(`/tasks/${id}`);
    const projectRes = await fetchAPI(`/projects/${id}`);
    const statsRes = await fetchAPI(`/tasks/stats/${id}`);
    const membersRes = await fetchAPI(`/projects/${id}/members`);
    const usersRes = await fetchAPI(`/users`);

    setTasks(tasksRes);
    setProject(projectRes);
    setStats(statsRes);
    setMembers(membersRes);
    setUsers(usersRes);
  };
  
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      await load();
    };

    fetchData();
  }, [id]);

  // create task
  const createTask = async () => {
    await fetchAPI("/tasks", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        projectId: id,
        status: "todo",
        priority,
        due_date: dueDate ? new Date(dueDate).toISOString() : null,
      }),
    });
    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
    load();
  };

  // assign
  const assignTask = async (taskId) => {
    if (!assignId) return alert("Select a user");
    await fetchAPI("/tasks/assign", {
      method: "POST",
      body: JSON.stringify({
        taskId,
        userId: assignId,
        projectId: id,
      }),
    });

    setAssignId("");
    load();
  };

  // add member
  const addMember = async () => {
    if (!memberId) return alert("Select a user");
    await fetchAPI("/projects/add-member", {
      method: "POST",
      body: JSON.stringify({
        projectId: id,
        userId: memberId,
      }),
    });
    setMemberId("");
    load();
  };

  const statusStyle = {
    todo: "bg-gray-300",
    "in-progress": "bg-yellow-300",
    done: "bg-green-300",
  };

  const availableUsers = users.filter(
    (u) => !members.some((m) => m.id === u.id)
  );

  return (
    <div>
      <div className="card mb-4">
        <h2 className="text-2xl font-bold">{project?.name}</h2>
        <p className="text-gray-500">{project?.description}</p>
      </div>
      {stats && (
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total", value: stats.total },
            { label: "Todo", value: stats.todo },
            { label: "In Progress", value: stats.in_progress },
            { label: "Done", value: stats.done },
          ].map((s) => (
            <div key={s.label} className="card text-center">
              <p className="text-gray-500 text-sm">{s.label}</p>
              <p className="text-2xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {stats && (
        <div className="card mb-6">
          <p className="text-sm mb-2">Progress</p>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full"
              style={{
                width: `${
                  stats.total > 0
                    ? (stats.done / stats.total) * 100
                    : 0
                }%`,
              }}
            ></div>
          </div>

          <p className="text-xs mt-2 text-gray-500">
            {stats.done} / {stats.total} tasks completed
          </p>
        </div>
      )}

      <div className="card mb-4">
        <h3 className="font-semibold mb-2">Members</h3>

        <div className="flex flex-wrap gap-2">
          {members.map((m) => (
            <span key={m.id} className="badge bg-blue-100">
              {m.name} ({m.role})
            </span>
          ))}
        </div>
      </div>

      {/* Create Task */}
      <div className="card mb-4">
        <label className="text-sm text-gray-500">Task Title</label>
        <input className="input" placeholder="Task title" value={title} onChange={(e)=>setTitle(e.target.value)} />
        <label className="text-sm text-gray-500">Due Date</label>
        <input
          type="datetime-local"
          className="input"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <label className="text-sm text-gray-500">Priority</label>
          <select
            className="input"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        <label className="text-sm text-gray-500">Description</label>
          <textarea
          className="input"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />
        <button className="btn" onClick={createTask}>Create Task</button>
      </div>

      {/* Add Member */}
      <div className="card mb-4">
        <select
        className="input"
        value={memberId}
        onChange={(e) => setMemberId(e.target.value)}
      >
        <option value="">Select user</option>
        {availableUsers.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name} ({u.email})
          </option>
        ))}
      </select>
        <button className="btn" onClick={addMember}>Add Member</button>
      </div>

      {/* Tasks */}
      <div className="grid gap-3">
        {tasks.map((t) => (
          <div key={t.id} className="card">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">{t.title}</h3>
              <span className={`badge ${statusStyle[t.status]}`}>
                {t.status}
              </span>
            </div>

            <div className="flex justify-between mt-3 mb-3 text-sm">
              <span>Priority: {t.priority}</span>
              <span className="text-sm text-gray-500">
                Due: {t.due_date ? new Date(t.due_date).toLocaleDateString() : "N/A"}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-2">
              Assigned to:
              <span className="ml-1 font-medium text-blue-600">
                {t.assigned_name || "Unassigned"}
              </span>
            </p>

            {/* Assign */}
            <select
              className="input"
              value={assignId}
              onChange={(e) => setAssignId(e.target.value)}
            >
              <option value="">Select member</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.role})
                </option>
              ))}
            </select>

            <div className="flex gap-2 mt-2">
              <button className="btn" onClick={()=>assignTask(t.id)}>
                Assign
              </button>

              <button
                className="btn"
                onClick={async () => {
                  await fetchAPI("/tasks/status", {
                    method: "PATCH",
                    body: JSON.stringify({
                      taskId: t.id,
                      status: "done",
                    }),
                  });
                  load();
                }}
              >
                Mark Done
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}