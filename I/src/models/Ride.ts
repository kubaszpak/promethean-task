export interface Ride {
	startAddress: LatLng;
	endAddress: LatLng;
	cost: number;
	date: Date;
}

export interface LatLng {
	latitude: string;
	longitude: string;
}
