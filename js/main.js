//Loviz Tienda
$(document).ready(function(){
	console.log('main.js loaded');
    
	//creo las variables que necesito
	window.views.tienda = new Loviz.Views.Tienda( $('body') );

	window.routers.base = new Loviz.Routers.Base();

    //creo perfil User    
    window.views.perfil = crear_perfil();


	Backbone.history.start({
		pushState:true,
	});
    /*
    Funciones para Lovizdelcarpio.com
    */
    //Funcion para crear usuario
    function crear_perfil () {
        if (window.views.perfil) {
            return window.views.perfil
        }else{
            var model_perfil,vista_perfil;
            model_perfil = new Loviz.Models.Perfil();
            vista_perfil = new Loviz.Views.Perfil({
                model:model_perfil
            });
            window.views.perfil=vista_perfil;
            return window.views.perfil
        }
    };

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
