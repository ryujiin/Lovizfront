Loviz.Views.Tienda = Backbone.View.extend({
	events: {
		'click .movil_navegador' : 'expandirmenumovil',
		'click .logo' : 'navigateHome',
		'click .mostrarLogin': 'mostrarLogin',
	},
	initialize : function ($el) {
		this.$el = $el;
	},
	render : function () {
	},
	expandirmenumovil : function (){
		$('.main_navegador').slideToggle('slow');
	},
	navigateHome : function(e){
		e.preventDefault();
		Backbone.history.navigate('/', {trigger:true});
	},
	mostrarLogin : function(){
		if ($('.mostrarclick').hasClass('siempre_visible')) {
			$('.mostrarclick').removeClass('siempre_visible');
		};
		$('.mostrarclick').slideToggle('slow');
	},
	borrar_carro : function () {
		$('#minicart').empty();
	}
});