"use client";
import { useEffect, useState } from "react";
import { fetchAPI } from "../../lib/api";
import useAuth from "@/lib/useAuth";

export default function Dashboard() {
  useAuth();
  const [tasks, setTasks] = useState([]);
  const [overdue, setOverdue] = useState([]);

  useEffect(() => {
    fetchAPI("/tasks/my-tasks").then(setTasks);
    fetchAPI("/tasks/overdue").then(setOverdue);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="card">
          <h3 className="font-semibold">My Tasks</h3>
          <p>{tasks.length}</p>
        </div>
        <div className="card">
          <h3 className="font-semibold">Overdue</h3>
          <p>{overdue.length}</p>
        </div>
      </div>

      <h3 className="mb-2 font-semibold">Recent Tasks</h3>

      <div className="grid gap-3">
        {tasks.map((t) => (
          <div key={t.id} className="card">
            <div className="flex justify-between">
              <h4>{t.title}</h4>
              <span className="tag">{t.priority}</span>
            </div>

            <p className="text-sm text-gray-500">{t.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}