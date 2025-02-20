import React from "react";
import { useParams, Link } from "react-router-dom";

const tutorialDetails = {
  "lighting-techniques": {
    title: "Lighting Techniques for Videographers",
    content:
      "In this tutorial, you will learn the essential lighting setups for various videography scenarios. Tips include balancing natural light with artificial sources, using softboxes, and more.",
    videoUrl:
      "https://www.youtube-nocookie.com/embed/nqMQZG68Wkc?si=AenaoHEmOVKy35K8",
  },
  "premiere-pro-workflow": {
    title: "Editing Workflow in Adobe Premiere Pro",
    content:
      "This tutorial covers an efficient editing workflow in Adobe Premiere Pro. Learn shortcuts, timeline organization, and best practices to speed up your editing process.",
    videoUrl:
      "https://www.youtube-nocookie.com/embed/Rh3tobg7hEo?si=lFKCOvKNWAKmKhBY",
  },
  "best-cameras-2025": {
    title: "Equipment Reviews: Best Cameras 2025",
    content:
      "Explore our top recommendations for videography cameras in 2025. We review features, performance, and value for professionals and enthusiasts alike.",
    videoUrl:
      "https://www.youtube-nocookie.com/embed/Rh3tobg7hEo?si=lFKCOvKNWAKmKhBY",
  },
};

const TutorialDetail = () => {
  const { tutorialSlug } = useParams();
  const details = tutorialDetails[tutorialSlug] || {
    title: "Учебное пособие,",
    content: "В этом руководстве нет подробной информации.",
    videoUrl: null,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
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

        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 transition-all hover:shadow-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            {details.title}
          </h1>

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
                    Учебное пособие не найден
                  </h3>
                  <p className="text-red-700 mt-1">
                    Запрошенное учебное пособие не существует.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <p className="text-blue-800 text-lg leading-relaxed">
                {details.content}
              </p>
            </div>

            {/* Additional Content Sections */}
            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  Key Takeaways
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-2">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">
                      Профессиональная установка освещения
                    </span>
                  </li>
                  {/* Add more list items */}
                </ul>
              </div>

              <div className="bg-indigo-50 p-6 rounded-xl">
                <h3 className="text-2xl font-semibold mb-4 text-indigo-800">
                  Рекомендуемое оборудование
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-gray-800">Softbox Kit</h4>
                    <p className="text-sm text-gray-600">
                      Neewer 2.4G LED Softboxes
                    </p>
                  </div>
                  {/* Add more equipment items */}
                </div>
              </div>
            </div>

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
