angular.module('oobjclient').service('isLogged', function($q,$cookies, $window){
	
	this.logged = function(){
		let xtoken = $cookies.get('x-token');
		let issued = $cookies.get('x-token-issued');
		
		if(!xtoken){
			$window.location.href = '/#/login';
		}

		date = moment();
		let active_time = moment.utc(issued, 'YYYY-MM-DD[T]HH:mm[Z]');
		let current_time = moment.utc(date, 'YYYY-MM-DD[T]HH:mm[Z]');

		if(active_time.isAfter(current_time)){
			$cookies.remove('x-token');
			$cookies.remove('x-token-issued');
			$window.location.href = '/#/login';
		}
	}	
});