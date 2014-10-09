Loviz.Views.LineasLista = Backbone.View.extend({
	el:$('#topCartContent'),
	initialize : function () {
    	this.listenTo(this.collection, "add", this.addOne, this);
	},
	render : function () {
    	this.collection.forEach(this.addOne, this);
	},
	addOne: function (modelo) {
		var linea = new Loviz.Views.Linea({ model: modelo });
    	this.$el.append(linea.render().el);
    	this.remover_vacio();
  	},
  	render_basio : function(){
  		conte = $('#topCartContent');
  		conte.append('<div class="listavacio"><p>Usted no tiene ningun items en su carrito de compras</p></div>');
  	},
  	remover_vacio : function(){
  		$('.listavacio').hide();
  	}
});