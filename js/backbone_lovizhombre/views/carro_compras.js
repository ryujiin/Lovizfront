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
    	this.listenTo(this.model, "change", this.siempre_lleno, this);
	},
	render: function () {
	    var html = this.template();
	    this.$el.html(html);
	},
	siempre_lleno:function () {
		var modelo = this.model.toJSON();
		var num_lineas=modelo.lineas
		if (num_lineas===0) {
			this.$el.find('.siempre_lleno').hide();
		}else{
			this.$el.find('.siempre_lleno').show();
		}
	}
});