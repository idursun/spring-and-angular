define(['angular'], function(angular) {
    var app = angular.module('services.TokenService', []);
    app.service('TokenStore', [function () {
        var token = "";
        return {
            get: function() {
                return token;
            },
            set: function(data) {
                token = data;
            }
        }
    }])

    app.provider('TokenService', ['$httpProvider', function ($httpProvider) {

        var loginUrl = "/login";
        var tokenUrl = "/oauth/token";
        var clientId = null, clientSecret = null;

        this.setLoginUrl = function (url) {
            loginUrl = url || "/login";
        }

        this.setTokenUrl = function (url) {
            tokenUrl = url || "/oauth/token";
        }

        this.loginRedirectHandler = angular.noop

        this.setClientDetails = function (id, secret) {
            clientId = id;
            clientSecret = secret;
        }

        $httpProvider.interceptors.push(['$q', '$injector', 'TokenStore', function ($q, $injector, TokenStore) {
            return {
                'request': function (config) {
                    console.log('inside request ' + clientId + ' ' + clientSecret )
                    if (TokenStore.get()) {
                        config.headers.Authorization = "Bearer " + TokenStore.get();
                    } else if (!!clientId && !!clientSecret) {
                        config.headers.Authorization = "Basic " + window.btoa(clientId + ":" + clientSecret);
                    }
                    console.log(config.headers.Authorization )
                    return config;
                },
                'responseError': function (response) {
                    if (response.status == 401 && loginRedirectHandler !== null) {
                        $injector.invoke(loginRedirectHandler)
                    }
                    return $q.reject(response);
                },
            }
        }]);

        this.$get = ['$q', '$http', function ($q, $http) {
            return {

                login: function (username, password) {
                    console.log("sending " + username)
                    var deferred = $q.defer();
                    $http({
                        method: 'POST',
                        url: tokenUrl,
                        data: {
                            "username": username,
                            "password": password
                        }
                    }).success(function (data, status, headers, config) {
                        deferred.resolve(data);
                    }).error(function (data, status, headers, config) {
                        deferred.reject(status);
                    });
                    return deferred.promise;
                }
            }
        }];
    }]);

})

