const expect = require('expect');
const { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        // store res in variable
        // assert from match
        const from = 'Pam';
        // assert from text match
        const text = 'Some message';
        // assert createdAt is number
        const message = generateMessage(from, text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from, text });
    })
})