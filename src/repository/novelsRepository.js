import prisma from "../db.js";



class NovelsRepository {
    static async getAllNovels() {
        const novels = prisma.novel.findMany({
            where: {
                active: true,
            }
        });
        return novels;
    }

    static async getNovelById(novelId) {
        const novels = prisma.novel.findUnique({
            where: {
                id: novelId
            },
        });
        return novels;
    }

    static async createNovel(
        mainTitle, 
        rusTitle,
        description, 
        duration,
        orgAuthor,
        orgTranslate,
        published_id,
    ) {
        const novel = await prisma.novel.create({
            data: {
                mainTitle: mainTitle,
                rusTitle: rusTitle,
                description: description,
                duration: duration,
                orgAuthor: orgAuthor,
                orgTranslate: orgTranslate,
                publishedId: published_id
            }
        });
        return novel;
    }

    static async updateNovel(novelId, payload) {
        const novel = await prisma.novel.update({
            where: {
                id: novelId
            },
            data: payload,
        });
        return novel;
    }

    static async unActiveNovel(novelId) {
        const novel = await prisma.novel.update({
            where: {
                id: novelId,
            },
            data: {
                active: false
            },
        });
        return novel;
    }

}


export default NovelsRepository;