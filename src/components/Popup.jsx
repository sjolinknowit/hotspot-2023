import React, { useEffect, useState, useRef } from 'react'
import Gif from '../assets/klappandetjej.gif'

const validEmailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;

const Popup = ({ time, leaderboard, addToLeaderboard, showPopup, setShowPopup }) => {
    const dialogRef = useRef(null)
    const consentInputRef = useRef(null)
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState(false)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [nick, setNick] = useState('')
    const [nickError, setNickError] = useState(false)
    const [consent, setConsent] = useState(false)
    const [newPlacement, setNewPlacement] = useState(0)

    useEffect(() => {
        return () => {
            // Close dialog on unmount
            dialogRef.current.close()
        }
    }, [])

    useEffect(() => {
        if (showPopup) 
            dialogRef.current.showModal()        
        else 
            dialogRef.current.close()
        
        consentInputRef.current.checked = false

    }, [showPopup])

    useEffect(() => {
        const tempLeaderboard = leaderboard?.map(player => player.time)
        tempLeaderboard.push(time)
        tempLeaderboard.sort((a, b) => a - b)
        const index = tempLeaderboard.indexOf(time)
        setNewPlacement(index + 1)
    }, [time])

    const handleSubmit = (e) => {
        e.preventDefault()
        
        name.trim().length == 0 ? setNameError(true) : setNameError(false)

        email.trim().length == 0 || !validEmailRegex.test(email) ? setEmailError(true) : setEmailError(false)

        nick.trim().length == 0 ? setNickError(true) : setNickError(false)

        if (nameError || emailError || nickError || !consent)
            return   

        setShowPopup(false)
        addToLeaderboard(name, email, nick)
    }

    const handleCancel = (e) => {
        setEmail('')
        setName('')
        setNick('')
        setConsent(false)
        setShowPopup(false)
    }

    return (
        <dialog className="popup" ref={dialogRef} open={false} onClose={() => handleCancel()}>
            <div className="popup__phrase">
                <span>Grattis! Du hamnade på plats</span>
                <span className='span--purple'>{ newPlacement }</span>
                <span>och din tid var på</span>
                <span className='span--purple'>{(time / 1000).toFixed(2)}</span>
                <span>sekunder.</span>
            </div>
            <img src={Gif} alt="" />
            <form className="popup__form">
                <p>Vänligen fyll i dina uppgifter nedan:</p>
                <FormInput label="För- och efternamn" type="text" name="name" value={name} onChange={e => setName(e.target.value)} hasError={nameError} />
                <FormInput label="E-postadress" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} hasError={emailError} />
                <FormInput label="Nickname" type="text" name="nick" value={nick} onChange={e => setNick(e.target.value)} hasError={nickError} />

                <fieldset className={`fieldset--checkbox`}>
                    <input id="consent" type="checkbox" name="consent" value={false} ref={consentInputRef} onChange={e => setConsent(e.target.value)} />
                    <label className={`label--checkbox ${!consent ? 'input--error' : ''}`} htmlFor="consent" role="button" tabIndex={0} onKeyDown={e => {
                        if (e.code === 'Enter' || e.code === 'Space') {
                            setConsent(!consent)
                            consentInputRef.current.checked = !consent
                        }
                            
                    }} >
                        <span>
                            Jag godkänner Knowits <a href='https://www.knowit.se/om-knowit/riktlinjer-policydokument/' target="_blank">sekretesspolicy</a> och att de får ta del av min data.
                        </span>
                    </label>
                </fieldset>

                <button className='btn btn--primary' type="submit" onClick={handleSubmit}>Spara</button>
                <button className='btn btn--secondary' type="button" onClick={handleCancel}>Avbryt</button>

            </form>
        </dialog>
    )
}

const FormInput = ({ label, type, name, value, onChange, hasError }) => {

    return (
        <fieldset className={`fieldset--${type}`}>
            <input id={name} type={type} name={name} value={value} onChange={onChange} className={hasError ? 'input--error' : ''} />
            <label className={`label--${type}`} htmlFor={name} dangerouslySetInnerHTML={{ __html: label }}></label>
        </fieldset>
    )
}

export default Popup
