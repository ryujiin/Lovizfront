Loviz.Views.CarroCompras = Backbone.View.extend({
	el:$('#carro_compra'),
  	template: swig.compile($("#carro_template").html()),

	initialize: function () {
		var self = this;
		this.render();
		window.routers.base.on('route',function(e){
	      if (e==='carrito') {
	        self.$el.show();
	      }else{
	        self.$el.hide();
	      }
	    });
	},
	render: function () {
	    var html = this.template();
	    this.$el.html(html);
	},

});