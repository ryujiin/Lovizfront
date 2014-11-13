Loviz.Views.Tienda = Backbone.View.extend({
	events: {
		'click .logo' : 'navigateHome',
		'click header .menu-principal li' : 'navegacionPrincipal',
		'click a.nolink' : 'nomandarLink',
		'click a.link' : 'linknormal',
		'click .overlayverde' : 'cerrarOverlay',
	},
	initialize : function ($el) {
		this.$el = $el;
	},
	navigateHome : function(e){
		window.app.page=false;
		if (e) {
			e.preventDefault();			
		};
		window.routers.base.navigate('/', {trigger:true});
		this.colocar_clase(e);

	},
	navegacionPrincipal: function(e){
		var enlace = e.currentTarget;
		enlace = $(enlace).data('url');
		window.routers.base.navigate(enlace, {trigger:true});
		this.colocar_clase(e);

	},
	colocar_clase:function(e){
		if(e){
			var li=e.currentTarget;
			//remueve todos los stilos
			$('header .menu li').each(function(indice,elemento){
				$(elemento).removeClass('activo');
			});
		}		
		$(li).addClass('activo');
		//navegar a donde se tiene q ir
	},
	nomandarLink:function(e){
		e.preventDefault();
	},
	linknormal:function(e){
		e.preventDefault();
		var link = e.currentTarget.pathname;
		
		window.routers.base.navigate(link, {trigger:true});

	},
	pagina_cargada: function(){

		this.$el.addClass('loaded');
	},
});
