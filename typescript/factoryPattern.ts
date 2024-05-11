
interface Transport {
  deliver(): void;
}

class Truck implements Transport {
  deliver(): void {
    console.log('truck: delivering')
  }
}

class Ship implements Transport {
  deliver(): void {
    console.log('ship: delivering')
  }
}

class Plane implements Transport {
  deliver(): void {
    console.log('plane: delivering')
  }
}

abstract class TransportFactory {
  abstract create(): Transport;

  deliverTransport(): void {
    const transport = this.create();
    transport.deliver();
  }
}

class TruckFactory extends TransportFactory {
  create(): Transport {
    return new Truck();
  }
}

class ShipFactory extends TransportFactory {
  create(): Transport {
    return new Ship();
  }
}

class PlaneFactory extends TransportFactory {
  create(): Transport {
    return new Plane();
  }
}

function main() {
  let transportFactory: TransportFactory;
  const type = ['truck', 'ship', 'plane'].sort(() => Math.random() - 0.5)[0];

  if (type === 'truck') {
    transportFactory = new TruckFactory();
  } else if (type === 'ship') {
    transportFactory = new ShipFactory();
  } else {
    transportFactory = new PlaneFactory();
  }
  
  transportFactory.deliverTransport();

}

main()
