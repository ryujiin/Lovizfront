Loviz.Views.Tienda = Backbone.View.extend({
	events: {
		'click .logo' : 'navigateHome',
		'click header .menu li' : 'navegacionPrincipal',
	},
	initialize : function ($el) {
		this.$el = $el;
	},
	navigateHome : function(e){
		e.preventDefault();
		Backbone.history.navigate('/', {trigger:true});
	},
	navegacionPrincipal: function(e){
		e.preventDefault();
		li=e.toElement.parentElement;
		menu = e.toElement.parentElement.parentElement;
		enlace = e.toElement.pathname;
		//recorrer menu para sacar activo
		$(menu.children).each(function(indice,elemento){
			$(elemento).removeClass('activo');
		});
		$(li).addClass('activo');
		//navegar a donde se tiene q ir
		Backbone.history.navigate(enlace, {trigger:true});
	}
});
