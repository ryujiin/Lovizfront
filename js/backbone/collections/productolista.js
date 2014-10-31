Loviz.Collections.ProductoLista = Backbone.Collection.extend({
	model : Loviz.Models.ProductoLista,
	url : 'https://lovizdc.herokuapp.com/api/listaproducto/',
	name : 'Productos Lista',
});