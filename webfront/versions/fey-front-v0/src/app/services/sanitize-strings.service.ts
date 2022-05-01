import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SanitizeStringsService {
  // This service is for temporary input Sanitization.
  // Will Eventually be replaced with form validators, but will work temporarily.
  constructor() { }

  sanitize(string: string){
    // Removes characters that might be used for to create JSON, sql injection attacks etc
    if(string){
      return string.replaceAll(/[\<\>{}\-\=;\:]+/g,'')
    }
    return undefined
  }
}
