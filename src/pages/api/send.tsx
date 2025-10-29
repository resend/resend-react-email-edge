import React from 'react';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { AppleReceiptEmail } from '../../../transactional/emails/apple-receipt';

const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
  runtime: 'edge',
};

export default async function handler() {
  const response = await resend.emails.send({
    react: <AppleReceiptEmail />,
    subject: 'Apple Receipt',
    from: 'Acme <onboarding@resend.dev>',
    to: ['delivered@resend.dev'],
  });

  if (response.data) {
    return NextResponse.json({ id: response.data.id }, { status: 200 });
  }

  if (response.error) {
    console.error('Something went wrong during email sending', response.error);
  }
}
