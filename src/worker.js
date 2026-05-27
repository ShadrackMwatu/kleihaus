export default {
  async fetch(request, env) {

    const url = new URL(request.url);

    // ROOT API TEST
    if (url.pathname === "/") {
      return Response.json({
        success: true,
        message: "Kleihaus API is running"
      });
    }

    // QUOTE REQUEST ENDPOINT
    if (url.pathname === "/quote-request") {

      // Only allow POST
      if (request.method !== "POST") {
        return Response.json({
          success: false,
          message: "Method not allowed"
        }, { status: 405 });
      }

      try {

        const body = await request.json();

        const {
          name,
          phone,
          email,
          service,
          message
        } = body;

        // Validation
        if (!name || !phone) {
          return Response.json({
            success: false,
            message: "Name and phone are required"
          }, { status: 400 });
        }

        // Save into D1
        await env.DB.prepare(`
          INSERT INTO quote_requests
          (name, phone, email, service, message)
          VALUES (?, ?, ?, ?, ?)
        `)
        .bind(
          name,
          phone,
          email || "",
          service || "",
          message || ""
        )
        .run();

        // Send email using Resend
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${env.RESEND_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: "Kleihaus <onboarding@resend.dev>",
            to: "muthamimwatu@gmail.com",
            subject: "New Kleihaus Quote Request",
            html: `
              <h2>New Quote Request</h2>

              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Service:</strong> ${service}</p>
              <p><strong>Message:</strong> ${message}</p>
            `
          })
        });

        return Response.json({
          success: true,
          message: "Request submitted successfully. Our team will respond shortly."
        });

      } catch (error) {

        return Response.json({
          success: false,
          message: error.message
        }, { status: 500 });

      }
    }

    // FALLBACK
    return Response.json({
      success: false,
      message: "Not found"
    }, { status: 404 });
  }
};