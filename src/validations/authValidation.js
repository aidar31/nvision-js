import vine from "@vinejs/vine";



export const registerSchema = vine.object({
    username: vine.string().minLength(5).maxLength(33),
    email: vine.string().email(),
    password: vine.string().minLength(5).maxLength(100).confirmed(),
});


export const loginSchema = vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(5).maxLength(100),
});
