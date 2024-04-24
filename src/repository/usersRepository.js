import prisma from "../db.js";


class UsersRepository {
    static async getUserByEmail(email) {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        return user;
    }

    static async createUser(username, email, passwordHash) {
        const user = await prisma.user.create({
            data: {
                username: username,
                email: email,
                passwordHash: passwordHash,
            }
        });
        return user;
    }


    static async getUserById(userId) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        return user;
    }


    static async activationUser(userId) {
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                active: true
            }
        })
        return user;
    }
}

export default UsersRepository;