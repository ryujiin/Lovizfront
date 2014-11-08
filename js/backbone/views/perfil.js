Loviz.Views.Perfil = Backbone.View.extend({
	el:$('#area_user'),
 	template: swig.compile($("#perfil_template").html()),
 	template_loguin: swig.compile($("#loagearse_template").html()),
	
  events: {
		'click .salir_cuenta' : 'salir',
    'submit #formu_login' : 'enviar_login',	
	},

	initialize : function () {
    var token = $.sessionStorage.get('token_login');
    var self = this;
    if (token) {
      this.datos_user();
    }else{
      this.renderLogin();
    }
    this.listenTo(this.model, "change", this.render, this);

    window.routers.base.on('route',function(e){
      if (e==='perfil_user') {
        self.$el.show();
      }else{
        self.$el.hide();
      }
    });
	},
	render: function () {
    var perfil = this.model.toJSON()
    var html = this.template(perfil);
    this.$el.html(html);
  },
  renderLogin:function(){
    var html = this.template_loguin();
    this.$el.html(html);
  },
  salir:function(){
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
    $.post('https://lovizdc.herokuapp.com/api-token-auth/',{username : email, password :pass})
    .done(function(data){
      var storage = $.sessionStorage;
      storage.set({'token_login' : data.token});
      self.datos_user();
      $('#logearse').hide();
    }).fail( function(data){
      self.fallo_login();
    })
  },
  datos_user:function(){
    var token = $.sessionStorage.get('token_login');
    var self = this;
    var sessionStorage=$.sessionStorage;

    if (token) {
      self.model.fetch({
        headers:{'Authorization':'JWT '+token}
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
  },
  fallo_login:function () {
    this.$('#formu_login .campos input').val('');
    this.$('#formu_login .campos input').addClass('fallo_input');    
    this.$('.text-help').html('Su correo electrónico o contraseña es incorrecta.');
  }
});
