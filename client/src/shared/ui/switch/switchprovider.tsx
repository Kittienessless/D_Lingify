import  {useState} from "react";
import { Switch } from "./switch.tsx";

export const SwitchProvider = () => {
  const [toggle, setToggled] = useState(false);
  return (
    <div>
      <Switch onChange={(event) => setToggled(event.target.checked)} />
      <p>The switch is {toggle ? 'on' : 'off'}</p>
    </div>
  )
}