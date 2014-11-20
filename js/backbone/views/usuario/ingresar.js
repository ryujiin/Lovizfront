Loviz.Views.Login= Backbone.View.extend({
	el:$("#ingresar"),
	events: {
		'blur input':'verificar_vacio',
		'blur #formu_crear_cuenta #pass2_crear':'verificar_contra',
		'click .formu_crear .aparecer': 'aparecer_formu',	
		'submit #formu_login': 'logearse',
		'submit #formu_crear_cuenta': 'crear_cuenta',
		/*
		'blur #login_email':'verificar_email',
		'blur #email_crear':'verificar_email_crear',
		'blur #pass_crear':'verificar_pass_crear',
		'blur #pass2_crear':'verificar_pass_crear',
		'blur #login_pass':'verificar_pass',
		*/
	},
	initialize : function () {
		var self = this;
		window.routers.base.on('route',function(e){
			self.aparecer(e);		
		});
		window.routers.catalogo.on('route',function(e){
			self.aparecer(e);		
		});
	},
	aparecer:function (e) {
		if (e === 'ingresar') {
			this.$el.show();
		}else{
			this.$el.hide();
		}
	},
	verificar_vacio:function (e) {
		var div = $(e.currentTarget);
		var valor = div.val();
		var conte_ayuda  = $('.'+e.currentTarget.id+' .text_help')
		var tipo = e.currentTarget.type;
		var texto_ayuda;
		if (valor ==='') {
			texto_ayuda = '<span class="icon-cross2">No puede ir vacio'
			this.dato_fallo(div,conte_ayuda,texto_ayuda);
		}else{
			if (tipo==="email") {
				var email = this.validarEmail(valor)
				if (email===false) {
					texto_ayuda = '<span class="icon-cross2">Porfavor ingrese un Correo Valido'
					this.dato_fallo(div,conte_ayuda,texto_ayuda)
					div.val('');
				}else{
					div.addClass('bueno')
					conte_ayuda.empty();
				}
			}else if(tipo==='password'){
				var lonitud = valor.length;
				if (lonitud<5) {
					texto_ayuda = '<span class="icon-cross2">La contraseña no puede ser menor de 5 caracteres'
					this.dato_fallo(div,conte_ayuda,texto_ayuda)
					div.val('');
				}else{
					div.addClass('bueno')
					conte_ayuda.empty();	
				}
			}
		}
	},
	dato_fallo:function (div,conte_ayuda,texto_ayuda) {
		div.removeClass('bueno');
		div.addClass('fallo');
		conte_ayuda.empty().addClass('text_fallo').append(texto_ayuda);
	},
	validarEmail:function( email ) {
		expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if ( !expr.test(email) ){
		 	return false
		}else{
		 	return true
		}
	},
	logearse:function (e) {
		e.preventDefault();
		var email = $('#formu_login #email')
		var pass = $('#formu_login #pass')
		if (email.val()!=='') {
			if (pass.val()!=='') {
				this.$el.fadeOut();
				this.login(email.val(),pass.val());
			}else{
				pass.addClass('fallo');
				$('#formu_login .pass .text_help').empty().addClass('text_fallo').append('<span class="icon-cross2"> Este campo es necesario')
			}
		}else{
			email.addClass('fallo');
			$('#formu_login .email .text_help').empty().addClass('text_fallo').append('<span class="icon-cross2"> Este campo es necesario')
		}
		//$.post('https://lovizdc.herokuapp.com/api-token-auth/',{username : email, password :pass})
	},
	aparecer_formu:function (e) {
		var div = $(e.currentTarget);
		div.fadeOut();
		this.$("#formu_crear_cuenta").fadeIn();
	},
	crear_cuenta:function (e) {
		var self=this;
		e.preventDefault();
		var email = $('#formu_crear_cuenta #email_crear')
		var pass = $('#formu_crear_cuenta #pass_crear')
		var pass2 = $('#formu_crear_cuenta #pass2_crear')
		if (email.val()!=='') {
			if (pass.val()!=='') {
				if (pass.val()===pass2.val()) {
					//comenzar efecto
					this.$el.fadeOut();
					$('#usuario').addClass('page_loading');
					$.post('https://lovizdc.herokuapp.com/api/usuario/',{username : email.val(), password :pass.val(),email:email.val()})
					.done(function (data) {
						self.login(email.val(),pass.val());
					})
					.fail(function () {
						self.$el.fadeIn();
						$('#formu_crear_cuenta .ayuda_form .text_help').addClass('text_fallo').append('<span class="icon-cross2">El usuario ya existe en nuestro sistema');
						$('#usuario').removeClass('page_loading');
						email.val('');
						pass.val('');
						pass2.val('');
					})
				}else{
					pass.addClass('fallo');
					pass2.addClass('fallo');
					$('#formu_crear_cuenta .pass2_crear .text_help').empty().addClass('text_fallo').append('<span class="icon-cross2">Las contraseñas no son iguales')
				}
			}else{
				pass.addClass('fallo');
				$('#formu_crear_cuenta .pass_crear .text_help').empty().addClass('text_fallo').append('<span class="icon-cross2"> Este campo es necesario')
			}
		}else{
			email.addClass('fallo');
			$('#formu_crear_cuenta .email_crear .text_help').empty().addClass('text_fallo').append('<span class="icon-cross2"> Este campo es necesario')
		}	
	},
	verificar_contra:function (e) {
		var div = $(e.currentTarget);
		var valor1=$("#formu_crear_cuenta #pass_crear").val();
		var valor2=$("#formu_crear_cuenta #pass2_crear").val();
		var conte_ayuda  = $('.'+e.currentTarget.id+' .text_help');
		if (valor1!==valor2) {
			var texto_ayuda = '<span class="icon-cross2">Las contraseñas no son iguales' 
			this.dato_fallo(div,conte_ayuda,texto_ayuda)
			div.val('');
		}
	},
	login:function (email,pass) {
		var self = this;
		$.post('https://lovizdc.herokuapp.com/api-token-auth/',{username : email, password :pass})
		.done(function (data) {
			var storage = $.sessionStorage;
      		storage.set({'token_login' : data.token});
      		self.datos_user();
      		window.routers.base.navigate('/perfil/', {trigger:true});
      		$("#usuario").removeClass('page_loading');      		

		})
		.fail(function () {
			console.log('salio mal el login1')
		})
	},
	datos_user:function(){
	    var token = $.sessionStorage.get('token_login');
	    var self = this;
	    var sessionStorage=$.sessionStorage;
	    if (token) {
	    	window.models.usuario.fetch({
	    		headers:{'Authorization':'JWT '+token}
	    	})
	    	.done(function(data){
	    		$.sessionStorage.set('usuario',data.id)
	    	})
	    	.fail(function(){
	    		console.log('salio mal el login')
	    	})
	    };
  	},
});
