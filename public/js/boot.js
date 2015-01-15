require.config({
	paths : {
		jQuery : '/js/lib/jquery-2.1.3.js',
		Underscore : '/js/lib/underscore',
		Backbone : '/js/lib/backbone.js',
		text : '/js/lib/text',
		templates : '../templates',
	},
	shim : {
		'Backbone' : ['Underscore', 'jQuery'],
		'SocialNet' : ['Backbone']
	}
});

require(['SociaNet'], function (SociaNet){
	SociaNet.initialize();
});