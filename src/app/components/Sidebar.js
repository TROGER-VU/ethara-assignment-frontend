"use client";
import { useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

function getAuthSnapshot() {
  return typeof window !== "undefined" && !!window.localStorage.getItem("token");
}

function subscribeAuth(callback) {
  if (typeof window === "undefined") return () => {};

  window.addEventListener("storage", callback);
  window.addEventListener("auth-changed", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("auth-changed", callback);
  };
}

export default function Sidebar() {
  const isAuth = useSyncExternalStore(subscribeAuth, getAuthSnapshot, () => false);
  const router = useRouter();

  if (!isAuth) return null;

  return (
    <div className="w-60 bg-white shadow-md p-5 flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-6">Task Manager</h2>

      <button onClick={() => router.push("/dashboard")} className="nav">
        Dashboard
      </button>

      <button onClick={() => router.push("/projects")} className="nav">
        Projects
      </button>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.dispatchEvent(new Event("auth-changed"));
          window.location.href = "/";
        }}
        className="nav text-red-500"
      >
        Logout
      </button>
    </div>
  );
}