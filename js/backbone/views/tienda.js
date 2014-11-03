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
		if (e) {
			e.preventDefault();
		};
		Backbone.history.navigate('/', {trigger:true});
		this.colocar_clase(e);

	},
	navegacionPrincipal: function(e){
		var enlace = e.target.pathname;
		
		Backbone.history.navigate(enlace, {trigger:true});
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
		
		Backbone.history.navigate(link, {trigger:true});

	},
	desplegar_overlay:function(){
		$('.overlayverde').slideDown('slow',function () {
			$('#capaPage').slideDown('slow');
		});
	},
	cerrarOverlay : function () {
		if ($('#capaPage').has('seve')) {
			$('#capaPage').slideUp('slow');
		};
		$('.overlayverde').slideUp('slow');
		if (window.app.state==="usuario") {
			this.navigateHome();
		};
	},
	datos_user:function(){
		var sessionStorage=$.sessionStorage;
		var perfil = new Loviz.Models.Perfil()
		var perfil_vista;

		if (window.views.perfil) {
			console.log('si sale')
		}else{
			perfil.fetch({
			headers:{'Authorization':'JWT '+localStorage.token_login}
			}).done(function(){
				Backbone.history.navigate('/mi_cuenta/', {trigger:true});  	

				perfil_vista = new Loviz.Views.Perfil({
					model:perfil
				})
				window.views.perfil = perfil_vista;
			})
		}		
	}
});
