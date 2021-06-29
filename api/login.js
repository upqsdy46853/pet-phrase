import { query } from "express";
import fetch from "node-fetch"
const postBaseUrl = 'http://localhost:3000/api';
export function correct(username,password){
    let url = `${postBaseUrl}/correct`;
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

export function exist(username){
    let url = `${postBaseUrl}/exist?username=${username}`;
    return fetch(url, {
        method: 'GET',
    }).then(res=>{
        return res.json().then(json=>{
            return json
        })
    });
};

export function signup(username,password){
    let url = `${postBaseUrl}/signup`;
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