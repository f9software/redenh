import {ReducedValue, Type} from './src/Type';
export {Type, ReducedValue} from './src/Type';

const types: {[key: string]: Type<any>} = {

    string: new Type(
        value => {
            return {
                $type: 'string',
                $value: value + ''
            }
        },
        redValue => redValue.$value
    ),

    number: new Type(
        value => {
            return {
                $type: 'number',
                $value: value * 1
            }
        },
        redValue => redValue.$value
    ),

    boolean: new Type(
        value => {
            return {
                $type: 'boolean',
                $value: value === true
            }
        },
        redValue => redValue.$value === true
    ),

    dateiso: new Type(
        (date: Date) => {
            return {
                $type: 'dateiso',
                $value: date.toISOString()
            }
        },
        redValue => new Date(<any> redValue.$value)
    ),

    date: new Type(
        (date: Date) => {
            return {
                $type: 'date',
                $value: date.getTime()
            }
        },
        redValue => new Date(<number> redValue.$value)
    )
};

export function register(type: Type<any>, name: string) {
    types[name] = type;
}

export function unregister(name: string) {
    if (types.hasOwnProperty(name)) {
        types[name] = null;
    }
}

export function reduce<T>(value: T, type: string): ReducedValue {
    return types[type].reduce(value);
}

export function enhance<T>(redValue: ReducedValue): T {
    return types[redValue.$type].enhance(redValue);
}
