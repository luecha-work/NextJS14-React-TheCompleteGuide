"use client";

interface FilterErrorProps {
  readonly error: {
    message: string;
  };
}

function FilterError({ error }: FilterErrorProps) {
  return (
    <div id="error">
      <h2>An error occurred!</h2>
      <p>{error.message}</p>
    </div>
  );
}

export default FilterError;
