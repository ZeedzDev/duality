import { cookies } from 'next/headers';

export async function POST(req: Request) {
	cookies().set('welcomed', 'true');
	return Response.json({ message: 'ok' });
}
