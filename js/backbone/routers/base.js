Loviz.Routers.Base = Backbone.Router.extend({
	routes : {
		"" : "root",
		'*notFound': 'notFound',
	},
	initialize : function () {
  	},
	root : function () {
		window.app.state = "inicio";
	},
	notFound:function () {
		console.log('no hay pagina')
	}
})