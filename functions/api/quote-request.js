export async function onRequestPost(context) {
  return Response.json({
    success: true,
    debug: "quote endpoint reachable"
  });
}