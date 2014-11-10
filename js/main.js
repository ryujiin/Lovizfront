//Loviz Tienda
$(document).ready(function(){
	console.log('main.js loaded');
    
	//creo las variables que necesito
	window.views.tienda = new Loviz.Views.Tienda( $('body') );

	window.routers.base = new Loviz.Routers.Base();

    //creo perfil User    
    window.views.perfil = window.views.tienda.crear_perfil();
    window.views.overlay=new Loviz.Views.Overlayverde();


    //creo Carro
    window.views.carro = window.views.tienda.crear_carro();
    //creo la coleccion para guardar las lineas del carro
    window.collections.lineas = new Loviz.Collections.Lineas();
    window.views.lineas = new Loviz.Views.Lineas({
        collection:window.collections.lineas,
    });

    //window.views.lineas = window.routers.base.crear_vistaLineas();
    window.views.carro_num = window.views.tienda.crear_carro_num();


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
});
