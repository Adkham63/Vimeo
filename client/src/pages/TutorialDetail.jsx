import React from "react";
import { useParams, Link } from "react-router-dom";

const tutorialDetails = {
  "lighting-techniques": {
    title: "Lighting Techniques for Videographers",
    content:
      "In this tutorial, you will learn the essential lighting setups for various videography scenarios. Tips include balancing natural light with artificial sources, using softboxes, and more.",
    // Use the proper embed URL with the nocookie domain:
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
  // Get the tutorial slug from the URL
  const { tutorialSlug } = useParams();
  // Look up the details using the slug; if not found, use default values.
  const details = tutorialDetails[tutorialSlug] || {
    title: "Tutorial Not Found",
    content: "No details available for this tutorial.",
    videoUrl: null,
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{details.title}</h1>
      <p className="mb-6">{details.content}</p>

      {/* Render video if available */}
      {details.videoUrl && (
        <div className="mb-6">
          <div
            className="relative"
            style={{ paddingBottom: "56.25%", height: 0 }}
          >
            <iframe
              title={details.title}
              src={details.videoUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      )}

      <Link to="/tutorials" className="text-blue-500 underline">
        Back to Tutorials
      </Link>
    </div>
  );
};

export default TutorialDetail;
