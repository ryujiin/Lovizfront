Loviz.Routers.Base = Backbone.Router.extend({
	routes : {
		"" : "root",
		"tienda/" : "tiendaCatalogo",
		"tienda" : "tiendaCatalogo",
		"custom/": "custom_Url",
	},
	initialize : function () {
		this.capas = ['tienda','inicio','custom','sobre','blog','faq'];
  	},
	root : function () {
		console.log("Estamos en el root de nuesta applicacion");

		window.app.state = "inicio";
		//borrar el resto de contenidos
		this.escondercapas();

	},
	tiendaCatalogo: function(){
		console.log('esta en la tienda');

		window.app.state = "tienda";

		this.cargarProductos();
	},
	custom_Url:function(){
		window.app.state = "custom";
		this.escondercapas();

	},
	cargarProductos:function(){
		var self = this;
		this.productos = new Loviz.Collections.ProductosLista();
		this.vista_producto  = new Loviz.Views.ProductosLista({collection:this.productos});

		window.collections.lista_productos = this.productos;
		window.views.lista_productos = this.vista_producto;

		var buscar = this.productos.fetch();
		buscar.done(function(){
			self.escondercapas();
		});
	},
	escondercapas:function(){
		$.each(this.capas,function(ind,elem){
			if (elem===window.app.state) {				
				$('#'+elem).fadeIn('slow');
			}else{
				$('#'+elem).fadeOut( "slow" );
			}
		});
		//Colocar clases Del Menu
		$('header .menu li').each(function(ind,elem){
			var li = $(elem).data("url")
			if (li === window.app.state) {
				$(elem).addClass('activo')
			};
		});
		if (window.app.state !=='tienda') {
			window.views.lista_productos.$el.empty();
		};
	}
});