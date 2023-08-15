import React from 'react';
import { AppleReceiptEmail } from '../../../transactional/emails/apple-receipt';
import { renderAsync } from '@react-email/components';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
  runtime: 'edge',
};

export default async function handler() {
  const html = await renderAsync(React.createElement(AppleReceiptEmail));

  const data = await resend.emails.send({
    html,
    subject: 'Apple Receipt',
    from: 'Acme <onboarding@resend.dev>',
    to: ['delivered@resend.dev'],
  });

  return NextResponse.json({ id: data.id }, { status: 200 });
}
