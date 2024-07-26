import React, { useEffect } from "react";
import { LikeRoom } from "../components/ui/User/LikeRoom";

export const Like = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="container my-[40px] mx-auto">
      <LikeRoom />
    </div>
  );
};
