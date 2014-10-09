Loviz.Views.ProductoSingle = Backbone.View.extend({
	className: 'productoSingle',
  	
  	template: swig.compile($("#ProductoSingle_template").html()),

	events: {
		'click #add_cart' : 'add_cart',
	},
	initialize : function () {
		this.listenTo(this.model, "change", this.render, this);

		this.conte=$('#productoSingle');

		window.routers.base.on('route:root',function(){
			$('#productoSingle').empty();
			$('.zoomContainer').remove();
		});
	},
	render : function () {
		var variaciones,p_id;
		var producto = this.model.toJSON();
		producto.id = parseInt(producto.id);
		var html = this.template(producto);
		this.$el.html(html);
	    this.conte.append(this.$el);
	},
	add_cart : function (){
		var carro = window.views.carro.model.toJSON(),producto,variacion,cantidad,busq,lineas,carro_model,total,num;
		carro_id = carro.id;
		producto = parseInt($('#formulario_producto .color_elegir').val());
		variacion = parseInt($('#formulario_producto .talla_elegir').val());
		precio = parseInt($('.precio_producto').val());
		var data = {
	        "carro": carro_id, 
	        "producto": producto, 
	        "variacion": variacion, 
	        "cantidad": 1,
		};
		var modelo = new Loviz.Models.LineaCarro(data);
		if (modelo.save()) {
			busq = modelo.fetch();
			busq.done(function(){
				lineas = window.collections.lineas;
				resultado = lineas.findWhere({producto:producto,variacion:variacion})
				if (resultado==null) {
					lineas.add(modelo);
				}else{
					cantidad = resultado.get('cantidad')
					resultado.set('cantidad',cantidad+1)
				};
				carro_model = window.views.carro.model;
				total=carro_model.get('total_carro')
				num=carro_model.get('num_items')
				carro_model.set('total_carro',total+precio);
				carro_model.set('num_items',num+1)
			});
			console.log('salio bien');
		};
	},
	crearGaleria : function (){
		$("#zoom_img").elevateZoom({
			zoomType : 'inner',
			responsive : true,
			gallery : 'gallery_01',
			galleryActiveClass : "active",
		});
	},
});