Loviz.Views.Producto_filter = Backbone.View.extend({
	el:$('#productos-filtros'),
	events: {
		'click .logo' : 'navigateHome',
	},
	initialize : function () {
		var self = this;


    	window.routers.base.on("route", function(route, params) {
    		if (route==='tiendaCatalogo') {
    			self.$el.show(1200);
    		}else{
    			self.$el.css('display', '');
    		};
    	});

	},
	navigateHome : function(e){
		e.preventDefault();
		Backbone.history.navigate('/', {trigger:true});
		this.colocar_clase(e);

	},
	mostrando: function(){
		debugger;
	}
});
