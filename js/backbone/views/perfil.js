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
      galleta = '';
      $.removeCookie('carrito',{path:'/'});
      self.datos_user();
      self.buscar_carro();
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
        $.sessionStorage.set('usuario',data.id)
        debugger;
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
  },
  buscar_carro:function () {
    //Buscando Nuevo carro cuando se logea
    var self = this;
    var token = $.sessionStorage.get('token_login');
    var usuario = $.sessionStorage.get('usuario');

    var cliente_carro_id = window.models.carro.toJSON().id;
    var producto_cliente = window.models.carro.toJSON().lineas;
    var carro_lado_cliente = window.models.carro;
    var carro_lado_server = new Loviz.Models.Carro();
    //Datos necesarios para decidir con que carro me quedo

    //Buscando el nuevo carro 
    carro_lado_server.fetch({
      headers:{'Authorization':'JWT '+token}
    }).done(function (data) {
      //Si exite un carro en el servidor del mismo usuario
      var server_id = data.id;
      var producto_server = data.lineas;
      //Decidiendo que carro usar si el nuevo o el que tenemos en el server
      if (producto_server>producto_cliente) {
        //se Decide por el nuevo carro y se modifica el del servidor para congelar el carro de ahi
        $.sessionStorage.set('carro_id',server_id)
        carro_lado_cliente.set('id',server_id);
        carro_lado_cliente.set('propietario',data.propietario);
        carro_lado_server.set('id',cliente_carro_id);
        carro_lado_server.set('estado','Congelado');        
        carro_lado_server.save();
        carro_lado_cliente.fetch().done(function () {
          //creo la vista de la nuevas lineas en el carro
          window.views.lineas.$el.empty();
          window.views.lineas=window.routers.base.crear_vistaLineas();
        });
      }else{
        //se queda con el carro del servidor y se congela este
        carro_lado_cliente.set('propietario',usuario);
        carro_lado_cliente.save({headers:{'Authorization':'JWT '+token}})
      }
    }).fail(function () {
      //No existe un carro en el servidor de este usuario y vuelvo este carro como suyo en el server
      var usuario = $.sessionStorage.get('usuario');
      carro_lado_cliente.set('propietario',usuario);
      carro_lado_cliente.save({
        headers:{'Authorization':'JWT '+token}
      })
    });
  }
});
