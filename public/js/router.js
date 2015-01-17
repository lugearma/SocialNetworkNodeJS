define(['./views/index', './views/register', './views/login', './views/forgotpassword'], function (IndexView, RegisterView, LoginView, ForgotPasswordView){
	var SocialRouter = Backbone.Router.extend({

		currentView = null,
		
		routes : {
			"" : "index",
			"login" : "login",
			"register" : "register",
			"forgotpassword" : "forgotpassword"
		},

		changeView : function (view){
			if(null != this.currentView){
				this.currentView.undelegat
				eEvents();
			}

			this.currentView = view;
			this.currentView.render();
		},

		index : function (){
			console.log('estoy en el index');
			this.changeView(new IndexView());
		},

		login : function (){
			this.changeView(new LoginView());
		},

		forgotpassword : function (){
			this.changeView(new ForgotPasswordView());
		},

		register : function (){
			console.log('estoy en el registro');
			// this.changeView(new RegisterView());	
		}
	});

	var Social = new SocialRouter;
	Backbone.history.start();
});