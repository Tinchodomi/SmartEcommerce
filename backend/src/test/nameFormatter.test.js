import Assert from 'assert'
import { nameFormatter } from '../utils/nameFormatter.js';

const assert = Assert.strict


describe('nameFormater', () => {
    it('Should format the name corrrectly', () => {
        const mockName = 'JUAN PEREZ'
        const formattedName = nameFormatter(mockName)
        assert.equal(formattedName,'Juan Perez')
    });
    
});
