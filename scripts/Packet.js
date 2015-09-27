Packet = function(args){
	this.nicDestination = args.destination;
	this.nicOrigin = args.nic;
	this.nicNextLocation = null;
	this.nicCurrentLocation = args.nic;
	this.payload = args.payload;
	this.getDeliveryTime = function(){
		return (this.nicCurrentLocation.cableLength);
	},
	this.send = function(){
		this.nicNextLocation = this.nicCurrentLocation.getServerConnectedTo().nic;
		console.log("time to destination: " + this.getDeliveryTime());
		setTimeout((function(){
			//TODO: scoping issue here - use jquery possibly
			console.log("reached destination server");
			this.nicCurrentLocation = this.nicDestination;
			this.nicNextLocation.inboundPacket(this);
		}).bind(this), this.getDeliveryTime() * 1000);
	}
};