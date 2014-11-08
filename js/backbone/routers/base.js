Loviz.Routers.Base = Backbone.Router.extend({
	routes : {
		"" : "root",
		"tienda/" : "tiendaCatalogo",
		"tienda" : "tiendaCatalogo",
		"tienda/:slug_:id/":"singleProducto",
		"custom/": "custom_Url",
		"mi_cuenta/": "perfil_user",
		"carrito/": "carrito",
		"carrito/pago/": "pago",

		'*notFound': 'notFound',
	},
	initialize : function () {
		this.obt_galleta();
		this.routesHit=0;
		window.app.page=false;
		Backbone.history.on('route', function() { this.routesHit++; }, this);
		//this.bind('route',this.paginaVista);
  	},
	root : function () {
		window.app.state = "inicio";
		//borrar el resto de contenidos
		if (window.views.home) {
			window.views.home.aparecer();
		}else{
			window.views.home=this.cargarSliderHome()
			window.views.home.aparecer();
		}
	},
	tiendaCatalogo: function(){
		window.app.page=false;

		console.log('esta en la tienda');

		window.app.state = "tienda";

		this.crear_catalogo();
		this.crear_producto_filter();
		$('#tienda').show()
	},
	crear_catalogo: function () {
		if (window.views.catalogo===undefined) {
			var coleccion = new Loviz.Collections.Catalogo();
			window.collections.catalogo = coleccion;
			window.views.catalogo = new Loviz.Views.Catalogo({collection:coleccion});
			coleccion.fetch();
		};
	},
	singleProducto:function(slug,id){
		window.app.page=false;
		window.app.state="producto_single"
		window.app.produto_id=id
		$('body').addClass('overflow');

		var self = this,modelo,vista;
		if (window.views.productos[id]===undefined) {
			if (window.collections.catalogo===undefined) {
				modelo = new Loviz.Models.Producto({id:id});
				modelo.fetch();
			}else{
				modelo = window.collections.catalogo.get(id);
			};
			vista = new Loviz.Views.ProductoSingle({model:modelo});
			vista.render();
			window.views.productos[id]=vista;
			modelo.fetch();
		}
	},
	crear_producto_filter:function (argument) {
		if (window.views.producto_filter===undefined) {
			var vista = new Loviz.Views.Producto_filter();
			window.views.producto_filter = vista;
		};
	},
	custom_Url:function(){
		window.app.page=false;
		window.app.state = "custom";

	},
	carrito:function(){
		window.app.state = 'carrito';
		window.app.page = true;

		if (window.views.carro) {
			if(window.views.lineas===undefined){
				this.crear_vistaLineas();
			}
			window.views.formu_envio = new Loviz.Views.Formu_envio();
		}
	},
	crear_vistaLineas:function () {
		var coleccion_lineas = new Loviz.Collections.Lineas();
		var carro = $.sessionStorage.get('carro_id');
		var vista_lineas = new Loviz.Views.Lineas({
			model:window.views.mini_carrito.model,
			collection:coleccion_lineas,
		});
		coleccion_lineas.fetch({
			data:$.param({carro:carro})
		}).done(function () {
			var num = coleccion_lineas.length
		});
		return vista_lineas;
	},
	cargarSliderHome : function(){
		var modelo,slider_view;
		slider_view = new Loviz.Views.HomeSlider({
			model: new Loviz.Models.SliderHome(),
		});
		return slider_view
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
	perfil_user:function(){
		window.app.state = 'usuario'
		window.app.page=true;

		if (window.views.perfil) {
			window.views.perfil.$el.show();
		}else{
			this.crear_perfil();
			window.views.perfil.$el.show();			
		}		
	},
	crear_perfil:function(){
		var model_perfil,vista_perfil;

		model_perfil = new Loviz.Models.Perfil();
		vista_perfil = new Loviz.Views.Perfil({
			model:model_perfil
		});
		window.views.perfil=vista_perfil;
	},
	back:function () {
		if(this.routesHit > 1) {
			window.history.back();
		} else {
			window.views.tienda.navigateHome();
		}
	},
	/*
	paginaVista:function(){
        if(window.location.host === 'lovizdelcarpio.com'){
			var url = Backbone.history.getFragment();
			if (!/^\//.test(url) && url != ""){
				url = "/" + url;
			}
			if(! _.isUndefined(_gaq)){
				_gaq.push(['_trackPageview', url]);
			} 
		}
	}*/
});