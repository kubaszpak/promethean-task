import { Ride } from '../models/Ride';

export class RideService {
  private rides: Ride[];

  constructor() {
    this.rides = [];
  }

  public addRide(ride: Ride): void {
    this.rides.push(ride);
  }

}