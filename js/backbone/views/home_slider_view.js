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
	        self.$el.show();
	        //var alto = $( window ).height();
	        //alto = alto-60;
	        //alto = alto+'px';
	        //self.$el.css('height',alto);
	      }else{
	      	if (window.app.page===false) {
	        	self.$el.hide();
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
	aparecer:function(){
		window.views.tienda.pagina_cargada();
	    this.$el.show();
	}
});
