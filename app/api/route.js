export function GET(request) {
  try {
    // return Response.json();
    return new Response('Hello!');
  } catch (error) {
    console.error('API error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// export function POST(request) {}