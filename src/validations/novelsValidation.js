import vine from "@vinejs/vine";


export const createNovelScheme = vine.object({
    mainTitle: vine.string(255).minLength(3),
    rusTitle: vine.string(255).minLength(3),
    description: vine.string().minLength(3),
    duration: vine.number().min(1),
    orgAuthor: vine.string().maxLength(255).optional(),
    orgTranslate: vine.string().maxLength(255).optional(),
});


export const updateNovelScheme = vine.object({
    mainTitle: vine.string(255).minLength(3).optional(),
    rusTitle: vine.string(255).minLength(3).optional(),
    description: vine.string().minLength(3).optional(),
    duration: vine.number().min(1).optional(),
    orgAuthor: vine.string().maxLength(255).optional(),
    orgTranslate: vine.string().maxLength(255).optional(),
});