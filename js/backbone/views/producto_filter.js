Loviz.Views.Producto_filter = Backbone.View.extend({
	el:$('#filtros_productos'),

  	template: swig.compile($("#producto_filtros_template").html()),

	initialize : function () {
		var self = this;
    	//this.listenTo(this.model, "change", this.render, this);
    	this.render();

    	window.routers.base.on("route", function(route, params) {
    		if (route==='tiendaCatalogo') {
    			self.$el.show(1200);
    		}else{
    			self.$el.hide();
    		};
    	});
	},
	render: function () {
	    //var album = this.model.toJSON()
	    var html = this.template();
	    this.$el.html(html);
	},
});
