require.config({
	paths : {
		jQuery : '/js/lib/jquery-2.1.3',
		Underscore : './lib/underscore',
		Backbone : './lib/backbone',
		text : './lib/text',
		templates : '../templates',
	},

	shim : {
		'Backbone' : ['Underscore', 'jQuery'],
		'SocialNet' : ['Backbone']
	}
});

require(['SocialNet'], function (SocialNet){
	SocialNet.initialize();
});