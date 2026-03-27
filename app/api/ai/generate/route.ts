import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const { prompt, userId } = await req.json();

    if (!prompt || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Remove strict backend Auth check to prevent 500 when Service Key is missing.
    // The route is protected by middleware.

    const systemPrompt = `
      Sen profesyonel bir melek yatırımcı (Angel Investor) ve risk sermayesi (VC) e-posta metin yazarısın. 
      Kullanıcı sana girişimi hakkında kısa bilgiler veya bir taslak verecek.
      Senin görevin bunu yatırımcıların ilgisini ilk saniyede çeken, kısa, etkileyici, aciliyet (Traction) belirten ve görüşme talep eden profesyonel bir soğuk e-postaya (Cold Email) dönüştürmek.
      
      E-postayı şu JSON formatında DÖNDÜR:
      {
        "subject": "Etkileyici E-posta Konusu",
        "body": "E-posta metni. 'Sayın Yatırımcı' diye başlasın, 'Saygılarımla, [Kurucu Adı]' şeklinde bitsin."
      }
      Sadece JSON döndür. Ekstra hiçbir açıklama metni yazma.
    `;

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        { role: 'user', content: `Kullanıcı Notları / Şablonu: ${prompt}` }
      ],
    });

    // Check if content exists and is a TextBlock
    const block = response.content[0];
    if (block && block.type === 'text') {
      const gptText = block.text;
      
      try {
        const jsonMatch = gptText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return NextResponse.json(parsed);
        } else {
            return NextResponse.json({ error: 'Invalid response format from AI' }, { status: 500 });
        }
      } catch (parseError) {
        console.error("JSON Parsing Error from AI:", parseError);
        return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
      }
    } else {
        return NextResponse.json({ error: 'unexpected response type' }, { status: 500 });
    }

  } catch (error) {
    console.error('AI Generation Error:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

