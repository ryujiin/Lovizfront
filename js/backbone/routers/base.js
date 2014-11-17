Loviz.Routers.Base = Backbone.Router.extend({
	routes : {
		"" : "root",
		'carro/':'carro',
		'carro/pagar/':'pagar',
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
		}else{
			window.views.carro.agre_linea();
		}
	},
	pagar:function () {
		if (window.models.carro.toJSON().id!==undefined) {
		}else{
			this.navigate('/', {trigger:true});			
		}
	}
})