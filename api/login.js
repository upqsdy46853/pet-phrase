import { query } from "express";
import fetch from "node-fetch"
const postBaseUrl = 'http://localhost:3000/api';
export function login(username,password){
    let url = `${postBaseUrl}/login`;
    return fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            username: username,
            password: password 
        })
    }).then(res=>{
	return res.json().then(json=>{
		return json
	})
    })
};