import React, { useEffect, useState, useRef } from 'react'
import context from '../LeaderboardContextRoot'

import Gif from '../assets/klappandetjej.gif'

const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const Popup = ({ time, leaderboard, addToLeaderboard, showPopup, setShowPopup }) => {
    const dialogRef = useRef(null)
    const consentInputRef = useRef(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [nick, setNick] = useState('')
    const [consent, setConsent] = useState(false)
    const [newPlacement, setNewPlacement] = useState(0)

    useEffect(() => {
        return () => {
            console.log("unmount, closing")
            // Close dialog on unmount
            dialogRef.current.close()
        }
    }, [])

    useEffect(() => {
        console.log("showPopup", showPopup)
        if (showPopup) 
            dialogRef.current.showModal()        
        else 
            dialogRef.current.close()
        
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
        let hasError = false

        console.log(name, email, nick)

        if (name == "" || email == "" || nick == "") 
            hasError = true

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
        <dialog className="popup" ref={dialogRef} open={false}>
            <div className="popup__phrase">
                <span>Grattis! Du hamnade på plats </span>
                <span className='span--purple'>{ newPlacement }</span>
                <span>och din tid var på </span>
                <span className='span--purple'>{(time / 1000).toFixed(2)}</span>
                <span>sekunder.</span>
            </div>
            <img src={Gif} alt="" />
            <form className="popup__form">
                <p>Vänligen fyll i dina uppgifter nedan:</p>
                <FormInput label="För- och efternamn" type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
                <FormInput label="E-postadress" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                <FormInput label="Nickname" type="text" name="nick" value={nick} onChange={e => setNick(e.target.value)} />

                <fieldset className={`fieldset--checkbox`}>
                    <input id="consent" type="checkbox" name="consent" value={false} ref={consentInputRef} onChange={e => setConsent(e.target.value)} />
                    <label className={`label--checkbox`} htmlFor="consent" role="button" tabIndex={0} onKeyDown={e => {
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

const FormInput = ({ label, type, name, value, onChange }) => {

    return (
        <fieldset className={`fieldset--${type}`}>
            <input id={name} type={type} name={name} value={value} onChange={onChange} />
            <label className={`label--${type}`} htmlFor={name} dangerouslySetInnerHTML={{ __html: label }}></label>
        </fieldset>
    )
}

export default Popup
