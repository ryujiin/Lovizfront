Loviz.Views.Carro = Backbone.View.extend({
	el:$('#mini_carrito'),

  	template: swig.compile($("#mini_carrito_template").html()),

	initialize : function () {
    	this.listenTo(this.model, "change", this.render, this);
	},
	render: function () {
	    var album = this.model.toJSON()
	    var html = this.template(album);
	    this.$el.html(html);
	},
});
