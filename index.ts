import {ReducedValue, Type} from './src/Type';
export {Type, ReducedValue} from './src/Type';

const types: {[key: string]: Type<any>} = {
    string: new Type(
        value => typeof value === 'string',
        value => {
            return {
                $type: 'string',
                $value: value + ''
            }
        },
        redValue => redValue.$value
    ),

    number: new Type(
        value => typeof value === 'number',
        value => {
            return {
                $type: 'number',
                $value: value * 1
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
        value => typeof value.getTime === 'function',
        (date: Date) => {
            return {
                $type: 'date',
                $value: date.getTime()
            }
        },
        redValue => new Date(<number> redValue.$value)
    ),

    array: new Type(
        value => typeof value.splice === 'function',
        (value: any[]) => {
            return {
                $type: 'array',
                $value: value.map(item => reduce(item))
            }
        },
        (redValue): any[] => {
             return (<ReducedValue[]> redValue.$value).map(redValueItem => enhance(redValueItem));
        }
    ),

    map: new Type(
        value => typeof value === 'object' && value.constructor === Object,
        (value: {[key: string]: any}) => {
            const keys = Object.keys(value);
            const reducedValues = keys.map(key => reduce(value[key]));
            const out: {[key: string]: ReducedValue} = {};

            keys.forEach((key, index) => out[key] = reducedValues[index]);

            return {
                $type: 'map',
                $value: out
            };
        },
        (redValue: ReducedValue) => {
            const keys = Object.keys(redValue.$value);
            const out: {[key: string]: any} = {};

            keys.forEach(key => out[key] = enhance(redValue.$value[key]));

            return out;
        }
    )
};

export function register(type: Type<any>, name: string) {
    types[name] = type;
}

export function unregister(name: string) {
    if (types.hasOwnProperty(name)) {
        delete types[name];
    }
}

export function findType(value: any): Type<any> | undefined {
    const typeNames: string[] = Object.keys(types);
    let typeName: string | undefined = typeNames.find(typeName => types[typeName].match(value));

    if (typeName) {
        return types[typeName];
    }
}

export function reduce<T>(value: T, typeName?: string): ReducedValue {
    let type: Type<T> | undefined;

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
