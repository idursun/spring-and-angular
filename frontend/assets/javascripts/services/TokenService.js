define(['angular'], function(angular) {
    var app = angular.module('services.TokenService', []);
    app.service('TokenStore', ['$log', '$window', function ($log, $window) {
        var token = "";
        return {
            get: function() {
                return $window.sessionStorage.token;
            },
            set: function(data) {
                $window.sessionStorage.token = data;
            }
        }
    }])

    app.provider('TokenService', ['$httpProvider', function ($httpProvider) {

        var loginUrl = "/login";
        var tokenUrl = "/oauth/token";
        var clientId = null, clientSecret = null;
        var loginRedirectHandler = angular.noop

        this.setLoginUrl = function (url) {
            loginUrl = url || "/login";
        }

        this.setTokenUrl = function (url) {
            tokenUrl = url || "/oauth/token";
        }

        this.setLoginRedirectHandler = function (handler) {
            loginRedirectHandler = handler || angular.noop
        }

        this.setClientDetails = function (id, secret) {
            clientId = id;
            clientSecret = secret;
        }

        $httpProvider.interceptors.push(['$q', '$injector', '$log', 'TokenStore', function ($q, $injector, $log, TokenStore) {
            return {
                'request': function (config) {
                    if (TokenStore.get()) {
                        config.headers.Authorization = "Bearer " + TokenStore.get();
                    } else if (!!clientId && !!clientSecret) {
                        config.headers.Authorization = "Basic " + window.btoa(clientId + ":" + clientSecret);
                    }
                    return config;
                },
                'responseError': function (response) {

                    if (loginRedirectHandler && response.status == 401 ) {
                        $injector.invoke(loginRedirectHandler)
                    }

                    return $q.reject(response);
                },
            }
        }]);

        this.$get = ['$q', '$http', function ($q, $http) {
            return {

                login: function (username, password) {
                    var deferred = $q.defer();
                    $http({
                        method: 'POST',
                        url: tokenUrl,
                        data: "grant_type=password&username="+ encodeURIComponent(username) + "&password=" + encodeURIComponent(password),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
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

