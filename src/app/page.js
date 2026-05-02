"use client";
import { useState } from "react";
import { fetchAPI } from "../lib/api";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({});
  const router = useRouter();

  const handleSubmit = async () => {
    const endpoint = isLogin ? "/auth/login" : "/auth/signup";

    const res = await fetchAPI(endpoint, {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.token) {
      localStorage.setItem("token", res.token);
      router.push("/dashboard");
    } else {
      alert("Error");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        {isLogin ? "Login" : "Signup"}
      </h2>

      {!isLogin && (
        <input
          className="input"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      )}

      <input
        className="input"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        className="input"
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button className="btn" onClick={handleSubmit}>
        {isLogin ? "Login" : "Signup"}
      </button>

      <p className="mt-4 text-sm cursor-pointer text-blue-500"
         onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? "Signup" : "Login"}
      </p>
    </div>
  );
}