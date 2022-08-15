import { useState, useEffect } from "react";
import Button from './buttonClick.js';
import Input from './inputChange.js';
const apiUrl = "https://api.shrtco.de/v2/shorten?url=";
var longUrl;
var shortLink;
var inputUser;
var v1;
var shortLinkArr =[];
var shortLinkList = [];
var uniqueLinkArr = [];
var regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

export default function Shortr() {
    const [urls, setUrls] = useState();
    const [tabs, setTabs] = useState(); 
    //const [userInput, setUserInput ] = useState();
    
    // Function to collect & check user input
    const getInputValue = event =>{
        inputUser = event.target.value;
        if(regex.test(event.target.value)){
            longUrl = event.target.value;
        }
    }
    
    // Function to collect data
    const getApiData =  () => {
        if(regex.test(inputUser)){
            const response = fetch(apiUrl + longUrl)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } 
                else if(response.status === 400) {
                    return Promise.reject('error 400')
                } 
                else {
                    return Promise.reject('some other error: ' + response.status)
                }
            })
            .then((response) => {
                setUrls(response.result.full_short_link);
                shortLink = response.result.full_short_link;
            })
            .finally(() => {
                setTabs(shortLink)
                setLocalStor(shortLink)
            });
        }
    };
    
    useState(() => {
        if(localStorage.getItem("url") != null){
            shortLinkList = localStorage.getItem("url").split(",");
        }
    }, []);
    
    //function to add and retrieve to localstorage
    const setLocalStor = (shrtlink) =>{
        if(localStorage.getItem("url") != null){
            v1 = localStorage.getItem("url") + ',' + shrtlink; 
        }
        else{
            v1 = shrtlink;
        }
        shortLinkArr = v1.split(',');
        for(let i of shortLinkArr) {
            if(uniqueLinkArr.indexOf(i) === -1) {
                uniqueLinkArr.push(i);
            }
        }
        localStorage.setItem("url", uniqueLinkArr);
        shortLinkList = localStorage.getItem("url").split(",");
    }
    
    
    return (
        <div>
        <Input onChange={getInputValue}/>
        <Button onClick={getApiData} title="> Shorten It !" />
        
        {shortLinkList &&
            shortLinkList.map((shortLinkLists => (
                <div>
                <a href={shortLinkLists} target='_blank' rel="noopener">{shortLinkLists}</a>
                </div>
                )))
            } 
            </div>
            );
        } 