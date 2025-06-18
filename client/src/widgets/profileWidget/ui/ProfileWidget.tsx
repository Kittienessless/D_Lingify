import React, { useState, useEffect } from "react";

import Profile  from "features/profile/ui/Profile.tsx";
import { observer } from "mobx-react-lite";

 const ProfileWidget: React.FC = () => {
  return (
    <div>
      <Profile></Profile>
    </div>
  );
};
export default observer(ProfileWidget)