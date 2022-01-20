import { Request } from 'express'
import { decode, verify } from 'jsonwebtoken'
import { JwtPayload, Jwt } from '../interfaces'
import { config } from '../../config'
import Axios from 'axios'

export function getUserId(req: Request): string | undefined {
    const authorization = req.headers.authorization as string
    if(authorization){
        const split: string[] = authorization.split(/[ %]+/)
        const jwtToken = split[1]
        return parseUserId(jwtToken)
    }
}

export function parseUserId(jwtToken: string): string {
    const decodedJwt = decode(jwtToken) as JwtPayload
    
    return decodedJwt.sub
  }

export async function verifyToken(authHeader: string): Promise<JwtPayload> {
    const token = getToken(authHeader)
    const jwt: Jwt = decode(token, { complete: true }) as Jwt
    const rawCert: string = await matchToKey(jwt.header.kid)
    const cert = stringToPEM(rawCert)
    return verify(token, cert, { algorithms: ['RS256']}) as JwtPayload
  }
  
  function getToken(authHeader: string): string {
    if (!authHeader) throw new Error('No authentication header')
  
    if (!authHeader.toLowerCase().startsWith('bearer '))
      throw new Error('Invalid authentication header')
    const split = authHeader.split(' ')
    const token = split[1]
    return token
  }
  
  async function matchToKey(kid: any): Promise<string> {
    try{
      const actualKeys = await Axios.get(config.authUrl)
      const signerKey = actualKeys.data.keys.filter((key: { [x: string]: string }) => {key[kid] === kid})[0] || actualKeys.data.keys[0]
      const x5cKey: string = signerKey.x5c[0]
      if(!x5cKey){
        throw new Error(`Unable to Match any Keys. x5cKey not extracted.`)
      }
  
      return x5cKey
    }catch(e){
      return ''
    }
    
  }
  
  function stringToPEM(cert: string): string {
    // @ts-ignore: Object is possibly 'null'
    const newCert: string = cert.match(/.{1,64}/g).join('\n');
    cert = `-----BEGIN CERTIFICATE-----\n${newCert}\n-----END CERTIFICATE-----\n`;
    return cert;
  }