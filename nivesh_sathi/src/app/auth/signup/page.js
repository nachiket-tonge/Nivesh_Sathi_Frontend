"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "../../../lib/api";
import GoogleSignIn from "../../../components/auth/GoogleSignIn";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    profession: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await signup(form);

      router.push("/auth/login");
    } catch (err) {
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-100">
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">

  <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2">

    {/* LEFT SIDE */}

    <div className="hidden lg:block">

      <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
        🚀 Start Your Investment Journey
      </span>

      <h1 className="mt-8 text-6xl font-extrabold leading-tight text-slate-900">
        Build
        <span className="text-emerald-600"> Wealth.</span>
        <br />
        Invest Smart.
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
        Join thousands of investors using Artificial Intelligence to discover better mutual funds and make informed financial decisions.
      </p>

      <div className="mt-12 space-y-5">

        <div className="flex items-start gap-4 rounded-2xl bg-white/80 p-5 shadow-lg backdrop-blur">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-2xl">
            🤖
          </div>

          <div>

            <h3 className="font-semibold text-slate-800">
              AI Fund Recommendations
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Get personalized mutual fund recommendations instantly.
            </p>

          </div>

        </div>

        <div className="flex items-start gap-4 rounded-2xl bg-white/80 p-5 shadow-lg backdrop-blur">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-2xl">
            📈
          </div>

          <div>

            <h3 className="font-semibold text-slate-800">
              Portfolio Analytics
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Analyze performance, risk and returns with ease.
            </p>

          </div>

        </div>

        <div className="flex items-start gap-4 rounded-2xl bg-white/80 p-5 shadow-lg backdrop-blur">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-2xl">
            🔒
          </div>

          <div>

            <h3 className="font-semibold text-slate-800">
              Secure Authentication
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Login securely using Email or Google OAuth.
            </p>

          </div>

        </div>

      </div>

    </div>

    {/* RIGHT CARD */}

    <div className="mx-auto w-full max-w-md">

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">

        <div className="mb-8 text-center">

          <h2 className="text-3xl font-bold text-slate-900">
            Create Account 🚀
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Join NiveshSathi and begin investing smarter.
          </p>

        </div>

              {/* YOUR FORM GOES HERE */}
              <form onSubmit={handleSubmit} className="space-y-5">

  {/* Name */}

  <div>

    <label className="block mb-2 text-sm font-medium text-slate-700">
      Full Name
    </label>

    <input
      type="text"
      name="name"
      value={form.name}
      onChange={handleChange}
      placeholder="John Doe"
      required
      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
    />

  </div>

  {/* Email */}

  <div>

    <label className="block mb-2 text-sm font-medium text-slate-700">
      Email Address
    </label>

    <input
      type="email"
      name="email"
      value={form.email}
      onChange={handleChange}
      placeholder="you@example.com"
      required
      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
    />

  </div>

  {/* Password */}

  <div>

    <label className="block mb-2 text-sm font-medium text-slate-700">
      Password
    </label>

    <input
      type="password"
      name="password"
      value={form.password}
      onChange={handleChange}
      placeholder="Create a strong password"
      required
      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
    />

  </div>

  {/* Profession */}

  <div>

    <label className="block mb-2 text-sm font-medium text-slate-700">
      Profession
    </label>

    <select
      name="profession"
      value={form.profession}
      onChange={handleChange}
      required
      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
    >
      <option value="">Select Profession</option>
      <option>Student</option>
      <option>Working Professional</option>
      <option>Investor</option>
    </select>

  </div>

  <button
    type="submit"
    disabled={loading}
    className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 py-3.5 font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl disabled:opacity-60"
  >
    {loading ? "Creating Account..." : "Create Account"}
  </button>

              </form>
              {/* Divider */}

<div className="my-7 flex items-center">

  <div className="flex-1 border-t border-slate-200"></div>

  <span className="mx-3 text-sm text-slate-500">
    OR
  </span>

  <div className="flex-1 border-t border-slate-200"></div>

</div>

{/* Google Sign In */}

<GoogleSignIn />

{/* Security Note */}

<p className="mt-6 text-center text-xs text-slate-500">
  Your account is protected with JWT Authentication and Google OAuth.
</p>

{/* Login Link */}

<div className="mt-8 text-center">

  <p className="text-sm text-slate-500">
    Already have an account?
  </p>

  <button
    type="button"
    onClick={() => router.push("/auth/login")}
    className="mt-2 font-semibold text-emerald-600 hover:text-emerald-700 transition"
  >
    Sign In →
  </button>

</div>

      </div>

    </div>

  </div>

</div>

    </main>
  );
}