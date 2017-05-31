import { Injectable, Inject } from '@angular/core';
import { TRANSLATIONS } from './translations';

@Injectable()
export class TranslateService {

    private _currentLang;

    constructor(@Inject(TRANSLATIONS) private _translations) { }

    currentLang(){
        return this._currentLang;
    }

    use(lang){
        this._currentLang = lang;
    }

    translate(key) {
        let translations = key;
        if(this._translations[this._currentLang] && this._translations[this._currentLang][key]){
            return this._translations[this._currentLang][key];
        }
        return translations;
    }

    instant(key) {
        return this.translate(key);
    }
}
