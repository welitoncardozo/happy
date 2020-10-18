import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Orphanage from '../models/Orphanage';
import OrphanageView from '../views/OrphanageView';

export default {
    async index(request: Request, response: Response) {
      const orphanagesRepository = getRepository(Orphanage);
      const orphanageList = await orphanagesRepository.find({
        relations: ['images']
      });

      return response.json(OrphanageView.renderMany(orphanageList));
    },

    async show(request: Request, response: Response) {      
      const orphanagesRepository = getRepository(Orphanage);
      const { id } = request.params;
      const orphanage = await orphanagesRepository.findOneOrFail(id, {
        relations: ['images']
      });

      return response.json(OrphanageView.render(orphanage));
    },

    async create(request: Request, response: Response) {
        const {
          name,
          latitude,
          longitude,
          about,
          instructions,
          opening_hours,
          open_on_weekends
        } = request.body;
      
        const orphanagesRepository = getRepository(Orphanage);
        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
          return { path: image.filename }
        })

        const orphanageData = {
          name,
          latitude,
          longitude,
          about,
          instructions,
          opening_hours,
          open_on_weekends: open_on_weekends == 'true',
          images
        };

        const schema = Yup.object().shape({
          name: Yup.string().required('O campo nome é obrigatório'),
          latitude: Yup.number().required(),
          longitude: Yup.number().required(),
          about: Yup.string().required().max(300),
          instructions: Yup.string().required(),
          opening_hours: Yup.string().required(),
          open_on_weekends: Yup.boolean().required(),
          images: Yup.array(
            Yup.object().shape({
              path: Yup.string().required()
            })
          )
        });

        await schema.validate(orphanageData, {
          abortEarly: false
        });

        const orphanage = orphanagesRepository.create(orphanageData);      
        await orphanagesRepository.save(orphanage);
        return response.status(201).json(orphanage);
    }
};