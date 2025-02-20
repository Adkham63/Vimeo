import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  async function registerUser(ev) {
    ev.preventDefault();
    setError(null);

    if (!name || !email || !password) {
      setError("Все поля обязательны для заполнения ✏️");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Пожалуйста, введите действительный адрес электронной почты 📧");
      return;
    }

    setLoading(true);

    try {
      await axios.post("/api/register", { name, email, password });
      toast.success(
        "🎉 Регистрация прошла успешно! Теперь вы можете войти в систему"
      );
      setName("");
      setEmail("");
      setPassword("");
    } catch (e) {
      toast.error("⚠️ Регистрация не удалась. Пожалуйста, попробуйте снова");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#8ECAE6] to-[#219EBC] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute w-64 h-64 bg-[#8ECAE6]/30 rounded-full -top-20 -right-20 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-[#219EBC]/30 rounded-full -bottom-24 -left-24 animate-pulse"></div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-[#023047] mb-2">
              Присоединяйтесь к нашему сообществу
            </h1>
            <p className="text-[#023047]/80 text-sm md:text-base">
              Создайте свою учетную запись за считанные секунды
            </p>
          </div>

          <form onSubmit={registerUser} className="space-y-4">
            <div>
              <label className="block text-[#023047] text-sm font-medium mb-2">
                Полное имя
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-2.5 border border-[#8ECAE6] rounded-lg focus:outline-none focus:border-[#219EBC] focus:ring-2 focus:ring-[#8ECAE6]/50 transition-all text-sm md:text-base"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#023047] text-sm font-medium mb-2">
                Адрес электронной почты
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-2.5 border border-[#8ECAE6] rounded-lg focus:outline-none focus:border-[#219EBC] focus:ring-2 focus:ring-[#8ECAE6]/50 transition-all text-sm md:text-base"
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
                  disabled={loading}
                  className="w-full pl-10 pr-12 py-2.5 border border-[#8ECAE6] rounded-lg focus:outline-none focus:border-[#219EBC] focus:ring-2 focus:ring-[#8ECAE6]/50 transition-all text-sm md:text-base"
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

            {error && (
              <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#219EBC] text-white font-medium rounded-lg hover:bg-[#023047] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">🌀</span>
                  Регистрируюсь...
                </>
              ) : (
                <>Зарегистрируйтесь прямо сейчас</>
              )}
            </button>

            <div className="text-center text-sm text-[#023047] mt-4">
              У вас уже есть учетная запись?{" "}
              <Link
                to="/login"
                className="font-medium text-[#219EBC] hover:text-[#023047] underline underline-offset-4 decoration-1 transition-colors"
              >
                Войдите в систему здесь
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
        theme="colored"
        toastClassName="!bg-[#8ECAE6]"
        progressClassName="!bg-[#023047]"
      />
    </div>
  );
}
