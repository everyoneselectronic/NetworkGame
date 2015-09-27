app = {
	status: "pre-init",
	init: function(){
		console.log("init: " + this.status);
		
		var a = this.addServer({
			name: "A"
		});
		var b = this.addServer({
			name: "B"
		});
		a.nic.connectTo(b.nic);
	},
	servers: [],
	addServer: function(args){
		var newServer = new Server(args);
		this.servers.push(newServer);
		return newServer;
	},
	getServers: function(){
		return this.servers;
	}
};