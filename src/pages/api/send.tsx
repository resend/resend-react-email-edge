import React from 'react';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { AppleReceiptEmail } from '../../../transactional/emails/apple-receipt';

const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
  runtime: 'edge',
};

export default async function handler() {
  return resend.emails.send({
    react: <AppleReceiptEmail />,
    subject: 'Apple Receipt',
    from: 'Acme <onboarding@resend.dev>',
    to: ['delivered@resend.dev'],
  });
}
