export default class Place {
  id: string;
  title: string;
  image: any;
  address: string;
  lat: string;
  lng: string;
  constructor(
    id: string,
    title: string,
    image: any,
    address: string,
    lat: string,
    lng: string
  ) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.address = address;
    this.lat = lat;
    this.lng = lng;
  }
}
