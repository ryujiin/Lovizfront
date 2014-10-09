Loviz.Views.Usuario = Backbone.View.extend({  	
	events: {
		'focus .input-pass' : 'verficar_user',
		'click .salir' : 'borrarcookie',
		'click .login' : 'login_user',
		'keypress' : 'enviar_form',
	},
	initialize : function () {
    	this.listenTo(this.model, "change", this.render, this);
	},
	render : function () {
		var modelo = this.model.toJSON();
		if (modelo.id == 0) {
			this.template = swig.compile($("#login-link-template").html());
		}else{
			this.template = swig.compile($("#user-logeado-template").html());
		}
	    var html = this.template(modelo);
	    this.$el.html(html);
	    $('#login-link').append(this.$el);
	},
	verficar_user : function(){
		var valor_user = $('.input-user').val();
		if (valor_user=='') {
			$('.etiqueta-form-user').empty().append('Debe colocar su correo electronico');
			$('.input-group.username').addClass('alerta_error');
		}else{
			var validar = validarEmail(valor_user);
			if (validar==false) {
				$('.etiqueta-form-user').empty().append('El correo electronico no es valido');
				$('.input-group.username').addClass('alerta_error');
			}else{
				$('.etiqueta-form-user').empty();
				if ($('.username').hasClass('alerta_error')==true) {
					$('.username').removeClass('alerta_error');
				};
			}
		}
		function validarEmail( email ) {
    		expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    		if ( !expr.test(email) ){
    			return false;
    		}
    		return true;
		}
	},
	login_user : function(){
		var self = this;
		var valor_user = $('.input-user').val();
		var valor_pass = $('.input-pass').val();
		this.verficar_user();
		if (validar_pass(valor_pass)==true) {
			var data = {email : valor_user,password : valor_pass}
			var jqxhr = $.post( "/ajax/login/",data, function(data) {
			  self.model.set({nombre : data.nombre,error_message : data.error_message, id: data.id,email : data.email})
			  $('.cont-login.form-login').addClass('siempre_visible');
			  window.views.tienda.borrar_carro();
			  window.routers.base.buscarcarro();
			  Backbone.history.navigate('cuenta/user/'+data.email+'/', {trigger:true});
			})
			  .done(function(data) {
			    console.log( "second success" );
			  })
			  .fail(function() {
			    console.log( "error" );
			  })
			  .always(function() {
			    console.log( "finished" );
			});
		};
		function validar_pass (pass) {
			if (pass=='') {
				$('.etiqueta-form-pass').empty().append('Debe colocar su contraseña');
				$('.input-group.password').addClass('alerta_error');
				return false
			}else{
				$('.etiqueta-form-pass').empty();
				if ($('.input-group.password').hasClass('alerta_error')) {
					$('.input-group.password').removeClass('alerta_error');
				};
				return true;
			};
		}

	},
	borrarcookie : function (){
		$.removeCookie('carrito', { path: '/' });
	},
	enviar_form : function (e){
		var codigo = e.keyCode
		if (codigo == 13) {
			this.login_user();
		};

	}
});