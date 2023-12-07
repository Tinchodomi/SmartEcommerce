import chai from 'chai'
import { nameFormatter } from '../utils/nameFormatter.js';


const expect = chai.expect

describe('nameFormater', () => {
    it('Should format the name corrrectly', () => {
        const expectedName = 'Juan Perez'
        const mockName = 'JUAN PEREZ'
        const formattedName = nameFormatter(mockName)
        expect(formattedName).to.equal(expectedName)
    });
    
});





