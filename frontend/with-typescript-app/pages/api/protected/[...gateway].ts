import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';
import { getSession } from "next-auth/react"
import {serviceMap} from "../../../serviceConfiguration";

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }
            return resolve(result)
        })
    })
}


export const config = {
    api: {
        bodyParser: false,
    },
}

const getService = (route:string): { server: string, name: string } => {
    for (let serviceName in serviceMap) {
        const service = serviceMap[serviceName]
        if (route === service.name) {
            return service;
        }
    }
}

export default async function handler(req, res) {
    const session = await getSession({ req })
    /* check if route is allowed  */
    const url = req.url.replace('/api/protected', '');

    const servicePath = url.split('/')[1];
    const service = getService(servicePath);

    // protected routes but with session attached it's fine
    if (session) {
        const addSession = (proxyReq, req, res) => {
            // add user to header
            // @ts-ignore
            proxyReq.setHeader('x-auth', session.userId);
        }

        return await runMiddleware(req, res, createProxyMiddleware({
                target: service.server,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/protected' : ''
                },
                onProxyReq: addSession,
            }
        ));
    }

    // ! internal security flags should be only allowed by gateway
    const removeInternalFlags = (proxyReq, req, res) => {
        proxyReq.removeHeader('x-auth');
    }
    // routes without protection
    return await runMiddleware(req, res, createProxyMiddleware({
            target: service.server,
            changeOrigin: true,
            pathRewrite: {
                '^/api/protected' : ''
            },
            onProxyReq: removeInternalFlags,
        }
    ));
}
