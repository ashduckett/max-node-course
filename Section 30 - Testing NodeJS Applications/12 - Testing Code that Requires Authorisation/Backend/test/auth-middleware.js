const expect = require('chai').expect;
const jwt = require('jsonwebtoken');
const sinon = require('sinon');

const authMiddleware = require('../middleware/is-auth');


describe('Auth middleware', function() {
    
    // Throws the error in the first if-check. This is the first test we wrote.
    it('should throw an error if no authorization header is present', function() {
        const req = {
            get: function() {
                return null;
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw('Not authenticated.');
    });
    
    // Error thrown from the verify method. The token cannot be split and gets undefined.
    // What this doesn't verify is where the error was thrown.
    it('should throw an error if the authorization header is only one string', function() {
        const req = {
            get: function() {
                return 'xyz';
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
    });

    // Here I think this jwt malformed error is thrown on the verify method.
    // Now it's not throwing because it doesn't have a token but because it's a bad token.
    it('should throw an error if the token cannot be verified', function() {
        const req = {
            get: function() {
                return 'Bearer xyz';
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
    });

    // Here we use a stup to ensure that the verify method succeeds and
    // returns a userId which is then internally added to the request.
    it('should yield a userId after decoding the token', function() {
        const req = {
            get: function() {
                return 'Bearer dsfoihdsgiohjdgdfg';
            }
        };

        // Our own stub. Replaces function entirely and could break other tests that rely on the verify method so
        // jwt.verify = function() {
        //     return { userId: 'abc' };
        // };

        sinon.stub(jwt, 'verify');
        jwt.verify.returns({ userId: 'abc' });

        authMiddleware(req, {}, () => {});
        expect(req).to.have.property('userId');
        expect(req).to.have.property('userId', 'abc');
        expect(jwt.verify.called).to.be.true;
        jwt.verify.restore();
    });
});

