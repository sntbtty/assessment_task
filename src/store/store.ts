import { writable } from 'svelte/store';

export const currency = writable('');
export const countries = writable([]);
export const rate = writable(1);

type FormattedCountries = {
    code: string,
    emoji: string,
    name: string,
    currency: string
}

type Country = {
    value: string,
    label: string
}

export function setCountries(countriesList) {
    const formattedCountries: FormattedCountries[] = Object.values(countriesList).map((item) => ({
        code: item.code,
        emoji: item.emoji,
        name: item.name,
        currency: item.currency,
    }))
    countries.set(formattedCountries);
}

export function setCurrency(country: Country) {
    currency.set(country.value);
}

export function setRate(value: number) {
    rate.set(value);
}

