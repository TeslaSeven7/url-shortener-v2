
import { useState, useEffect } from "react";
let localtab = []
const url = "https://api.shrtco.de/v2/shorten?url=";
var longUrl;
var yolo;
var obj1= {}
var regex= /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
export default function App() {
  
  const [message, setMessage] = useState('');
  const [messageTwo, setMessageTwo] = useState('');
  const [titleinput, setTitle] = useState('')
  const handleChange = event => {
    let input = event.target.value;
    setTitle(input)
    if (regex.test(input)){
      setMessageTwo('Here is your new URL')
      longUrl = url + input;
      
    }
    else{
      setMessageTwo('This is not a valid URL');
      setData('')
      
    }
    setMessage(input);
  };
  const [data, setData] = useState([]);
  
  
  
  function buttonCheck(){
    if(typeof longUrl  !== "undefined"){
      if (regex.test(titleinput)){
        fetch(longUrl)
        .then(data => {
          if (data.ok) {
            return data.json()
          } else if(data.status === 400) {
            return Promise.reject('error 400')
          } else {
            return Promise.reject('some other error: ' + data.status)
          }
        }) 
        .then((data) => {
          setData(data.result.full_short_link);
          localtab.push(data.result.full_short_link)


          
        })
        .then(response => {
          // handle the response
        })
        let uniquelocaltab = [];
        localtab.forEach((c) => {
          if (!uniquelocaltab.includes(c)) {
            uniquelocaltab.push(c);
            localStorage.setItem("keys", uniquelocaltab);
          }
        });
        yolo = localStorage.getItem("keys").split(",");
        obj1 = Object.assign({}, yolo);
        setMessageTwo('Here is your new URL')
        
    
        
      }
      else{
        setMessageTwo('This is not a valid URL')
        setData('')
      }
      
    }
  }
  
  
  //const [isSending, setIsSending] = useState(false);
  
  // useEffect(() => {
  //   if(isSending && typeof longUrl  !== "undefined"){
  //     if (regex.test(titleinput)){
  //       fetch(longUrl)
  //       .then(data => {
  //         if (data.ok) {
  //           return data.json()
  //         } else if(data.status === 400) {
  //           return Promise.reject('error 400')
  //         } else {
  //           return Promise.reject('some other error: ' + data.status)
  //         }
  //       }) 
  //       .then((data) => setData(data.result.full_short_link))
  //       .then(() => setIsSending(false));
  //       setMessageTwo('Here is your new URL')
  //       setIsSending(false);
  //       localindex++;
  //     }
  //     else{
  //       setMessageTwo('This is not a valid URL')
  //       setData('')
  //     }
  
  //   }
  //   setIsSending(false);
  
  
  // }, [isSending]);
  // console.log(localindex)
  // let localkey = localstore + localindex
  // localStorage.setItem(localkey, data);
  //<h3>{localStorage.getItem(localkey, data)}</h3>
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
    
    <h2>Message: {messageTwo}</h2>
    
    </div>
    <button onClick={buttonCheck}>Generate URL</button>
        <h2><a href={yolo} target="_blank">{yolo}</a></h2>
    
    
    </>
    );
  }
  