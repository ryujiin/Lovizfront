Loviz.Routers.Catalogo = Backbone.Router.extend({
	routes : {
		"catalogo/" : "catalogo",
		"producto/:slug" : 'producto_single',
	},
	initialize : function () {
  	},
	catalogo : function () {
		console.log('estamos en el catalogo ');
		this.crear_catalogo();
	},
	crear_catalogo:function () {
		var coleccion = new Loviz.Collections.Catalogo();
		var catalogo = new Loviz.Views.Catalogo({
			collection: coleccion,
		});
		coleccion.fetch();
	},
	producto_single:function () {

	}
})