//TODO Libraries
import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

export const resend = new Resend(process.env.RESEND_API_KEY);


