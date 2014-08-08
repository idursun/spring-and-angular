define(['angular', 'angularMocks', 'services'], function(angular) {

    describe('TokenService', function () {

        var httpBackend, Token;
        var config = {
            'baseUrl': 'http://localhost/api',
            'tokenUrl': '/token',
            'loginUrl': '/login',
            'clientId': 'uganda',
            'clientSecret': 'secret'
        }

        beforeEach(angular.mock.module('services.TokenService', function(TokenServiceProvider) {
            TokenServiceProvider.setTokenUrl(config.tokenUrl);
            TokenServiceProvider.setLoginUrl(config.loginUrl);
            TokenServiceProvider.setClientDetails(config.clientId, config.clientSecret);
        }));

        beforeEach(function () {
            module(function($provide) {
                $provide.value('RestConfig', config)
            })

            inject(function (_$httpBackend_, _TokenService_) {
                httpBackend = _$httpBackend_;
                Token = _TokenService_;
            })
        })

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        })

        it('should add basic authentication header if client details are set', inject(function () {
            var username = "user1";
            var password = "pass1";

            httpBackend.expectPOST(config.tokenUrl, undefined, function(headers) {
                return headers['Authorization'] == 'Basic ' + window.btoa(config.clientId + ":" + config.clientSecret);
            }).respond(200);

            Token.login(username, password)

            httpBackend.flush()

        }))

        it('should return status code on error', inject(function () {

            httpBackend.expectPOST(config.tokenUrl, undefined, undefined).respond(401);

            Token.login("user1", "password").then(undefined, function (status) {
                expect(status).toEqual(401)
            })

            httpBackend.flush()

        }))

        it('should set token on success', inject(function () {
            var token = '"abc12345"';
            httpBackend.expectPOST(config.tokenUrl, undefined, undefined).respond(200, token);

            Token.login('user1', 'password').then(function(data) {
                expect(data).toEqual(token);
            });

            httpBackend.flush()

        }))

    })

})
