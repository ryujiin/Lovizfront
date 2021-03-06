Loviz.Views.HomeSlider = Backbone.View.extend({
	el:$('#inicio'),
  	template: swig.compile($("#home_slider_theme").html()),

	events: {
		
	},
	initialize : function () {
		var self = this;
		this.render();
		this.cargado();
		window.routers.base.on('route',function(e){
	      if (e==='root') {
	        self.$el.fadeIn('slow');
	      }else{
	      	if (window.app.page===false) {
	        	self.$el.slideUp(1000);
	      	};
	      }
	    });
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
});
