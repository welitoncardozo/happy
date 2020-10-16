import Orphanage from "../models/Orphanage";
import ImageView from './ImageView';

export default {
  render({ 
    id, 
    name, 
    latitude, 
    longitude, 
    about, 
    instructions, 
    opening_hours, 
    open_on_weekends,
    images
  }: Orphanage) {
    return {
      id, 
      name, 
      latitude, 
      longitude, 
      about, 
      instructions, 
      opening_hours, 
      open_on_weekends,
      images: ImageView.renderMany(images)
    }
  },

  renderMany(orphanageList: Orphanage[]) {
    return orphanageList.map(orphanage => this.render(orphanage));
  }
}