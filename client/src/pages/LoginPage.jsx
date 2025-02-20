import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/api/login", { email, password });
      setUser(data);
      toast.success("🎉 Авторизация прошла успешно! Перенаправление...");
      setTimeout(() => setRedirect(true), 1500);
    } catch (e) {
      toast.error("⚠️ Ошибка входа. Пожалуйста, проверьте свои учетные данные");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#8ECAE6] to-[#219EBC] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute w-72 h-72 bg-[#8ECAE6]/30 rounded-full -top-28 -right-28 animate-pulse"></div>
      <div className="absolute w-64 h-64 bg-[#219EBC]/30 rounded-full -bottom-24 -left-24 animate-pulse"></div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-[#023047] mb-2">
              Добро пожаловать обратно!
            </h1>
            <p className="text-[#023047]/80 text-sm md:text-base">
              Войдите в систему, чтобы продолжить свое путешествие
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleLoginSubmit}>
            <div>
              <label className="block text-[#023047] text-sm font-medium mb-2">
                Электронная почта
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-[#8ECAE6] rounded-lg focus:outline-none focus:border-[#219EBC] focus:ring-2 focus:ring-[#8ECAE6]/50 transition-all text-sm md:text-base"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#023047] text-sm font-medium mb-2">
                Пароль
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  className="w-full pl-10 pr-12 py-2.5 md:py-3 border border-[#8ECAE6] rounded-lg focus:outline-none focus:border-[#219EBC] focus:ring-2 focus:ring-[#8ECAE6]/50 transition-all text-sm md:text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#219EBC] hover:text-[#023047] transition-colors text-sm"
                >
                  {showPassword ? "👁️" : "👁️🗨️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#219EBC] text-white font-medium rounded-lg hover:bg-[#023047] transition-colors duration-300 flex items-center justify-center gap-2"
            >
              Войти в систему
            </button>

            <div className="text-center text-sm text-[#023047] mt-4">
              У вас нет учетной записи?{" "}
              <Link
                to="/register"
                className="font-medium text-[#219EBC] hover:text-[#023047] underline underline-offset-4 decoration-1 transition-colors"
              >
                Создать аккаунт
              </Link>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastClassName="!bg-[#8ECAE6]"
        progressClassName="!bg-[#023047]"
      />
    </div>
  );
};

export default LoginPage;
