import { languageEn } from "./en";


class Language {
    public language: any = {}

    constructor() {
        this.language = languageEn
    }
}


const aweLanguage = new Language()

export const useLanguage = aweLanguage.language
