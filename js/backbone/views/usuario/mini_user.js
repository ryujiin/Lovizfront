Loviz.Views.Mini_user = Backbone.View.extend({
	el:$("#mini_user"),
	template: swig.compile($("#mini_user_template").html()),	
	events: {
	},
	initialize : function () {
		this.render();
	    this.listenTo(this.model, "change", this.render, this);
	},
	render:function () {
		var user = this.model.toJSON()
        var html = this.template(user);
        this.$el.html(html);
	}
});
