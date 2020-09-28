export default class Place {
  id: string;
  title: string;
  image: any;
  constructor(id: string, title: string, image: any) {
    this.id = id;
    this.title = title;
    this.image = image;
  }
}
