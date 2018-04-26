import {Type} from './src/Type';
export {Type} from './src/Type';

const datets = new Type((date: Date) => date.getTime(), ts => new Date(<number> ts));

const types: {[key: string]: Type<any>} = {
    'string': new Type(value => value + '', value => value),
    'number': new Type(value => value * 1, value => value),
    'boolean': new Type(value => value === true, value => value === true),
    'dateiso': new Type((date: Date) => date.toISOString(), isoString => new Date(<any> isoString)),
    'datets': datets,
    'date': datets
};

export function register(type: Type<any>, name: string) {
    types[name] = type;
}

export function unregister(name: string) {
    if (types.hasOwnProperty(name)) {
        types[name] = null;
    }
}

export function reduce<T>(value: T, type: string): string | number | boolean {
    return types[type].reduce(value);
}

export function enhance<T>(value: string | number | boolean, type: string): T {
    return types[type].enhance(value);
}
