var app = angular.module('angularApp',[]);


app .config(function ($locationProvider){
    $locationProvider.html5Mode(true).hashPrefix('!');
});

app.controller('TwitterController',function($scope,$http,$timeout){

        load_tweets();
        function load_tweets(){
        $http.get('/get_tweets').success(function(data){
            var stopped;
            var idx = 0;
            countdown();
             function countdown() {
                if(idx>=data.length)
                    idx=0;
                stopped = $timeout(function() {
                    $scope.counter = data[idx++].Message;
                    console.log($scope.counter);
                    countdown();
                }, 5000);
            };

        });
    };

});

app.controller('AdminRecipeController',function($scope,$http,$interval){
    load_recipes();

    function load_recipes(){
        $http.get('/get_recipes').success(function(data){
            $scope.recipes=data;
        });
    };
});

app.controller('AdminUserController',function($scope,$http,$interval){
    load_recipes();

    function load_recipes(){
        $http.get('/get_users').success(function(data){
            $scope.users=data;
        });
    };
});

app.controller('TrendingRecipeController',function($scope,$http,$interval){
    load_fav_recipes();

    function load_fav_recipes(){
        console.log("Check1");
        $http.get('/get_mostfav_recipes').success(function(data){
            $scope.favdata=data;
        });
    };
});

app.controller('signInController', function($scope, $location, $http, $window) {

    $scope.Authenticate = function() {
        var request = $http.get('/validate/'+$scope.user+'&'+$scope.password);
        request.success(function (data) {
            console.log("Back again in signUp Controller");
            $scope.answer=data;
           if(data[0].IsAdmin==1)
            {

                //$location.path('/admin');
                //$location.replace();
                $window.location.href="/admin_recipe";
            }
            else
               $window.location.href="/user/"+$scope.user;
        });
        request.error(function (data) {
            console.log('Error: ' + data);
        });
    };

});

app.controller('signUpController', function($scope, $location, $http, $window) {

    $scope.AddUser = function() {
        var request = $http.get('/insertUser/'+$scope.username+'&'+$scope.password+'&'+$scope.login+'&'+$scope.email);
        request.success(function (data) {
            $window.location.href="/signIn";
        });
        request.error(function (data) {
            console.log('Error: ' + data);
        });
    };
});

app.controller('searchController', function($scope, $http) {
    $scope.modes = ["Keyword", "Category", "Ingredient"];


    $scope.AllRecipes = function () {
        console.log("Inside recipes-app");
        var request = $http.get('/get_recipe');
        request.success(function (data) {
            $scope.recipes = data;
        });
        request.error(function (data) {
            console.log('Error: ' + data);
        });

    };

    $scope.getCat = function()  {
        $scope.categories = [];
        var request = $http.get('/get_cat');
        request.success(function (data) {
            $scope.categories = data;
        });
        request.error(function (data) {
            console.log('Error: ' + data);
        });
    };

    $scope.updateResCat = function()  {
        $scope.cdata = [];
        var c = $scope.catMode['Category'];
        var request = $http.get('/searchByCat/'+c);
        request.success(function (data) {
            $scope.cdata = data;
        });
        request.error(function (data) {
            console.log('Error: ' + data);
        });
    };

    $scope.updateResKey = function()  {
        $scope.kdata = [];
        var request = $http.get('/searchByKey/' + $scope.key);
        request.success(function (data) {
            if (data.length!=0)
            {
                $scope.kdata = data;
                $scope.emptymsg = '';
            }
            else
            {
                $scope.emptymsg = 'Sorry! There are no matches.';
            }


        });
        request.error(function (data) {
            console.log('Error: ' + data);
        });
    };

    $scope.updateResIngr = function()  {
        $scope.idata = [];
        var request = $http.get('/searchByIngr/' + $scope.ingr1+'&'+$scope.ingr2+'&'+$scope.ingr3);
        request.success(function (data) {
            if (data.length!=0)
            {
                $scope.idata = data;
                $scope.emptymsg = '';
            }
            else
            {
                $scope.emptymsg = 'Sorry! There are no matches.';
            }
        });
        request.error(function (data) {
            console.log('Error: ' + data);
        });
    };

});

app.controller('addController', function($scope, $http) {
    $scope.getCat = function()  {
        $scope.categories = [];
        var request = $http.get('/get_cat');
        request.success(function (data) {
            $scope.categories = data;
        });
        request.error(function (data) {
            console.log('Error: ' + data);
        });
    };

    $scope.ingredients = [{qty:'q1', unit:'u1',ig: 'i1', note: 'n1'}, {qty:'q2', unit:'u2',ig: 'i2', note: 'n2'}];

    $scope.addNewIngr = function() {
        var newItemNo = $scope.ingredients.length+1;
        $scope.ingredients.push({'qty':'q'+newItemNo, 'unit':'u'+newItemNo, 'ig':'i'+newItemNo, 'note':'n'+newItemNo });
    };

    $scope.removeIngr = function() {
        var lastItem = $scope.ingredients.length-1;
        $scope.ingredients.splice(lastItem);
    };

});
