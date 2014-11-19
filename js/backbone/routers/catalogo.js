Loviz.Routers.Catalogo = Backbone.Router.extend({
	routes : {
		"catalogo/" : "catalogo",
		"producto/:slug/:id/" : 'producto_single',
	},
	initialize : function () {
  	},
	catalogo : function () {
		console.log('estamos en el catalogo ');
		window.views.catalogo_contenedor.collection.fetch();
	},
	crear_catalogo:function () {
	},
	producto_single:function (slug,id) {
		debugger;
		var modelo = new Loviz.Models.Producto({id:id});
		modelo.fetch().done(function () {
			if (window.views.producto_single) {
				var json = modelo.toJSON();
				window.views.producto_single.model.set(json);
			}else{
				window.views.producto_single = new Loviz.Views.ProductoSingle({
					model:modelo,
				});	
			}			
		});
	},
})