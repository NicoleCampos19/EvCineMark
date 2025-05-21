import jsonwebtoken from "jsonwebtoken"; 
import bcryptjs from "bcryptjs"; 
import nodemailer from "nodemailer"; 
import crypto from "crypto"; 
import client from "../models/clients.js";
import { config } from "../config.js";

const registerclientsController = {};

registerclientsController.register = async (req, res) => {
  const { name, email, password, phone, address, dui } = req.body;
  try {
    const existingClient = await client.findOne({ email });
    if (existingClient) {
      return res.json({ message: "Client already exists" });
    }

    const passwordHash = await bcryptjs.hash(password, 10);
    const newClient = new client({ name, email, password : passwordHash, phone, address, dui, });
    await newClient.save();

    const verificationCode = crypto.randomBytes(3).toString('hex');;

    const tokenCode = jsonwebtoken.sign(
      { email, verificationCode },
      config.JWT.secret,
      { expiresIn: "2h" }
    );

    res.cookie("verificationToken", tokenCode, { maxAge: 2 * 60 * 60 * 1000 });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.email_user,
        pass: config.email.email_pass,
      },
    });

    const mailOptions = {
        from: config.email.email_user,
        to: email,
        subject: "Verificación de correo",
        html: `
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
<div style="font-family: 'Poppins', sans-serif; background-color: #ffeef5; padding: 40px;">
  <div style="max-width: 600px; margin: auto; background-color: #fff0f6; padding: 30px; border-radius: 15px; box-shadow: 0 4px 20px rgba(255, 192, 203, 0.4);">
    <h2 style="color: #d63384; text-align: center; font-weight: 600;">Verificación de correo</h2>
    <p style="font-size: 16px; color: #6c757d; text-align: center;">
      ¡Hola! Gracias por registrarte. Para continuar, introduce el siguiente código de verificación:
    </p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="display: inline-block; font-size: 26px; color: #fff; background-color: #f06292; padding: 15px 30px; border-radius: 8px; letter-spacing: 3px; font-weight: 600;">
        ${verificationCode}
      </span>
    </div>
    <p style="font-size: 14px; color: #999; text-align: center;">
      Este código caduca en 2 horas.
    </p>
    <p style="font-size: 14px; color: #bbb; text-align: center;">
      Si no solicitaste este código, puedes ignorar este mensaje con seguridad.
    </p>
  </div>
</div>
        `
      };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.json({ message: "Error sending email" + error });
      }
      console.log("Email sent" + info);
    });

    res.json({
      message: "Client registered, Please verify your email with the code sent",
    });
  } catch (error) {
    console.log("error" + error);
  }
};

registerclientsController.verifyCodeEmail = async (req, res) => {
  const { requireCode } = req.body;

  const token = req.cookies.verificationToken;

  try {
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    const {verificationCode: storedCode } = decoded;

    if (requireCode !== storedCode) {
      return res.json({ message: "Código incorrecto" });
    }
    res.clearCookie("verificationToken");

    res.json({ message: "Email verified Successfuly" });
  } catch (error) {
    console.log("error" + error);
  }
};

export default registerclientsController;
