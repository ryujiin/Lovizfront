Loviz.Routers.Base = Backbone.Router.extend({
	routes : {
		"" : "root",
		'carro/':'carro',
		'carro/pagar/':'pagar',
		'ingresar/':'ingresar',
		'perfil/':'perfil',
		'*notFound': 'notFound',
	},
	initialize : function () {
  	},
	root : function () {
		window.app.state = "inicio";
	},
	notFound:function () {
		console.log('no hay pagina')
	},
	carro:function () {
		if (window.views.carro===undefined) {
			window.views.carro = new Loviz.Views.Carro({
				collection: window.collections.lineas,
			});	
		}
	},
	pagar:function () {
		if (window.models.carro.toJSON().id!==undefined) {
		}else{
			this.navigate('/', {trigger:true});			
		}
	},
	ingresar:function () {
		var token = $.sessionStorage.get('token_login')
		if (token) {
			this.navigate('/perfil/', {trigger:true});	
		}else{
			if (window.views.login===undefined) {
				window.views.login = new Loviz.Views.Login();
			};
		}
	},
	perfil:function () {
		var token = $.sessionStorage.get('token_login')		
		if (token) {
			console.log('estamos en el perfil')
		}else{
			this.navigate('/', {trigger:true});	
		}
	}
})