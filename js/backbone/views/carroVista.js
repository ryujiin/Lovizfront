Loviz.Views.Carro = Backbone.View.extend({
	events: {
		'click .block-title' : 'mostrarLineas',
	},

	template: swig.compile( $('#template_minicarrito').html() ),

	contenedor : $('#minicart'),

	initialize : function () {
		this.render();
   		this.listenTo(this.model, "change", this.render, this);
	},
	render : function () {
		var carro = this.model.toJSON();
		if (carro.total_carro!=null) {
			carro.total_carro = carro.total_carro.toFixed(2);
		};
	    var html = this.template(carro);
	    this.$el.html(html);	    
	    this.contenedor.prepend(this.$el);
	},
	mostrarLineas : function (){
		$('.buton-checkout').slideToggle('fast');
		$('#topCartContent').slideToggle('slow');
	},
});