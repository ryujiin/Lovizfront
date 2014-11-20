Loviz.Models.Carro = Backbone.Model.extend({
	urlRoot : 'http://lovizdc.herokuapp.com/api/carro/',
	name : 'Carro',
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
    	if (window.models.carro !== this) {
    		debugger;
    	};
    },
});