export async function GET(request) {
    console.log(request);
    return new Response('Hello, world!');
}

// export async function POST(request) {
//     const data = await request.json();
//     return new Response(JSON.stringify(data));
// }