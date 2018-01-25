/**
 * @author: Hagamenon Nicolau <haganicolau@gmail.com>
 */
angular.module('oobjclient').service('isLogged', function($q,$cookies, $window){
	
	/*função responsável por confirmar se o token existe*/
	this.logged = function(){
		let xtoken = $cookies.get('x-token');
		let issued = $cookies.get('x-token-issued');
		
		/*Se token inválido envia para página de login*/
		if(!xtoken){
			$window.location.href = '/#/login';
		}

		/*verifica se a data é válida*/
		date = moment();
		let active_time = moment.utc(issued, 'YYYY-MM-DD[T]HH:mm[Z]');
		let current_time = moment.utc(date, 'YYYY-MM-DD[T]HH:mm[Z]');

		/*Se a data não for válida, retira o token e envia para página de login*/
		if(active_time.isAfter(current_time)){
			$cookies.remove('x-token');
			$cookies.remove('x-token-issued');
			$window.location.href = '/#/login';
		}
	}	
});