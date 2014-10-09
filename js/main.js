//Loviz Tienda
$(document).ready(function(){
	console.log('main.js loaded');
	
	//creo las variables que necesito
	//window.views.tienda = new Loviz.Views.Tienda( $('body') );
	window.routers.base = new Loviz.Routers.Base();

	Backbone.history.start({
		pushState:true,
	});
});
