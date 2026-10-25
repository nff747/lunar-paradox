import {isIP} from 'node:net';
// Only Vercel's overwritten header is trusted inside its own runtime. Direct
// Node/loopback deployments must use the actual peer, never caller headers.
export function clientAddress(req, env=process.env){
 const peer=req.socket?.remoteAddress||'unknown';
 if(env.VERCEL!=='1')return peer;
 const value=req.headers['x-vercel-forwarded-for'];
 if(typeof value==='string'&&isIP(value.trim()))return value.trim();
 return peer;
}
