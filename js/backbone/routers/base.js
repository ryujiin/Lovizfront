Loviz.Routers.Base = Backbone.Router.extend({
	routes : {
		"" : "root",
		"tienda/" : "tiendaCatalogo",
		"tienda" : "tiendaCatalogo",
	},
	initialize : function () {
		this.capas = ['productos','inicio','custom','sobre','blog','faq'];
  	},
	root : function () {
		console.log("Estamos en el root de nuesta applicacion");

		window.app.state = "inicio";
		window.app.categoria = null;
		//borrar el resto de contenidos
		this.escondercapas();

	},
	tiendaCatalogo: function(){
		console.log('esta en la tienda');

		window.app.state = "productos";
		window.app.categoria = null;
		this.cargarProductos();
		this.escondercapas();
		
	},
	cargarProductos:function(){
		this.productos = new Loviz.Collections.ProductosLista();
		this.vista_producto  = new Loviz.Views.ProductosLista({collection:this.productos});

		this.productos.fetch();
	},
	escondercapas:function(){
		$.each(this.capas,function(i,e){
			if (e===window.app.state) {				
				$('#'+e).show();
			}else{
				$('#'+e).hide();
			}
		});
	}
});