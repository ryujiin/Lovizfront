Loviz.Routers.Base = Backbone.Router.extend({
	routes : {
		"" : "root",
		"tienda/" : "tiendaCatalogo",
		"tienda" : "tiendaCatalogo",
		"tienda/:slug_:id/":"singleProducto",
		"custom/": "custom_Url",
		"mi_cuenta/": "perfil_user",

		'*notFound': 'notFound',
	},
	initialize : function () {
		this.capas = ['tienda','inicio','custom','sobre','blog','faq','producto_single'];
		this.obt_galleta();
		//this.obt_carro();
  	},
	root : function () {
		window.app.state = "inicio";
		//borrar el resto de contenidos
		this.preloader('Loviz DelCarpio');

		this.cargarSliderHome();

		this.mostrarcapas();
		$('#inicio').show();
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
		var self = this;
		var modeloJSON,buscar;

		window.app.state="producto_single";

		this.preloader('Cargando Producto');

		//Verifica exitencia de producto
		self.producto_modelo = new Loviz.Models.Producto_Single({id:id});
	
		buscar = self.producto_modelo.fetch();
		buscar.done(function () {
			if (self.producto_views) {
				modeloJSON = self.producto_modelo.toJSON();
				self.producto_views.model.set(modeloJSON);
			}else{
				self.producto_views = new Loviz.Views.ProductoSingle({
					model:self.producto_modelo,
				});
				self.producto_views.render();	
			}			
		})
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
		console.log('No se encontro la pagina')
		debugger;
	},
	obt_galleta : function(){
		galleta = $.cookie('carrito');
		if (galleta==null) {
			console.log('veamos');
			var session = getRandomChar();
			$.cookie('carrito',session,{ expires: 7, path: '/'});
			galleta = session;
		};
		function getRandomChar() {
			numCara = 50
			chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
			pass ='';
			for (i=0;i<numCara;i++) {
				x = Math.floor(Math.random()*62);
				pass+=chars.charAt(x);
			};
			return pass
		};
	},
	obt_carro: function () {
		if (window.views.carro) {
			
		}else{

		}
		/*
		var self = this,carros,carro,modelo,busq_carro,vistacarro;
      	carro = new Loviz.Models.Carro();
      	carros = new Loviz.Collections.Carros();
      	busq_carro = carros.fetch();
      	busq_carro.done(function(){
      		if (carros.length==0) {
      			carro.set('sesion_carro',galleta);
				carro.set('estado','Abierto');
				carro.set('propietario','');
				carro.save();
      		}else{
      			carro = carros.first();
      		};
      		vistacarro = new Loviz.Views.Carro({model:carro});
      		window.views.carro = vistacarro;
      		self.buscaLineas();
      	});
*/
	},
	perfil_user:function(){

	}
});