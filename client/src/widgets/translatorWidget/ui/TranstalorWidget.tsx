//TODO: dropdown для выбора языков перевода import React, { useEffect, useState } from 'react';
import React, { useEffect, useState } from "react";
import { Translate } from "features/translation";
export const TranstalorWidget = () => {
  const [origin, setOrigin] = useState("");
  const [goal, setGoal] = useState("");

  return (
    <div>
      <Translate />
    </div>
  );
};
