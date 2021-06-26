import fetch from "node-fetch"
export function record(){
    fetch('http://192.168.1.105:3000/api/record', {
	method: 'POST',
    }).then(res=>{
	console.log(res)
    });
};

export function stopRecord(){
    fetch('http://192.168.1.105:3000/api/stop', {
	method: 'POST',
    }).then(res=>{
	console.log(res)
    });
};
