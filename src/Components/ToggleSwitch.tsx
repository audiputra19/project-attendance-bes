import { FC } from "react";

interface ToggleSwitchProps {
    isChecked: boolean;
    onTonggle: () => void
}

const ToggleSwitch: FC<ToggleSwitchProps> = ({ isChecked, onTonggle }) => {

  return (
    <label className="relative inline-flex items-center cursor-pointer">
        <input
            type="checkbox"
            checked={isChecked}
            onChange={onTonggle}
            className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-color-base 
                        peer-focus:outline-none peer-checked:after:translate-x-full 
                        peer-checked:after:border-white after:content-[''] after:absolute 
                        after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 
                        after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
    </label>
  );
};

export default ToggleSwitch;
