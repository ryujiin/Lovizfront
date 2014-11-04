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
	
  	},
	root : function () {
		window.app.state = "inicio";
		this.ocultar_todo();

		//borrar el resto de contenidos
		this.preloader('Loviz DelCarpio');

		if (window.views.home) {
			window.views.home.aparecer();
		}else{
			window.views.home=this.cargarSliderHome()
			window.views.home.aparecer();
		}
	},
	tiendaCatalogo: function(){

		console.log('esta en la tienda');

		window.app.state = "tienda";
		this.ocultar_todo();

		//Aparece el PreCargador
		this.preloader('Tienda');
		//Carga productos
		this.cargarProductos();
		$('#tienda').show()
	},
	singleProducto:function(slug,id){
		window.app.state="producto_single";

		this.ocultar_todo();

		var self = this;
		var modeloJSON,buscar;


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
		if (window.views.lista_productos) {
			window.views.tienda.pagina_cargada();
		}else{
			this.productos_Collection = new Loviz.Collections.ProductoLista();
			this.productos_Vista  = new Loviz.Views.ProductosLista({collection:this.productos_Collection});

			window.collections.lista_productos = this.productos_Collection;
			window.views.lista_productos = this.productos_Vista;
			var buscar = this.productos_Collection.fetch();
		
			buscar.done(function(){
				window.views.lista_productos.primeraCarga();
				window.views.lista_productos.aparecer();
			});
		}
	},
	cargarSliderHome : function(){
		var modelo,slider_view;
		slider_view = new Loviz.Views.HomeSlider({
			model: new Loviz.Models.SliderHome(),
		});
		return slider_view
	},
	preloader:function(title){
		//Verifica si esta la clase Loaded y si esta la borra
		if ($('body').hasClass('loaded')) {
			$('body').removeClass('loaded');
		};
		/*Crear modelo de loader*/
		p = new Loviz.Models.Loader({titulo:title});
		l = new Loviz.Views.Loader({model:p});
	},
	notFound:function(){
		console.log('No se encontro la pagina')
		debugger;
	},
	ocultar_todo:function(){
		$.each(this.capas,function(ind,elem){
			if (elem===window.app.state) {
				$('#'+elem).show('fast');	
			}else{
				$('#'+elem).hide('fast');
			}
		});
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
		window.app.state = 'usuario'
		window.views.tienda.desplegar_overlay();


		if (window.views.perfil) {

		}else{
			var model_perfil,vista_perfil;

			model_perfil = new Loviz.Models.Perfil();

			vista_perfil = new Loviz.Views.Perfil({
				model:model_perfil
			});
			window.views.perfil=vista_perfil;
		}
		
	}
});