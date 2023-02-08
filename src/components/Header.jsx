import Logo from '../assets/Logotype-Experience-Two-row-Digital-black.png'


const Header = () => {
    return (
        <div className="header">
            <img className='header__logo' src={Logo} loading='lazy' alt="Hotspot 2023" />
            <h1 className='header__h1'>
                – stava rätt, stava <i>snabbt!</i>
            </h1>
        </div>
    )
}

export default Header

