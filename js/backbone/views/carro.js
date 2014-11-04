Loviz.Views.Carro = Backbone.View.extend({
  	template: swig.compile($("#loader_template").html()),

	initialize : function () {
		this.render();
	},
	render: function () {
	    var album = this.model.toJSON()
	    var html = this.template(album);
	    this.$el.html(html);
	},
});
