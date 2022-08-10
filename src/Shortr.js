import {useState} from 'react';
const Fields = () => {
    const [message, setMessage] = useState('');
    
    const handleChange = event => {
        setMessage(event.target.value);
       
    };
    
    return (
        <>
        
        <div>
        <input
        type="text"
        id="message"
        name="message"
        onChange={handleChange}
        value={message}
        />
        
        <h2>Message: {message}</h2>
        
        </div>
        </>
        );
    };
    
    export default Fields;