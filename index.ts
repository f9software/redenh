import {Type} from "./src/Type";

const types: {[key: string]: Type<any>} = {
    'string': new Type(value => value + '', value => value),
    'number': new Type(value => value * 1, value => value),
    'boolean': new Type(value => value === true ? 1 : 0, value => value === 1),
    'dateiso': new Type(date => date.toISOString(), isoString => new Date(<any> isoString)),
    'datets': new Type(date => date.getTime(), ts => new Date(<number> ts))
};

export function register(type: Type<any>, name: string) {
    types[name] = type;
}

export function unregister(name: string) {
    if (types.hasOwnProperty(name)) {
        types[name] = null;
    }
}

export function reduce<T>(value: T, type: string): string | number {
    return types[type].reduce(value);
}

export function enhance<T>(value: string | number, type: string): T {
    return types[type].enhance(value);
}
