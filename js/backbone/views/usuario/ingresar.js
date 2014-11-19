Loviz.Views.Login= Backbone.View.extend({
	el:$("#ingresar"),
	events: {
		'blur input':'verificar_vacio',
		'click .formu_crear .aparecer': 'aparecer_formu',	
		'submit #formu_login': 'logearse',
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
				}else{
					div.addClass('bueno')
					conte_ayuda.empty();
				}
			}else if(tipo==='password'){
				var lonitud = valor.length;
				if (lonitud<5) {
					texto_ayuda = '<span class="icon-cross2">La contraseña no puede ser menor de 5 caracteres'
					this.dato_fallo(div,conte_ayuda,texto_ayuda)
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
		console.log('se envia');
	}
});
