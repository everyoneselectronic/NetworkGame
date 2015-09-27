Packet = function(args){
	this.type = args.type;
	this.nicDestination = args.destination;
	this.nicOrigin = args.nic;
	this.nicNextLocation = null;
	this.nicCurrentLocation = args.nic;
	this.payload = args.payload;
	this.getDeliveryTime = function(){
		return (this.nicCurrentLocation.cableLength);
	},
	this.getOriginNic = function(){
		return this.nicOrigin;
	},
	this.getPayload = function(){
		return this.payload;
	},
	this.send = function(){
		this.nicNextLocation = this.nicCurrentLocation.getConnectedNic();
		console.log("time to destination: " + this.getDeliveryTime());
		setTimeout((function(){
			//TODO: scoping issue here - use jquery possibly
			console.log("reached destination server");
			this.nicCurrentLocation = this.nicDestination;
			this.nicNextLocation.inboundPacket(this);
		}).bind(this), this.getDeliveryTime() * 1000);
	},
	this.needsResponse = function(){
		return (this.type == "TCP");
	}
};