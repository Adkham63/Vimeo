import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TutorialsPage = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockTutorials = [
      {
        id: 1,
        title: "Lighting Techniques for Videographers",
        description: "Learn how to set up professional lighting for any shoot.",
        linkSlug: "lighting-techniques",
      },
      {
        id: 2,
        title: "Editing Workflow in Adobe Premiere Pro",
        description:
          "Improve your editing efficiency with these tips and tricks.",
        linkSlug: "premiere-pro-workflow",
      },
      {
        id: 3,
        title: "Equipment Reviews: Best Cameras 2025",
        description: "Discover our top picks for videography cameras in 2025.",
        linkSlug: "best-cameras-2025",
      },
    ];

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
          Учебные пособия по производству видео
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial) => (
            <div
              key={tutorial.id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="p-6 h-full flex flex-col">
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
                  Учебное пособие для проводника
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
