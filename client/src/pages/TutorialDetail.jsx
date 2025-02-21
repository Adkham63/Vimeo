import React from "react";
import { useParams, Link } from "react-router-dom";

const tutorialDetails = {
  "basics-of-shooting": {
    title: "Основы съемки и монтажа видео | Бесплатный курс",
    content:
      "Всем привет и это первый урок с БЕСПЛАТНОГО курса по съемке и монтажу видео от Мастерской Исаева.",
    videoUrl: "https://www.youtube-nocookie.com/embed/qlr7MYI7q2o",
  },
  "how-to-become-a-videographer": {
    title: "3 урок курса Как стать видеографом: с 0 до первых денег",
    content:
      "Бесплатный мини-курс Даши Козыревой Как стать видеографом: с 0 до первых денег...",
    videoUrl: "https://www.youtube-nocookie.com/embed/ty9IBUSGFNs",
  },
  "how-to-learn-video-editing": {
    title: "Как учиться монтажу видео / План обучения для начинающих",
    content:
      "Если вы начинаете изучать видеомонтаж и не знаете с чего начать...",
    videoUrl: "https://www.youtube-nocookie.com/embed/6p4xCyRJN2U",
  },
  "color-correction": {
    title:
      "Топ-5 КНИГ по МОНТАЖУ видео и цветокоррекции | БЫСТРЫЙ СПОСОБ научиться МОНТИРОВАТЬ видео",
    content:
      "Тут ты найдешь всю информацию, что бы научиться создавать киношные видео...",
    videoUrl:
      "https://www.youtube-nocookie.com/embed/_py5znK0dEs?si=d7UO0Pknh5ww5Ldg",
  },
  "deceitful-videographers": {
    title: "Видеографы — обманщики! Красит ли Найшуллер материал?",
    content:
      "Видеографы — обманщики! Красит ли Найшуллер материал с блекмеджика?",
    videoUrl: "https://www.youtube-nocookie.com/embed/DBpdazNJ3M0",
  },
};

const TutorialDetail = () => {
  const { tutorialSlug } = useParams();
  const details = tutorialDetails[tutorialSlug] || {
    title: "Tutorial Not Found",
    content: "No details available for this tutorial.",
    videoUrl: null,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back link */}
        <div className="mb-8">
          <Link
            to="/tutorials"
            className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 font-semibold transition-colors group"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Вернемся к учебным пособиям</span>
          </Link>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 transition-all hover:shadow-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            {details.title}
          </h1>

          {/* If there's a video, embed it */}
          {details.videoUrl ? (
            <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
              <div className="relative" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  title={details.title}
                  src={details.videoUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>
            </div>
          ) : details.title === "Tutorial Not Found" ? (
            // If the tutorial is not found
            <div className="mb-8 p-6 bg-red-50 rounded-xl border border-red-200">
              <div className="flex items-center space-x-3">
                <svg
                  className="w-6 h-6 text-red-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div>
                  <h3 className="text-red-800 font-semibold">
                    Учебное пособие не найдено
                  </h3>
                  <p className="text-red-700 mt-1">
                    Запрошенное учебное пособие не существует.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="prose prose-lg max-w-none">
            {/* Additional text content */}
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <p className="text-blue-800 text-lg leading-relaxed">
                {details.content}
              </p>
            </div>

            {/* Link back to tutorials */}
            <div className="mt-12 flex justify-center">
              <Link
                to="/tutorials"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Изучите больше руководств
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialDetail;
