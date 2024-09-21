"use client"; // Ensures this page uses client-side rendering

import { useParams } from "next/navigation";

const EDITActivityPage = () => {
  const params = useParams(); // Access dynamic route parameters
  const { id } = params; // Get the dynamic ID from the URL

  return (
    <div>
      <h1>Edit Activity</h1>
      <p>Activity ID: {id}</p> {/* Display the ID only */}
    </div>
  );
};

export default EDITActivityPage;
