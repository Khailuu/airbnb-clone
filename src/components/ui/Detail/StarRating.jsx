import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
export const StarRating = ({ value, onChange }) => {
  const [hover, setHover] = useState(null);
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;

        return (
          <label key={ratingValue}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => onChange(ratingValue)}
              className="hidden"
            />
            <FaStar
              className="cursor-pointer"
              color={ratingValue <= (hover || value) ? "#ffc107" : "#e4e5e9"}
              size={30}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};
