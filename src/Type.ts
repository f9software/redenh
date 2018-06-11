export interface ReducedValue {
    $type: string;
    $value: any;
}

export class Type<T> {
    private reducer: ((value: T) => ReducedValue) | undefined;

    private enhancer: ((value: ReducedValue) => T) | undefined;

    constructor(private matcher: (value: T) => boolean, reducer?: (value: T) => ReducedValue, enhancer?: (value: ReducedValue) => T) {
        if (reducer) {
            this.setReducer(reducer);
        }

        if (enhancer) {
            this.setEnhancer(enhancer);
        }
    }

    setReducer(reducer: (value: T) => ReducedValue) {
        this.reducer = reducer;
    }

    setEnhancer(enhancer: (value: ReducedValue) => T) {
        this.enhancer = enhancer;
    }

    reduce(value: T): ReducedValue {
        if (this.reducer) {
            return this.reducer(value);
        }

        throw 'Reducer is undefined.';
    }

    enhance(value: ReducedValue) : T {
        if (this.enhancer) {
            return this.enhancer(value);
        }

        throw 'Enhancer is undefined.';
    }

    match(value: T): boolean {
        return this.matcher(value);
    }
}
