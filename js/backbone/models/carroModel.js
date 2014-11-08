Loviz.Models.Carro = Backbone.Model.extend({
	urlRoot : 'http://lovizdc.herokuapp.com/api/carro/',
	name : 'Carro',
	url : function() {
		var base = this.urlRoot;
		if (this.isNew()) return base;
		return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id+'/';
	}
});