"use client"; // Ensures this page uses client-side rendering

import { useParams } from "next/navigation";

const EditCoordinatorPage = () => {
  const params = useParams(); // Access dynamic route parameters
  const { id } = params; // Get the dynamic ID from the URL

  return (
    <div>
      <h1>Edit Coordinator</h1>
      <p>Coordinator ID: {id}</p> {/* Display the ID only */}
    </div>
  );
};

export default EditCoordinatorPage;
