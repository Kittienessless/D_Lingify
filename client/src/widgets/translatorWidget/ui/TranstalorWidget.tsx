import React, { useEffect, useState } from "react";
import  Translate  from "../../../features/translation/ui/Translate.tsx";
export const TranstalorWidget = () => {
  const [origin, setOrigin] = useState("");
  const [goal, setGoal] = useState("");

  return (
    <div>
      <Translate />
    </div>
  );
};
