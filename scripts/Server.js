Server = function(args){
	//private properties
	var name = args.name;
	var hardwareModules = [];
	var softwareModules = [];
	var packetCache = [];

	//public methods
	this.addHardware = function(hardwareModule){
		hardwareModule.setServer(this);
		hardwareModules.push(hardwareModule);
		return hardwareModule;
	};
	this.addSoftware = function(softwareModule){
		softwareModule.setServer(this);
		softwareModules.push(softwareModule);
		return softwareModule;
	}
	this.listConnectedServers = function(){
		var servers = [];
		$.each(listNics(), function(index, nic){
			servers.push({serverId:nic.getConnectedServer(),nicId:nic});
		});
		return servers;
	};
	this.getName = function(){
		return name;
	};
	this.listPacketCache = function(){
		console.log(packetCache);
	};



	this.transferPacketToCache = function(packet){
		packetCache.push(packet);
		console.log("Server " + name + ": " + packetCache.length);
		this.checkConnectedServers(packet);
	};

	this.checkConnectedServers = function(packet){
		var servers = this.listConnectedServers();
		var nic;

		if(servers.length > 0){
			var destinationServerIdentified = false;
			$.each(servers, function(index, serverNic){
				if (packet.getDestinationServer() == serverNic.serverId) {
					console.log("correct location");
					nic  = serverNic.nicId;
					destinationServerIdentified = true;
					return false;
				}
			});
			if(!destinationServerIdentified){
				console.log("incorrect location");
					nic  = servers[0].nicId;
			}
			this.transferPacketToNic(nic,packet);

		} else {
			console.log("packet stuck in server " + this.getName())
		}

	};

	this.transferPacketToNic = function(nic,packet){
		nic.transferPacketToCache(packet);
		packetCache.pop();
	};

	//private methods
	var listNics = function(){
		var nics = [];
		$.each(hardwareModules, function(index, hardwareModule){
			if(hardwareModule instanceof Nic) {
				nics.push(hardwareModule);
			}
		});
		return nics;
	};


	//unknown yet
	// var nic = new Nic({ server: this });
	// var getDistanceFrom = function(targetServer){
	// 	return Math.floor((Math.random() * 10)+1);
	// };
}