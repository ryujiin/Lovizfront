Loviz.Views.HomeSlider = Backbone.View.extend({
	el:$('#inicio'),
  	template: swig.compile($("#home_slider_theme").html()),

	events: {
		
	},
	initialize : function () {
		this.render();
		this.cargado();
	},
	render: function () {
	    var album = this.model.toJSON()
	    var html = this.template(album);
	    this.$el.html(html);
	},
	cargado : function(){
		this.$el.find('img').on('load',function(){
	    	window.views.tienda.pagina_cargada();
	    });
	},
	aparecer:function(){
		window.views.tienda.pagina_cargada();
	    this.$el.show();
	}
});
