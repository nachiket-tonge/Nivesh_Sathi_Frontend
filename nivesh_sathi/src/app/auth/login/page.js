"use client";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { login } from "../../../lib/api";
import GoogleSignIn from "../../../components/auth/GoogleSignIn";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
const [remember, setRemember] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace("/");
    }
  }, [router]);

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

      const result = await login(form);

      localStorage.setItem("token", result.token);
      localStorage.setItem("userName", result.name);
      localStorage.setItem("userEmail", result.email);
      localStorage.setItem("userProfession", result.profession);

      router.push("/");
    } catch (err) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-100">

      {/* Background Blur Effects */}

      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-teal-200/30 blur-3xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">

        <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2">

          {/* LEFT SIDE */}

          <div className="hidden lg:block">

            <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              🚀 AI Powered Wealth Management
            </span>

            <h1 className="mt-8 text-6xl font-extrabold leading-tight text-slate-900">
              Invest
              <span className="text-emerald-600"> Smarter.</span>
              <br />
              Grow Faster.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              NiveshSathi helps investors discover the right mutual funds
              using Artificial Intelligence, risk analytics and personalized
              recommendations.
            </p>

            {/* Feature Cards */}

            <div className="mt-12 space-y-5">

              <div className="flex items-start gap-4 rounded-2xl bg-white/80 p-5 shadow-lg backdrop-blur">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-2xl">
                  📈
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800">
                    AI Recommendations
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Personalized mutual fund recommendations tailored to your
                    investment profile.
                  </p>
                </div>

              </div>

              <div className="flex items-start gap-4 rounded-2xl bg-white/80 p-5 shadow-lg backdrop-blur">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-2xl">
                  📊
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800">
                    Risk Analytics
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Understand returns, volatility and investment risk before
                    making decisions.
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
                    Protected with JWT authentication and Google Sign-In for a
                    safe experience.
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="mx-auto w-full max-w-md">

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">

              <div className="mb-8 text-center">

                <h2 className="text-3xl font-bold text-slate-900">
                  Welcome Back 👋
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Sign in to continue your investment journey.
                </p>

              </div>

              {/* FORM GOES HERE */}
              <form onSubmit={handleSubmit} className="space-y-5">

  {/* Email */}

  <div>

    <label className="block text-sm font-medium text-slate-700 mb-2">
      Email Address
    </label>

    <div className="relative">

      <Mail
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="email"
        name="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
      />

    </div>

  </div>

  {/* Password */}

  <div>

    <label className="block text-sm font-medium text-slate-700 mb-2">
      Password
    </label>

    <div className="relative">

      <Lock
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Enter your password"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-12 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
      >
        {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
      </button>

    </div>

  </div>

  {/* Remember */}

  <div className="flex items-center justify-between">

    <label className="flex items-center gap-2 text-sm text-slate-600">

      <input
        type="checkbox"
        checked={remember}
        onChange={() => setRemember(!remember)}
        className="accent-emerald-600"
      />

      Remember Me

    </label>

    <button
      type="button"
      className="text-sm text-emerald-600 hover:underline"
    >
      Forgot Password?
    </button>

  </div>

  {/* Login Button */}

  <button
    type="submit"
    disabled={loading}
    className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 py-3.5 font-semibold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition"
  >
    {loading ? "Signing In..." : "Sign In"}
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

<GoogleSignIn />

<p className="mt-6 text-center text-xs text-slate-500">
  Your account is protected with JWT Authentication and Google OAuth.
</p>

<div className="mt-8 text-center">

  <p className="text-sm text-slate-500">
    Don't have an account?
  </p>

  <button
    onClick={() => router.push("/auth/signup")}
    className="mt-2 font-semibold text-emerald-600 hover:text-emerald-700"
  >
    Create an Account →
  </button>

</div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}