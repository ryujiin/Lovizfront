Loviz.Models.Carro = Backbone.Model.extend({
	urlRoot : 'http://lovizdc.herokuapp.com/api/carro/',
	name : 'Carro',
    url : function() {
        var base = this.urlRoot;
        if (this.isNew()) return base;
        return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id+'/';
    },
	initialize : function () {
		this.crear_carromodel();
	},
	crear_carromodel:function () {
		debugger;
		var self = this;
        var token = $.sessionStorage.get('token_login')
        var carro_local = $.sessionStorage.get('carro_local')
        var usuario = $.sessionStorage.get('usuario');
        if (token) {
        	debugger
            self.fetch({
            	headers:{'Authorization':'JWT '+token}
            })
            .fail(function () {
            	debugger;
                self.set('propietario',usuario);
                self.save().done(function (data) {
                    //$.sessionStorage.set('carro_local',data.id)
                    self.saber_que_carro();
                });
            }).done(function () {
            	self.saber_que_carro();
            	debugger
            })
        }else if(carro_local){
        	debugger;
            self.id = carro_local;
            self.fetch().done(function () {
            	debugger;
            })
        }else{
        	debugger;
            self.fetch({
                data:$.param({session:galleta})
            }).fail(function () {
            	debugger;
                self.set('sesion_carro',galleta);
                self.save().done(function (data) {
                    $.sessionStorage.set('carro_local',data.id)
                    debugger;
                });
            }).done(function () {
            	debugger;
            })
        }
    },
    saber_que_carro:function(){
        var usuario = $.sessionStorage.get('usuario');
    	if (window.models.carro !== this) {
            if (this.toJSON().lineas !==0 ) {
                var carro = this.id
                var modelo = window.models.carro;
                window.collections.lineas.forEach(function(linea){
                    linea.set('carro',carro);
                    debugger;
                    linea.save();
                });
                window.models.carro.set(this.toJSON());
                window.models.carro.save().done(function () {
                    debugger;
                })

            }else{
                window.models.carro.set({'propietario':usuario,'estado':'Abierto'});
                this.set('estado','Fusionada');
                this.save().done(function () {
                    window.models.carro.save();
                    debugger;
                });
            }
    	};
    },
});