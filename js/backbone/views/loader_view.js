Loviz.Views.Loader = Backbone.View.extend({
	el:$('#loader-wrapper'),
  	template: swig.compile($("#loader_template").html()),

	events: {
		'click .logo' : 'navigateHome',
	},
	initialize : function () {
		this.render();
	},
	render: function () {
	    var album = this.model.toJSON()
	    var html = this.template(album);
	    this.$el.html(html);
	    
	},
});
