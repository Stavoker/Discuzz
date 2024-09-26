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