Software = function(args){
	//private properties
	var name = args.name;
	var parameters = args.parameters;
	var sourceCode = null;
	var server = null;
	var packetCache = [];

	//pubilc methods
	this.setServer = function(hostServer){
		server = hostServer;
	};
	this.getServer = function(){
		return server;
	}
	this.setSourceCode = function(sourceCodeFunction){
		sourceCode = sourceCodeFunction.bind(this);
	};
	this.run = function(args){
		sourceCode(args);
	};

	this.makePacket = function(args){
		var packet = new Packet({
			server: this.getServer()
		});
		packet.setType(args.packetType);
		packet.setPayload(args.packetData);
		packet.setDestinationServer(args.destinationServer);
		this.transferPacketToCache(packet);
		this.transferPacketToServer(packet);
	};

	this.transferPacketToCache = function(packet){
		packetCache.push(packet);
		console.log(name + ": " + packetCache.length);
	};

	this.transferPacketToServer = function(packet){
		var server = this.getServer();
		server.transferPacketToCache(packet);
		packetCache.pop();
	};

	// this.tick = function(){
	// 	if (typeof packetCache !== 'undefined' && packetCache.length > 0) {
	// 		this.transferPacketToServer(packetCache[0]);
	// 		packetCache.shift();
	// 		// for (var i in packetCache){
	// 		// 	this.transferPacketToServer(packetCache[i]);
	// 		// 	packetCache.shift();
	// 		// }
	// 	}
	// };


}