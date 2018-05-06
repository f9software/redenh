import 'jasmine';
import {enhance, reduce} from '../index';

describe('Basic usage', () => {

    it('Basic', () => {
        // string
        expect(reduce('1', 'string')).toEqual({$type: 'string', $value: '1'});
        expect(reduce('1')).toEqual({$type: 'string', $value: '1'});

        class A {
            toString() {
                return 'This is A';
            }
        }
        expect(reduce(new A(), 'string')).toEqual({$type: 'string', $value: 'This is A'});


        // number
        expect(reduce(1, 'number')).toEqual({$type: 'number', $value: 1});
        expect(reduce('-1', 'number')).toEqual({$type: 'number', $value: -1});
        expect(reduce(111)).toEqual({$type: 'number', $value: 111});
        expect(enhance({$type: 'number', $value: -1})).toEqual(-1);


        // boolean
        expect(reduce(true, 'boolean')).toEqual({$type: 'boolean', $value: true});
        expect(reduce(false, 'boolean')).toEqual({$type: 'boolean', $value: false});
        expect(reduce(true)).toEqual({$type: 'boolean', $value: true});

        expect(enhance({$type: 'boolean', $value: true})).toEqual(true);
        expect(enhance({$type: 'boolean', $value: false})).toEqual(false);


        // date
        const d = new Date();
        const ts = d.getTime();
        expect(reduce(d, 'date')).toEqual({$type: 'date', $value: ts});
        expect(reduce(d)).toEqual({$type: 'date', $value: ts});

        expect(enhance({$type: 'date', $value: ts})).toEqual(d);
    })

});
