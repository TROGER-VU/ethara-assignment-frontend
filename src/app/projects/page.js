"use client";
import { useEffect, useState, useCallback } from "react";
import { fetchAPI } from "../../lib/api";
import { useRouter } from "next/navigation";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const loadProjects = useCallback(async () => {
    try {
      const res = await fetchAPI("/projects/my");
      setProjects(res);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      const res = await fetchAPI("/projects/my");
      if (mounted) setProjects(res);
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  const createProject = async () => {
    await fetchAPI("/projects", {
      method: "POST",
      body: JSON.stringify({ name, description }),
    });
    setName("");
    setDescription("");
    loadProjects(); // reload list
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Projects</h2>

      <div className="card mb-4">
        <input
          className="input"
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="input"
          placeholder="Project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn" onClick={createProject}>
          Create
        </button>
      </div>

      <div className="grid gap-3">
        {projects.map((p) => (
          <div key={p.id} className="card flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-500">{p.description}</p>
            </div>
            <button
              onClick={() => router.push(`/projects/${p.id}`)}
              className="btn"
            >
              Open
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}