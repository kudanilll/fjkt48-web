export function emailTemplate(otp: string): string {
  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .otp { font-size: 24px; font-weight: bold; color: #007bff; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Verifikasi Email</h2>
          <p>Terima kasih telah mendaftar. Silakan gunakan OTP berikut untuk memverifikasi alamat email Anda:</p>
          <p class="otp">${otp}</p>
          <p>OTP ini akan kedaluwarsa dalam 10 menit.</p>
          <p>Jika Anda tidak meminta verifikasi ini, harap abaikan email ini.</p>
        </div>
      </body>
    </html>
  `;
}
