export interface ReducedValue {
    $type: string;
    $value: any;

    [key: string]: any;
}

export class Type<T, K extends ReducedValue> {
    private reducer: ((value: T) => K) | undefined;

    private enhancer: ((value: K) => T) | undefined;

    constructor(private matcher: (value: T) => boolean, reducer?: (value: T) => K, enhancer?: (value: K) => T) {
        if (reducer) {
            this.setReducer(reducer);
        }

        if (enhancer) {
            this.setEnhancer(enhancer);
        }
    }

    setReducer(reducer: (value: T) => K) {
        this.reducer = reducer;
    }

    setEnhancer(enhancer: (value: K) => T) {
        this.enhancer = enhancer;
    }

    reduce(value: T): K {
        if (this.reducer) {
            return this.reducer(value);
        }

        throw 'Reducer is undefined.';
    }

    enhance(value: K) : T {
        if (this.enhancer) {
            return this.enhancer(value);
        }

        throw 'Enhancer is undefined.';
    }

    match(value: T): boolean {
        return this.matcher(value);
    }
}
