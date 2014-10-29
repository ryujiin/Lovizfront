Loviz.Views.HomeSlider = Backbone.View.extend({
	el:$('#inicio'),
  	template: swig.compile($("#home_slider_theme").html()),

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
	    this.$el.find('img').on('load',function(){
	    	$('body').addClass('loaded');
	    });
	},
});
