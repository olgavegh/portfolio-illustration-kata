function SplashScreen({ visible }) {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-splash transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <img
        src="/bird-logo.png"
        alt="Kataco Studio"
        className={`w-24 h-auto transition-all duration-700 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} animate-pulse`}
      />
    </div>
  )
}

export default SplashScreen
