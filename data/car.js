export class Car {
  brand;
  model;
  isTrunkOpen = false;
  speed = 0;

  constructor(carDetails) {
    this.brand = carDetails.brand
    this.model = carDetails.model

  }

  displayInfo() {
    console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h`)
  }

  go() {
    if (!this.isTrunkOpen) {
      this.speed += 5
    }

    if (this.speed > 200) {
      this.speed = 200
      // alert('Max speed reached')
    }
    
  }

  brake() {
    this.speed -= 5
    
    if (this.speed < 0) {
      this.speed = 0
      // alert('Min speed reached')
    }
  }

  openTrunk() {

    if (!this.speed) {
      this.isTrunkOpen = true
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false
  }


}


export class RaceCar extends Car {
  acceleration;

  constructor(carDetails) {
    super(carDetails)
    this.acceleration = carDetails.acceleration
  }

  go() {
    this.speed += this.acceleration
  }

  openTrunk() {
    alert('Race cars do not have a trunk')
  }

  closeTrunk() {
    alert('Race cars do not have a trunk')
  }
}