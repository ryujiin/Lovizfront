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
		this.colocar_clase(e);

	},
	navegacionPrincipal: function(e){
		e.preventDefault();	
		var enlace = e.target.pathname;
		
		Backbone.history.navigate(enlace, {trigger:true});
		this.colocar_clase(e);

	},
	colocar_clase:function(e){
		var li=e.currentTarget;
		//remueve todos los stilos
		$('header .menu li').each(function(indice,elemento){
			$(elemento).removeClass('activo');
		});
		$(li).addClass('activo');
		//navegar a donde se tiene q ir
	},
});
