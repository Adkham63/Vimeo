import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TutorialsPage = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data with images (thumbnails) for each tutorial
    const mockTutorials = [
      {
        id: 1,
        title: "Основы съемки и монтажа видео | Бесплатный курс",
        description:
          "Всем привет и это первый урок с БЕСПЛАТНОГО курса по съемке и монтажу видео от Мастерской Исаева.",
        linkSlug: "basics-of-shooting",
        thumbnail: "https://img.youtube.com/vi/qlr7MYI7q2o/hqdefault.jpg", // Example thumbnail
      },
      {
        id: 2,
        title: "3 урок курса Как стать видеографом: с 0 до первых денег",
        description:
          "Бесплатный мини-курс Даши Козыревой Как стать видеографом: с 0 до первых денег — по сути это основы видеосъёмки.",
        linkSlug: "how-to-become-a-videographer",
        thumbnail: "https://img.youtube.com/vi/ty9IBUSGFNs/hqdefault.jpg", // Example thumbnail
      },
      {
        id: 3,
        title: "Как учиться монтажу видео / План обучения для начинающих",
        description:
          "Если вы начинаете изучать видеомонтаж и не знаете, с чего начать, мы расскажем о всех темах для новичков.",
        linkSlug: "how-to-learn-video-editing",
        thumbnail: "https://img.youtube.com/vi/6p4xCyRJN2U/hqdefault.jpg", // Example thumbnail
      },
      {
        id: 4,
        title:
          "Топ-5 КНИГ по МОНТАЖУ видео и цветокоррекции | БЫСТРЫЙ СПОСОБ научиться МОНТИРОВАТЬ видео",
        description:
          "Тут ты найдешь всю информацию, чтобы научиться создавать киношные видео и построить профессию.",
        linkSlug: "color-correction",
        thumbnail: "https://img.youtube.com/vi/_py5znK0dEs/hqdefault.jpg", // Example thumbnail
      },
      {
        id: 5,
        title:
          "Видеографы — обманщики! Красит ли Найшуллер материал с блекмеджика?",
        description:
          "Видеографы — обманщики! Красит ли Найшуллер материал с блекмеджика?",
        linkSlug: "deceitful-videographers",
        thumbnail: "https://img.youtube.com/vi/DBpdazNJ3M0/hqdefault.jpg", // Example thumbnail
      },
    ];

    // Simulate network delay
    setTimeout(() => {
      setTutorials(mockTutorials);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
          Video Production Tutorials
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial) => (
            <div
              key={tutorial.id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="p-6 h-full flex flex-col">
                {/* Thumbnail */}
                <img
                  src={tutorial.thumbnail}
                  alt={tutorial.title}
                  className="mb-4 rounded-lg w-full h-48 object-cover"
                />

                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    {tutorial.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {tutorial.description}
                  </p>
                </div>
                <Link
                  to={`/tutorials/${tutorial.linkSlug}`}
                  className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
                >
                  Tutorial for Explorer
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-200 rounded-2xl transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorialsPage;
