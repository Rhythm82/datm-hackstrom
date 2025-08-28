import { transporter } from "./Email.config.js";

export const sendSuccessRegistrationEmail = async ({
  email,
  team_name,
  name,
  uniqueId,
  team_leader_email,
}) => {
  const htmlContent = `
    <div style="font-family: 'Courier New', monospace; background:#0a0f1c; color:#00ffea; padding:30px; border-radius:15px;">
      <h2 style="text-align:center; color:#22d3ee;">🚀 Welcome to DATM-Hack Strom Hackathon 🚀</h2>
      <p>Hello <strong>${name}</strong>,</p>
      <p>Congratulations! Your team <strong>${team_name}</strong> has been successfully registered.</p>
      <p><strong>Unique ID:</strong> ${uniqueId}</p>
      <p>Your team leader email: <strong>${team_leader_email}</strong></p>
      <p style="margin-top:20px;">Attached is your registration summary PDF for your records.</p>
      <hr style="border:1px solid #00ffea;">
      <p style="text-align:center; font-size:12px; color:#888;">&copy; DATM-Hack Strom 2025</p>
    </div>
  `;

  try {
    const res = await transporter.sendMail({
      from: '"DATM-Hack Strom" <datmhackstrom@gmail.com>',
      to: email,
      subject: "🎉 Hackathon Registration Successful!",
      html: htmlContent,
    });

    console.log("Welcome email sent successfully to:", email);
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }
};
