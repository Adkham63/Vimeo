import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TutorialsPage = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data from an API (replace with a real API call as needed)
  useEffect(() => {
    const mockTutorials = [
      {
        id: 1,
        title: "Lighting Techniques for Videographers",
        description: "Learn how to set up professional lighting for any shoot.",
        linkSlug: "lighting-techniques", // slug for URL
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

    // Simulate a network delay
    setTimeout(() => {
      setTutorials(mockTutorials);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading tutorials...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Tutorials</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tutorials.map((tutorial) => (
          <div key={tutorial.id} className="border p-4 rounded shadow-sm">
            <h2 className="text-2xl font-semibold mb-2">{tutorial.title}</h2>
            <p className="text-gray-700 mb-4">{tutorial.description}</p>
            <Link
              to={`/tutorials/${tutorial.linkSlug}`}
              className="text-blue-500 underline"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorialsPage;
