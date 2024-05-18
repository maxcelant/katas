interface Camera {
  takePhoto(): void;
}

interface GPS {
  getLocation(): void;
}

interface WiFi {
  connectToNetwork(network: string): void;
}


