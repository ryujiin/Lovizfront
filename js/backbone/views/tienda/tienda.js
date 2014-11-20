Loviz.Views.Tienda = Backbone.View.extend({
	events: {
		'click a' : 'linknormal',
		'click .logo' : 'navega_home',
	},
	initialize : function ($el) {
		var self = this;
		this.$el = $el;
		window.routers.base.on('route',function(e){
			if (e === 'root') {
				self.$el.addClass('inicio');
			}else{
				self.$el.removeClass('inicio');
			}
		});
		window.routers.catalogo.on('route:catalogo',function(e){
			self.$el.removeClass('inicio');
		});
	},
	navega_home:function (e) {
		if (e) {
			e.preventDefault();
		};
		window.routers.base.navigate('/', {trigger:true});
	},
	linknormal:function (e) {
		e.preventDefault();
		var link = e.currentTarget.pathname;
		
		window.routers.base.navigate(link, {trigger:true});
	},
	obt_galleta : function(){
		var galleta = $.cookie('carrito');
		if (galleta==null) {
			console.log('veamos');
			var session = getRandomChar();
			$.cookie('carrito',session,{ expires: 1, path: '/'});
			galleta = session;
		};
		function getRandomChar() {
			numCara = 50
			chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
			pass ='';
			for (i=0;i<numCara;i++) {
				x = Math.floor(Math.random()*62);
				pass+=chars.charAt(x);
			};
			return pass
		};
		return galleta
	},
});
