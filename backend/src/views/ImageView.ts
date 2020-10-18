import Image from "../models/Image";

export default {
  render({ id, path }: Image) {
    return {
      id,
      url: `http://192.168.0.109:3333/uploads/${path}`
    }
  },

  renderMany(imageList: Image[]) {
    return imageList.map(image => this.render(image));
  }
}