import prisma from '@/lib/prisma'
import { User } from '@prisma/client'

export async function createUser(data: User) {
    try {
        const user = await prisma.user.create({ data })
        return { user }
    } catch (error) {
        return { error }
    }
}

export async function addTokens(userId: string, amount: number) {

    try {

        const existingUser = await prisma.user.findUnique({
            where: { Id: userId }
        });

        if (!existingUser) {
            return { error: 'User not found' };
        }

        const updatedUser = await prisma.user.update({
            where: { Id: userId },
            data: {
                NumberOfTokens: {
                    increment: amount
                }
            }
        });

        console.log(updatedUser);

        return { user: updatedUser };

    } catch (error) {
       return { error : error }
    }

}

export async function getTokenBalance(userId: string) {

    try {

        const existingUser = await prisma.user.findUnique({
            where: { Id: userId },
            select: {
                NumberOfTokens: true
            }
        });


        if (!existingUser) {
            return 0;
        }

        return existingUser.NumberOfTokens;

    } catch (error) {
        return 0;
    }

}


export async function deleteUser(id: string) {
    try {
        const user = await prisma.user.delete({
            where: { Id: id }
        })
        return { user }
    } catch (error) {
        console.error('Error deleting user:', error)
        return { error }
    }
}