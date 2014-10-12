Loviz.Collections.ProductoLista = Backbone.Collection.extend({
	model : Loviz.Models.ProductoLista,
	url : 'http://lovizdc.herokuapp.com/api/listaproducto/',
	name : 'Productos Lista',
});