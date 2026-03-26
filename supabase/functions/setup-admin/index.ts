import { createClient } from "https://esm.sh/@supabase/supabase-js@2.100.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const adminEmail = "eyerustekto@gmail.com";
    const adminPassword = "eyerus1996";

    // Check if user already exists
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(
      (u) => u.email === adminEmail
    );

    let userId: string;

    if (existingUser) {
      userId = existingUser.id;
    } else {
      const { data: newUser, error: signUpError } =
        await supabaseAdmin.auth.admin.createUser({
          email: adminEmail,
          password: adminPassword,
          email_confirm: true,
        });

      if (signUpError) throw signUpError;
      userId = newUser.user.id;
    }

    // Assign admin role (upsert)
    const { error: roleError } = await supabaseAdmin
      .from("user_roles")
      .upsert(
        { user_id: userId, role: "admin" },
        { onConflict: "user_id,role" }
      );

    if (roleError) throw roleError;

    return new Response(
      JSON.stringify({ success: true, message: "Admin user set up" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
