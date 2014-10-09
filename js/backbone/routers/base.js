Loviz.Routers.Base = Backbone.Router.extend({
	routes : {
		"" : "root",
		"tienda" : "tiendaCatalogo",
	},
	initialize : function () {
		this.root();
  	},
	root : function () {
		console.log("Estamos en el root de nuesta applicacion");

		window.app.state = "root";
		window.app.categoria = null;
	},
	tiendaCatalogo: function(){
		console.log('esta en la tienda');

		window.app.state = "tienda";
		window.app.categoria = null;
	}
});