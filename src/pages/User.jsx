import React, { useEffect } from "react";
import { UserComponent } from "../components/ui/User/UserComponent";

export default function User() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return <UserComponent />;
}
