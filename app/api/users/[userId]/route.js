// /api/users/[userId]/token-balance.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req, { params }) {

    const { userId } = params;

    try {

        const user = await prisma.user.findUnique({
            where: { Id: userId },
            select: { NumberOfTokens: true },
        });

        return new Response(JSON.stringify({ tokenBalance: user?.NumberOfTokens || 0 }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

}

export async function POST(req, { params }) {
    const { userId } = params;

    const { amount } = await req.json();

    if (typeof amount !== 'number') {
        return new Response(JSON.stringify({ error: 'Amount must be a number' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {

        const user = await prisma.user.update({
            where: { Id: userId },
            data: { NumberOfTokens: { increment: amount } },
        });
        return new Response(JSON.stringify({ user }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

}
