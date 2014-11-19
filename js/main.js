//Loviz Tienda
$(document).ready(function(){
	console.log('main.js loaded');
    
    window.routers.base = new Loviz.Routers.Base();
    window.routers.catalogo = new Loviz.Routers.Catalogo();
    
    window.views.tienda = new Loviz.Views.Tienda( $('body') );
    galleta = window.views.tienda.obt_galleta();
    
    //Crear Carro
    window.collections.lineas = new Loviz.Collections.Lineas();
    window.models.carro = crear_carromodel();
    window.views.mini_carrito = new Loviz.Views.Mini_carrito({model:window.models.carro})
    window.views.carro = new Loviz.Views.Carro({
        collection: window.collections.lineas,
    }); 

    window.views.home= new Loviz.Views.Home();
    window.views.menu_principal = new Loviz.Views.Menu_principal();
    window.views.banner_header = new Loviz.Views.Banner_header();
    window.views.landing_nuevos_productos = new Loviz.Views.Landing_nuevos_productos();
    window.views.slider_novedades = new Loviz.Views.Slider_home($('#novedades'));
    window.views.slider_ofertas = new Loviz.Views.Slider_home($('#oferta'));
    window.views.suscribcion = new Loviz.Views.Suscribcion();
    window.views.testimonios = new Loviz.Views.Testimonios();
    window.views.redes = new Loviz.Views.Redes_sociales();

    window.views.usuario = new Loviz.Views.Usuario()

    window.models.producto_single = new Loviz.Models.Producto()
    window.views.producto_single = new Loviz.Views.ProductoSingle({model:window.models.producto_single,}); 
    

    //Vistas de Catalogos
    window.collections.catalogo = new Loviz.Collections.Catalogo();
    window.views.catalogo_contenedor = new Loviz.Views.Catalogo_contenedor({
        collection:window.collections.catalogo,
    });

    
	Backbone.history.start({
        pushState:true,
    });

    //Funcion para el CRF
	function getCookie(name){
    	var cookieValue = null;
    	if (document.cookie && document.cookie != '') {
        	var cookies = document.cookie.split(';');
        	for (var i = 0; i < cookies.length; i++) {
            	var cookie = jQuery.trim(cookies[i]);
            	// Does this cookie string begin with the name we want?	 
            	if (cookie.substring(0, name.length + 1) == (name + '=')) {
                	cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                	break;
            	}
        	}
    	}
    	return cookieValue;
	}	 
	$.ajaxSetup({
     	beforeSend: function(xhr, settings) {
         	if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
             	// Only send the token to relative URLs i.e. locally.
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
         	}
     	} 
	});
    function crear_carromodel () {
        var token = $.sessionStorage.get('token_login')
        var carro_local = $.sessionStorage.get('carro_local')
        if (token) {
            //poner si tengo usuarios
        }else if(carro_local){
            modelo = new Loviz.Models.Carro({id:carro_local});
            modelo.fetch()
            return modelo
        }else{
            modelo = new Loviz.Models.Carro();
            modelo.fetch({
                data:$.param({session:galleta})
            }).fail(function () {
                modelo = new Loviz.Models.Carro();
                modelo.set('sesion_carro',galleta);
                modelo.save().done(function (data) {
                    $.sessionStorage.set('carro_local',data.id)
                });
            })
            return modelo
        }
    }
});