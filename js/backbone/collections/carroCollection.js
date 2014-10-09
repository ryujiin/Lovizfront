Loviz.Collections.Carros = Backbone.Collection.extend({
	model : Loviz.Models.Carro,
	url : '/json/carro/',
	name : 'carros',
});