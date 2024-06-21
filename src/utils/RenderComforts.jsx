import React from "react";
import { itemsHome } from "./itemsHome";

export const RenderComforts = (data, element, note) => {
  let keyArray = [];
  for (const key in data) {
    if (data[key] === true) {
      keyArray.push(key);
    }
  }
  let homeComforts = itemsHome.filter((item) => keyArray.includes(item.key));
  return (
    <div className="iphone-6:grid-cols-7 grid">
      {homeComforts.map((item, i) => (
        <p key={i} className={element}>
          {item.icon}
          {note === "isRoom" && <span>{item.name}</span>}
        </p>
      ))}
    </div>
  );
};
