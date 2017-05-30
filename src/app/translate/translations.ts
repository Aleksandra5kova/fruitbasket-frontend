import { OpaqueToken } from '@angular/core';

import { LANG_EN_NAME, LANG_EN_TRANS } from './lang-en';
import { LANG_MK_NAME, LANG_MK_TRANS } from './lang-mk';

export const TRANSLATIONS = new OpaqueToken('translations');

export const dictionary = {
    [LANG_EN_NAME]: LANG_EN_TRANS,
    [LANG_MK_NAME]: LANG_MK_TRANS
};

export const TRANSLATION_PROVIDERS = [
    { provide: TRANSLATIONS, useValue: dictionary }
];
