export interface ReducedValue {
    $type: string;
    $value: any;
}

export class Type<T> {
    private reducer: (value: T) => ReducedValue;

    private enhancer: (value: ReducedValue) => T;

    constructor(private matcher: (value: T) => boolean, reducer: (value: T) => ReducedValue = null, enhancer: (value: ReducedValue) => T = null) {
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
        return this.reducer(value);
    }

    enhance(value: ReducedValue) : T {
        return this.enhancer(value);
    }

    match(value: T): boolean {
        return this.matcher(value);
    }
}
