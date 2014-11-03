Loviz.Views.Perfil = Backbone.View.extend({
	el:$('#area_user'),
 	template: swig.compile($("#perfil_template").html()),
 	template_loguin: swig.compile($("#loagearse_template").html()),
	
  events: {
		'click .salir_cuenta' : 'salir',
    'submit #formu_login' : 'enviar_login',	
	},

	initialize : function () {
    var token = $.localStorage.get('token_login');
    if (token) {
      this.render();
    }else{
      this.renderLogin();
    }
    	this.listenTo(this.model, "change", this.render, this);
	},
	render: function () {
    var perfil = this.model.toJSON()
    var html = this.template(perfil);
    this.$el.html(html);
    this.$el.show();
  },
  renderLogin:function(){
    var html = this.template_loguin();
    this.$el.html(html);
    this.$el.show();
  },
  salir:function(){
  	window.views.tienda.cerrarOverlay();
  	$.localStorage.removeAll();
    $.sessionStorage.removeAll();
  	$.removeCookie('carrito',{path:'/'});
  	this.remove();
	  Backbone.history.navigate('/', {trigger:true});
  },
  enviar_login:function(e){
    var self = this;
    e.preventDefault();
    var email=$('#formu_login input[name=email]').val();
    var pass=$('#formu_login input[name=password]').val();
    $.post('http://localhost:8000/api-token-auth/',{username : email, password :pass})
    .done(function(data){
      var storage = $.localStorage;
      storage.set({'token_login' : data.token});
      self.datos_user();
      $('#logearse').hide();
    }).fail( function(data){
      console.log('fallo la seccion por '+data);
    })
  },
  datos_user:function(){
    var token = $.localStorage.get('token_login');
    var self = this;
    var sessionStorage=$.sessionStorage;

    if (token) {
      window.models.perfil.fetch({
        headers:{'Authorization':'JWT '+localStorage.token_login}
      })
      .done(function(data){
        $.sessionStorage.set('usuario',data.usuario)
      })
      .fail(function(){
        self.error_login();
      })
    };
  },
  error_login:function(){
    console.log('los campos estan mal')
  }
});
