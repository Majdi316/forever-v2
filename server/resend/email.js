//TODO Import Variables
import { resend } from "./config.js";
import {
  verificationTokenEmailTemplate,
  WELCOME_EMAIL_TEMPLATE,
} from "./email-templates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Verify your email address now",
      html: verificationTokenEmailTemplate.replace(
        "{verificationToken}",
        verificationToken
      ),
    });
  } catch (error) {
    throw new Error(
      "Failed to send verification email. Please try again later."
    );
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to our company!",
      html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name.first),
    });
  } catch (error) {
    throw new Error("Failed to send welcome email. Please try again later.");
  }
};

export const sendPasswordResetEmail = async (email, resetUrl) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Reset your password",
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
    });
  } catch (error) {
    throw new Error(
      "Failed to send password reset email. Please try again later."
    );
  }
};


export const sendResetSuccessEmail = async (email) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Password Reset Successful",
      html: "<p>Your password has been successfully reset.</p>",
    });
  } catch (error) {
    throw new Error(
      "Failed to send password reset success email. Please try again later."
    );
  }
};
