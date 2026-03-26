const Switch = ({ isOn, handleToggle, label }) => {
    return (

        <button
            role="switch"
            aria-checked={isOn}
            onClick={handleToggle}
            className="flex items-center gap-sm cursor-pointer group text-[2rem]"
        >
            {/* Track — height = thumb, width = 2× thumb */}
            <span className={`relative inline-block h-[1em] w-[2em] shrink-0 rounded-full transition-colors duration-300 ${isOn ? 'bg-accent' : 'bg-surface border border-stroke-weak'}`}>
                {/* Thumb — positioned with inset, same gap on both sides */}
                <span style={{ top: 'var(--switch-gutter)', bottom: 'var(--switch-gutter)', ...(isOn ? { right: 'var(--switch-gutter)' } : { left: 'var(--switch-gutter)' }) }} className="absolute aspect-square rounded-full shadow-sm transition-all duration-300 bg-background" />
            </span>

            {/* Label */}
            {label && (
                <span className={`typo-ui transition-colors ${isOn ? 'text-text-secondary' : 'text-text-muted'}`}>
                    {label}
                </span>
            )}
        </button>
    )
}

export default Switch
