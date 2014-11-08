Loviz.Views.Tienda = Backbone.View.extend({
	events: {
		'click .logo' : 'navigateHome',
		'click header .menu-principal li' : 'navegacionPrincipal',
		'click a.nolink' : 'nomandarLink',
		'click a.link' : 'linknormal',
		'click .overlayverde' : 'cerrarOverlay',
	},
	initialize : function ($el) {
		this.$el = $el;
	},
	navigateHome : function(e){
		window.app.page=false;
		if (e) {
			e.preventDefault();			
		};
		window.routers.base.navigate('/', {trigger:true});
		this.colocar_clase(e);

	},
	navegacionPrincipal: function(e){
		var enlace = e.currentTarget;
		enlace = $(enlace).data('url');
		window.routers.base.navigate(enlace, {trigger:true});
		this.colocar_clase(e);

	},
	colocar_clase:function(e){
		if(e){
			var li=e.currentTarget;
			//remueve todos los stilos
			$('header .menu li').each(function(indice,elemento){
				$(elemento).removeClass('activo');
			});
		}		
		$(li).addClass('activo');
		//navegar a donde se tiene q ir
	},
	nomandarLink:function(e){
		e.preventDefault();
	},
	linknormal:function(e){
		e.preventDefault();
		var link = e.currentTarget.pathname;
		
		window.routers.base.navigate(link, {trigger:true});

	},
	pagina_cargada: function(){

		this.$el.addClass('loaded');
	},
	//Funciones vitales para la web
	/*******************************
    Funciones para Lovizdelcarpio.com
    ********************************/
    
    //Funcion para crear usuario
    crear_perfil:function () {
        if (window.views.perfil) {
            return window.views.perfil
        }else{
            var model_perfil,vista_perfil;
            model_perfil = new Loviz.Models.Perfil();
            vista_perfil = new Loviz.Views.Perfil({
                model:model_perfil
            });
            window.views.perfil=vista_perfil;
            return window.views.perfil
        }
    },
    //Funcion para crear Carro
    crear_carro:function () {
        var modelo = new Loviz.Models.Carro();
        window.models.carro = modelo;
        var carro = new Loviz.Views.CarroCompras({
            model:modelo
        });
        window.views.mini_carrito = new Loviz.Views.Carro({
            model:modelo
        })
        var token = $.sessionStorage.get('token_login');
        var user = $.sessionStorage.get('usuario');
        if (token) {
            modelo.fetch({
                headers:{'Authorization':'JWT '+token}
            }).fail(function(data){
                modelo.set('sesion_carro',galleta);
                modelo.set('estado','Abierto');
                if (user) {
                    modelo.set('propietario',user)
                };
                modelo.save().done(function(data){
                    $.sessionStorage.set('carro_id',data.id);
                })
            }).done(function(data){
                $.sessionStorage.set('carro_id',data.id);
            });
        }else{
            modelo.fetch({
                data:$.param({session:galleta})
            })
            .fail(function(data){
                modelo.set('sesion_carro',galleta);
                modelo.set('estado','Abierto');
                modelo.save().done(function(data){
                    $.sessionStorage.set('carro_id',data.id)                    
                })
            })
            .done(function(data){
                $.sessionStorage.set('carro_id',data.id)
            })
        }
        return carro
    },
    crear_carro_num:function () {
        if (window.views.carro) {
            var modelo = window.views.mini_carrito.model;
            var num_vista = new Loviz.Views.CarroNum({model:modelo});
            window.views.carro_info = new Loviz.Views.CarroInfo({model:modelo});
        };
        return num_vista
    },    
});
