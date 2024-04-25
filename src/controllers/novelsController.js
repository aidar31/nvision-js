import vine, {errors} from "@vinejs/vine";

import ApiResponse from "../helpers/apiResponse.js";
import NovelsRepository from "../repository/novelsRepository.js";
import { createNovelScheme, updateNovelScheme } from "../validations/novelsValidation.js";
import { NovelDTO } from "../dtos/novelsDTOs.js";

class NovelController {
    static async index(req, res) {
        try {
            const novels = await NovelsRepository.getAllNovels();

            if (novels.length === 0) {
                const data = {
                    message: "Not one novels"
                }
                return ApiResponse.send(res, data, null, null);
            }

            const novelDTOs = novels.map(novel => new NovelDTO(novel));

            return ApiResponse.send(res, novelDTOs, null, null);
        } catch (error) {
            console.log("Error: ", error);
            const errors = {
                "message": "Something went wrong. Please try again"
            }
            return ApiResponse.send(res, null, errors, null);
        }            
    }   

    static async store(req, res) {

        try {
            const body = req.body;
            const validator = vine.compile(createNovelScheme);
            const payload = await validator.validate(body);

            const published_id = Number(req.user.id);

            console.log(published_id);
            
            const novels = await NovelsRepository.createNovel(
                payload.mainTitle, payload.rusTitle,
                payload.description, payload.duration,
                payload.orgAuthor, payload.orgTranslate,
                published_id,
            );
            return ApiResponse.send(res, novels, null, null);
        } catch (error) {
            console.log("Error: ", error);
            if (error instanceof errors.E_VALIDATION_ERROR) {
                const errors = error.messages;

                return ApiResponse.send(res, null, errors, null);
            } else {
                const errors = {
                    "message": "Something went wrong. Please try again"
                }
                return ApiResponse.send(res, null, errors, null);
            }
        }

    }

    static async show(req, res) {
        try {
            const { novelId } = req.params;
            const novel = await NovelsRepository.getNovelById(Number(novelId));
            return ApiResponse.send(res, new NovelDTO(novel), null, null);
        } catch (error) {
            console.log("Error: ", error);
            const errors = {
                "message": "Something went wrong. Please try again"
            }
            return ApiResponse.send(res, null, errors, null);
        }
    }
    
    static async update(req, res) {
        try {
            const { novelId } = req.params;
            const body = req.body;
            const validator = vine.compile(updateNovelScheme);
            const payload = await validator.validate(body);
            console.log(payload);
            const novel = await NovelsRepository.updateNovel(Number(novelId), payload);
            return ApiResponse.send(res, new NovelDTO(novel), null, null);
        } catch (error) {
            console.log("Error: ", error);
            if (error instanceof errors.E_VALIDATION_ERROR) {
                const errors = error.messages;

                return ApiResponse.send(res, null, errors, null);
            } else {
                const errors = {
                    "message": "Something went wrong. Please try again"
                }
                return ApiResponse.send(res, null, errors, null);
            }
        }
    }

    static async destroy(req, res) {
        try {
            const {novelId} = req.params;
            const novel = await NovelsRepository.unActiveNovel(Number(novelId));
            return ApiResponse.send(res, novel, null, null);
        } catch (error) {
            console.log("Error: ", error);
            const errors = {
                "message": "Something went wrong. Please try again"
            }
            return ApiResponse.send(res, null, errors, null);
        }
    }
}


export default NovelController;