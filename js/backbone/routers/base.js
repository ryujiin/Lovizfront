Loviz.Routers.Base = Backbone.Router.extend({
	routes : {
		"" : "root",
		"tienda/" : "tiendaCatalogo",
		"tienda" : "tiendaCatalogo",
		"tienda/:slug_:id/":"singleProducto",
		"custom/": "custom_Url",

		'*notFound': 'notFound',
	},
	initialize : function () {
		this.capas = ['tienda','inicio','custom','sobre','blog','faq','producto_single'];
  	},
	root : function () {
		console.log("Estamos en el root de nuesta applicacion");

		window.app.state = "inicio";
		//borrar el resto de contenidos
		this.preloader('Loviz DelCarpio');
	},
	tiendaCatalogo: function(){
		var filtro;
		console.log('esta en la tienda');

		window.app.state = "tienda";

		//Cargador cuando este listo
		this.preloader();
		this.cargarProductos();
		window.views.producto_filter = new Loviz.Views.Producto_filter();
	},
	notFound:function(){
		debugger;
	},	
	singleProducto:function(slug,id){
		var producto_modelo,buscar,producto_views;

		window.app.state="producto_single";
		this.escondercapas();
		$('header .menu li.tienda').addClass('activo');
		
		producto_modelo = new Loviz.Models.Producto_Single({id:id});
		
		if (window.views.productosingle==null) {
			buscar = producto_modelo.fetch();
			buscar.done(function(){
				producto_views = new Loviz.Views.ProductoSingle({
					model:producto_modelo,
				});
				producto_views.render();
			});
			window.views.productosingle = producto_views;
		};
	},
	custom_Url:function(){
		window.app.state = "custom";
		this.escondercapas();

	},
	cargarProductos:function(){
		var self = this;
		this.productos = new Loviz.Collections.ProductoLista();
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
			if (window.views.lista_productos) {
				window.views.lista_productos.$el.empty();
			};
		};
	},
	preloader:function(title){
		console.log(title);
		$.each(this.capas,function(ind,elem){			
			$('#'+elem).hide('fast');
		});
		/*Crear modelo de loader*/
		p = new Loviz.Models.Loader({titulo:title});
		l = new Loviz.Views.Loader({model:p});
	}
});