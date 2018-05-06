import {ReducedValue, Type} from './src/Type';
export {Type, ReducedValue} from './src/Type';

const types: {[key: string]: Type<any>} = {
    string: new Type(
        value => typeof value === 'string',
        value => {
            return {
                $type: 'string',
                $value: value
            }
        },
        redValue => redValue.$value
    ),

    number: new Type(
        value => typeof value === 'number',
        value => {
            return {
                $type: 'number',
                $value: value
            }
        },
        redValue => redValue.$value
    ),

    boolean: new Type(
        value => typeof value === 'boolean',
        value => {
            return {
                $type: 'boolean',
                $value: value === true
            }
        },
        redValue => redValue.$value === true
    ),

    date: new Type(
        value => value.hasOwnProperty('now'),
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

export function findType(value: any): Type<any> {
    const typeNames: string[] = Object.keys(types);

    let type: Type<any> = null;

    if (typeNames.some((name: string) => (type = types[name]).match(value))) {
        return type;
    }
}

export function reduce<T>(value: T, typeName?: string): ReducedValue {
    let type: Type<T>;

    if (typeName) {
        type = types[typeName];
    }
    else {
        type = findType(value);
    }

    if (!type) {
        throw 'Could not identify a type for the specified value.';
    }

    return type.reduce(value);
}

export function enhance<T>(redValue: ReducedValue): T {
    return types[redValue.$type].enhance(redValue);
}
