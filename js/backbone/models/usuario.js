Loviz.Models.Usuario = Backbone.Model.extend({
	url:'http://lovizdc.herokuapp.com/api/cliente/perfil/',
	name:'perfil',
	initialize:function () {
		this.buscar_usuario();
	},
	buscar_usuario:function () {
		var usuario = $.sessionStorage.get('usuario');
		var token = $.sessionStorage.get('token_login');
		if (usuario && token) {
			this.fetch({headers:{'Authorization':'JWT '+token}})
		};
	}
});