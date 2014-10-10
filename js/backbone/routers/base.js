Loviz.Routers.Base = Backbone.Router.extend({
	routes : {
		"" : "root",
		"tienda/" : "tiendaCatalogo",
		"tienda" : "tiendaCatalogo",
	},
	initialize : function () {
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
		this.cargarProductos();
	},
	cargarProductos:function(){
		this.productos = new Loviz.Collections.ProductosLista();
		this.vista_producto  = new Loviz.Views.ProductoLista({collection:this.productos});

		debugger;
	}
});