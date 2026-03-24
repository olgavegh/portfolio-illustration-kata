import SvgIcon from './SvgIcon'
import './Switch.css'

const Switch = ({ isOn, handleToggle, iconOff, iconOn }) => {
    return (
        <>
            <input
                checked={isOn}
                onChange={handleToggle}
                className="react-switch-checkbox -ml-2" // for unneccesery gap
                id="react-switch-new"
                type="checkbox"
            />
            <label
                htmlFor="react-switch-new"
                className={`react-switch-label relative flex items-center justify-between cursor-pointer rounded-full transition duration-500 ${isOn ? 'bg-accent' : 'bg-button-secondary'}`}
            >
                {iconOff && <SvgIcon src={iconOff} className={`relative z-10 p-1.5 w-10 h-10 text-white transition duration-500 ${isOn ? "opacity-0" : "opacity-100"}`} />}
                {iconOn && <SvgIcon src={iconOn} className={`relative z-10 p-1.5 w-10 h-10 text-white transition duration-500 ${!isOn ? "opacity-0" : "opacity-100"}`} />}
                <span className="react-switch-button absolute aspect-square rounded-full bg-white shadow-sm transition" />
            </label>
        </>
    )
}

export default Switch
