Loviz.Collections.Catalogo = Backbone.Collection.extend({
	model : Loviz.Models.Producto,
	url : 'http://lovizdc.herokuapp.com/api/catalogo/',
	name : 'Catalogo',
});