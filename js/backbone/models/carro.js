Loviz.Models.Carro = Backbone.Model.extend({
	urlRoot : 'http://lovizdc.herokuapp.com/api/carro/',
	name : 'Carro',
	initialize : function () {
		this.crear_carromodel();
	},
	crear_carromodel:function () {
		var self = this;
        var token = $.sessionStorage.get('token_login')
        var carro_local = $.sessionStorage.get('carro_local')
        //var self = new Loviz.Models.Carro();
        var usuario = $.sessionStorage.get('usuario');
        if (token) {
            self.fetch().fail(function () {
                self.set('propietario',usuario);
                self.save().done(function (data) {
                    $.sessionStorage.set('carro_local',data.id)
                });
            })
        }else if(carro_local){
            self.id = carro_local;
            self.fetch()
        }else{
            self.fetch({
                data:$.param({session:galleta})
            }).fail(function () {
                self = new Loviz.Models.Carro();
                self.set('sesion_carro',galleta);
                self.save().done(function (data) {
                    $.sessionStorage.set('carro_local',data.id)
                });
            })
        }
    }
});