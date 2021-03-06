import { query } from "express";
import fetch from "node-fetch"
const postBaseUrl = 'http://localhost:3000/api';
export function list(username){
    let url = `${postBaseUrl}/record`;
    let query = [];
    query.push(`username=${username}`)
    if (query.length) url += '?' + query.join('&');

    return fetch(url, {
	method: 'GET',
    }).then(res=>{
        return res.json().then(json=>{
            return json
        })
    });
};
export function record(username,c_text){
    let url = `${postBaseUrl}/record`;
    return fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            username: username,
            c_text: c_text 
        })
    })
};
export function revise(id, e_text){
    let url = `${postBaseUrl}/revise/`;
    url += `${id}/${e_text}`
    return fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
}

export function remove(id){
    let url = `${postBaseUrl}/delete/${id}`;
    return fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    }) .then(res=>{
        console.log(res)
    })
}