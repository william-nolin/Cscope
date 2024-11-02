
const Navbar = () => {
  return (
    <div className='w-full h-20 border-b grid grid-cols-3 items-center'>
      <img className="h-20 object-contain mx-auto" src='/logo.png' alt='logo ETS' />
      <h1 className="text-center text-sm sm:text-2xl">PFE028 - Évolution du code source</h1>
      <ul className="hidden sm:block text-sm mx-auto">
        <li>Cédric Audy - AUDC08089302</li>
        <li>Felix Dufresne - DUFF08079701</li>
        <li>Julien Boisvert-Simard - BOIJ22049800</li>
      </ul>
    </div>
  )
}

export default Navbar