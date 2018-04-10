import 'jasmine';
import {enhance, reduce} from '../index';

describe('Basic usage', () => {

    it('Basic', () => {
        // string
        expect(reduce('1', 'string')).toBe('1');
        expect(reduce(1, 'string')).toBe('1');
        expect(reduce(true, 'string')).toBe('true');

        class A {
            toString() {
                return 'This is A';
            }
        }
        expect(reduce(new A(), 'string')).toBe('This is A');


        // number
        expect(reduce(1, 'number')).toBe(1);
        expect(reduce('-1', 'number')).toBe(-1);
        expect(enhance(-1, 'number')).toBe(-1);
        expect(reduce('111', 'number')).toBe(111);


        // boolean
        expect(reduce(true, 'boolean')).toBe(1);
        expect(reduce(false, 'boolean')).toBe(0);
        expect(enhance(1, 'boolean')).toBe(true);
        expect(enhance(0, 'boolean')).toBe(false);
        expect(enhance(-1, 'boolean')).toBe(false);
        expect(enhance(2, 'boolean')).toBe(false);


        // date
        const d = new Date();
        const iso = d.toISOString();
        const ts = d.getTime();
        expect(reduce(d, 'dateiso')).toBe(iso);
        expect(reduce(d, 'datets')).toBe(ts);

        const d2 = enhance<Date>(iso, 'dateiso')
        expect(d2.toISOString()).toBe(iso);

        const d3 = enhance<Date>(ts, 'datets');
        expect(d3.getTime()).toBe(ts);
    })

});
