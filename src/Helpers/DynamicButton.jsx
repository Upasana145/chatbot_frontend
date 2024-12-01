import React, { useState } from "react";
import { reConfirm } from "../utils/reConfirm";

const DynamicButton = ({ label, onClick, className, confirmMessage }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    // Confirm action if a confirmMessage is provided
    if (confirmMessage) {
      return reConfirm(
        { file: true },
        () => handleActionWithPromise(),
        confirmMessage
      );
    }

    // Call action without confirmation
    handleActionWithPromise();
  };

  const handleActionWithPromise = () => {
    setLoading(true);

    // Ensure onClick returns a Promise
    const result = onClick();

    // Check if result is a Promise
    if (result && typeof result.finally === "function") {
      result.finally(() => setLoading(false));
    } else {
      // If not a Promise, reset loading state immediately
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${className}`}
      type="button"
      disabled={loading}
    >
      {loading ? "Loading..." : label}
    </button>
  );
};

export default DynamicButton;
