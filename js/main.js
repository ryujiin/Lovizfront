//Loviz Tienda
$(document).ready(function(){
	console.log('main.js loaded');
    
    window.routers.base = new Loviz.Routers.Base();
    window.routers.catalogo = new Loviz.Routers.Catalogo();
    
    window.views.tienda = new Loviz.Views.Tienda( $('body') );
    //Componentes de la web
    window.views.menu_principal = new Loviz.Views.Menu_principal();
    window.views.slider_home = new Loviz.Views.Slider_home();
    window.views.landing_nuevos_productos = new Loviz.Views.Landing_nuevos_productos();

    //Vistas de Catalogos
    window.views.catalogo_contenedor = new Loviz.Views.Catalogo_contenedor();
    window.views.catalogo = new Loviz.Views.Catalogos();
    window.views.catalogos = {};

    
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