Server = function(args){
	this.name = args.name;
	//this.hardwareModules = [];
	this.nic = new Nic({ server: this });
	this.getDistanceFrom = function(targetServer){
		return Math.floor((Math.random() * 10)+1);
	}
}