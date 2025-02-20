import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../UserContext";
import {
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const IndexPage = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="text-center py-20 px-4 bg-gradient-to-b from-blue-600 to-blue-500 text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Добро пожаловать на наш форум сообщества
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Общайтесь, делитесь и учитесь с тысячами увлеченных пользователей
          </p>
          <div className="flex justify-center gap-4">
            {!user && (
              <>
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
                >
                  Начать
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
                >
                  Войти в систему
                </Link>
              </>
            )}
            {user && (
              <Link
                to="/forum"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all flex items-center gap-2"
              >
                Перейти на форум <ArrowRightIcon className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Зачем присоединяться к Нашему Сообществу?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ChatBubbleLeftRightIcon,
                title: "Участвуйте в дискуссиях",
                description:
                  "Участвуйте в содержательных беседах с членами сообщества",
              },
              {
                icon: UserGroupIcon,
                title: "Общайтесь с экспертами",
                description:
                  "Получите консультацию от профессионалов отрасли и энтузиастов",
              },
              {
                icon: SparklesIcon,
                title: "Будьте в курсе событий",
                description:
                  "Последние тенденции, новости и новинки в интересующей вас области",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-blue-600 mb-6" />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Готовы присоединиться?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Станьте частью нашего растущего сообщества сегодня и начать
            заниматься единомышленников по различным темам и интересам.
          </p>
          {!user && (
            <Link
              to="/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
            >
              Создайте бесплатную учетную запись
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4 mt-20">
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Форум сообщества. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default IndexPage;
