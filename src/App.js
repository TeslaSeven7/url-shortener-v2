
import { useState, useEffect } from "react";
let localtab = []
const url = "https://api.shrtco.de/v2/shorten?url=";
var longUrl;
var yolo;
var obj1= {}
var regex= /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
var regexcomma= "([,])+";


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
  const [localg, setLocalg] = useState([]);
  
  
  
  
  
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
          
        })
        .finally(() => {
          localtab.push(data.result.full_short_link)
          allocateLocalStorage();
        })
      }
      else{
        setMessageTwo('This is not a valid URL')
        setData('')
      }
      
    }
  }
  
  
  function allocateLocalStorage(){
    let uniquelocaltab = [];
    localtab.forEach((c) => {
      if (!uniquelocaltab.includes(c)) {
        uniquelocaltab.push(c);
        localStorage.setItem("url", uniquelocaltab);
        //console.log('include C')
      }
      else{
        //console.log('not include C')
        
      }
    });
    if(localStorage.getItem("url").search(",")!= -1){
      setMessageTwo('Here is your new URL')
      return setLocalg(localStorage.getItem("url").split(","))
      //console.log(typeof(localg))
      // console.log(localg)
      
    }
    else{
      setMessageTwo('Here is your new URL')
      return setLocalg(localStorage.getItem("url"))
      //console.log("1tem")
    }
    //obj1 = Object.assign({}, yolo);
    
  }
  

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
    
    <h2 onLoad={allocateLocalStorage}>Message: {messageTwo}</h2>
    
    </div>
    <button onClick={buttonCheck}>Generate URL</button>
    {Object.values(localg).map((value, index) => {
        return (
          <div key={index}>
            <h2>{value}</h2>
          </div>
        );
      })}

      <h2><a href={data} target="_blank">{localg}</a></h2>
      </>
      );
    }
    