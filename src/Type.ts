export class Type<T> {
    private reducer: (value: T) => string | number;

    private enhancer: (value: string | number) => T;

    constructor(reducer: (value: T) => (string | number) = null, enhancer: (value: string | number) => T = null) {
        if (reducer) {
            this.setReducer(reducer);
        }

        if (enhancer) {
            this.setEnhancer(enhancer);
        }
    }

    setReducer(reducer: (value: T) => string | number) {
        this.reducer = reducer;
    }

    setEnhancer(enhancer: (value: string | number) => T) {
        this.enhancer = enhancer;
    }

    reduce(value: T): string | number {
        return this.reducer(value);
    }

    enhance(value: string | number) : T {
        return this.enhancer(value);
    }
}
