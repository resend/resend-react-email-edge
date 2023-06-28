import React from 'react';
import { AppleReceiptEmail } from '../../../transactional/emails/apple-receipt';
import { renderAsync } from '@react-email/components';
import { NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler() {
  const html = await renderAsync(React.createElement(AppleReceiptEmail));

  const data = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      html,
      subject: 'Apple Receipt',
      from: 'onboarding@resend.dev',
      to: 'delivered@resend.dev',
    }),
  });

  const response = await data.json();

  return NextResponse.json({ id: response.id }, { status: 200 });
}
