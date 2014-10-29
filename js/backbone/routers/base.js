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
		window.app.state = "inicio";
		//borrar el resto de contenidos
		this.preloader('Loviz DelCarpio');

		this.cargarSliderHome();

		this.mostrarcapas();
	},
	tiendaCatalogo: function(){
		console.log('esta en la tienda');

		window.app.state = "tienda";

		//Aparece el PreCargador
		this.preloader('Tienda');
		//Carga productos
		this.cargarProductos();
		//Se muestra el Div
		this.mostrarcapas();

	},
	singleProducto:function(slug,id){
		var producto_modelo,buscar,producto_views;

		window.app.state="producto_single";

		//Aparece el PreCargador
		this.preloader('Cargando Producto');
		
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
		//Se muestra el Div
		this.mostrarcapas();
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
			window.views.lista_productos.cargaCompleta();

		});
	},
	cargarSliderHome : function(){
		var modelo,slider_view;
		slider_view = new Loviz.Views.HomeSlider({
			model: new Loviz.Models.SliderHome(),
		});
	},
	mostrarcapas:function(){
		var div=$('#'+window.app.state);
		//Volverlo todo invisble;
		$('.invisible').hide();
		//mostrar div que se necesita
		div.show();

		if (window.app.state !=='tienda') {
			if (window.views.lista_productos) {
				window.views.lista_productos.$el.empty();
			};
		};
		//Poner activo el navegador
		$('header .menu-principal li').each(function(ind,elem){
			var li = $(elem).data("url")
			if (li === window.app.state) {
				$(elem).addClass('activo')
			};
		});
	},
	preloader:function(title){
		//Verifica si esta la clase Loaded y si esta la borra
		if ($('body').hasClass('loaded')) {
			$('body').removeClass('loaded');
		};
		$.each(this.capas,function(ind,elem){			
			$('#'+elem).hide('fast');
		});
		/*Crear modelo de loader*/
		p = new Loviz.Models.Loader({titulo:title});
		l = new Loviz.Views.Loader({model:p});
	},
	notFound:function(){
		debugger;
	},
});