export class Type<T> {
    private reducer: (value: T) => string | number | boolean;

    private enhancer: (value: string | number | boolean) => T;

    constructor(reducer: (value: T) => (string | number | boolean) = null, enhancer: (value: string | number | boolean) => T = null) {
        if (reducer) {
            this.setReducer(reducer);
        }

        if (enhancer) {
            this.setEnhancer(enhancer);
        }
    }

    setReducer(reducer: (value: T) => string | number | boolean) {
        this.reducer = reducer;
    }

    setEnhancer(enhancer: (value: string | number | boolean) => T) {
        this.enhancer = enhancer;
    }

    reduce(value: T): string | number | boolean {
        return this.reducer(value);
    }

    enhance(value: string | number | boolean) : T {
        return this.enhancer(value);
    }
}
